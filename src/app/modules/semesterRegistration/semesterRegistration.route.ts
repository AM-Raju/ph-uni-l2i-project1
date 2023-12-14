import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidations.zodCreateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);
/* router.get('/', CourseControllers.getAllCourses);
router.get('/:id', CourseControllers.getSingleCourse);
router.delete('/:id', CourseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.zodFacultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/delete-faculties',
  validateRequest(CourseValidations.zodFacultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesWithCourse,
);

router.patch(
  '/:id',
  validateRequest(CourseValidations.zodUpdateCourseValidationSchema),
  CourseControllers.updateCourse,
); */

export const SemesterRegistrationRoutes = router;
