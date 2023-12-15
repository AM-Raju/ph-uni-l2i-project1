import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constants';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // Check if there any registered semester that is already "UPCOMING" or "ONGOING"

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistrationModel.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a semester ${isThereAnyUpcomingOrOngoingSemester.status}`,
    );
  }

  // Check if the semester is exist
  const isAcademicSemesterExists =
    await AcademicSemesterModel.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found',
    );
  }

  // Check if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, 'This semester is already exists');
  }

  // create SemesterRegistration

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // Check if the requested semester is exists
  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, 'This semester is not found');
  }

  // if the requested semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestSemesterStatus = payload?.status;
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }

  // UPCOMING --> ONGOING --> ENDED
  // logic: Can't change upcoming to ended
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestSemesterStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly change status from ${currentSemesterStatus} to ${requestSemesterStatus}`,
    );
  }

  // logic: Can't change status from ongoing to upcoming
  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestSemesterStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly change status from ${currentSemesterStatus} to ${requestSemesterStatus}`,
    );
  }

  const result = await SemesterRegistrationModel.findById(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
