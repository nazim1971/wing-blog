import { Router } from 'express';
import { validateMiddlewire } from '../../middlewire/validateRequest';
import { BlogValidations } from './blog.validation';
import { BlogController } from './blog.controller';
import auth from '../../middlewire/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  validateMiddlewire(BlogValidations.blogCreateValidationSchema),
  BlogController.createBlog,
);

router.patch(
  '/:id',
  auth(USER_ROLE.USER),
  validateMiddlewire(BlogValidations.blogUpdateSchema),
  BlogController.updateBlog,
);
router.get('/', BlogController.getAllBlog);

router.delete('/:id', auth(USER_ROLE.USER), BlogController.deleteBlog);

export const BlogRoutes = router;
