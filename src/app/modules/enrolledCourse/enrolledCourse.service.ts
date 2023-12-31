import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { OfferedCourseModel } from '../offeredCourse/offeredCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourse from './enrolledCourse.model';
import { Student } from '../student/student.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /* 
Business logic to create offeredCourse
* Step 1: Check if the offered course exist.
* Step 2: Check if the student is already enrolled.
* Step 3: Create an enrolled course
*/

  const { offeredCourse } = payload;
  const isOfferedCourseExists =
    await OfferedCourseModel.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not exists');
  }

  if (isOfferedCourseExists.maxCapacity < 1) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room is full!');
  }
  const student = await Student.findOne({ id: userId }).select('_id');

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is already enrolled.');
  }
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
};
