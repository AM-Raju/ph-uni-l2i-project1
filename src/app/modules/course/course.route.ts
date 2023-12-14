import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.zodCreateCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/', CourseControllers.getAllCourses);
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
);

export const CourseRoutes = router;
