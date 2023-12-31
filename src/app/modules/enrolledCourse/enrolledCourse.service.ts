import { TEnrolledCourse } from './enrolledCourse.interface';

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
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
};
