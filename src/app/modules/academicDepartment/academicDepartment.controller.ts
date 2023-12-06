import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

const ceateAcademicDepartment = catchAsync(async (req, res) => {
  const payload = req.body;

  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department created successfully',
    data: result,
  });
});
