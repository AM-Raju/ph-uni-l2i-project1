import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';

const router = express.Router();

router.get('/', OfferedCourseControllers.getAllOfferedCourses);

router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);

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

router.delete('/:id', OfferedCourseControllers.deleteOfferedCourse);

export const OfferedCourseRoutes = router;
