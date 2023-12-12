import express from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidations } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  /* validateRequest(
    AcademicDepartmentValidations.zodCreateAcademicDepartmentValidationSchema,
  ), */
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

router.get(
  '/:id',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidations.zodUpdateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
