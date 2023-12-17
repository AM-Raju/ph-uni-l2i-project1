import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(
    OfferedCourseValidations.zodCreateOfferedCourseValidationSchema,
  ),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  validateRequest(
    OfferedCourseValidations.zodUpdateOfferedCourseValidationSchema,
  ),
  OfferedCourseControllers.updateOfferedCourse,
);

/* router.get('/', CourseControllers.getAllCourses);
router.get('/:id', CourseControllers.getSingleCourse);
router.delete('/:id', CourseControllers.deleteCourse);


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

export const OfferedCourseRoutes = router;
