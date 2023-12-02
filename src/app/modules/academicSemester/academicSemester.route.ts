import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

// route to create academic semester
router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.zodCreateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

// route to get all academic semester
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);

// route to get single academic semester
router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
);

// route to update academic semester
router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.zodUpdateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
