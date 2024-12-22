import { Router } from 'express';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { AuthRoute } from '../modules/auth/auth.routes';
import { AdminRoute } from '../modules/admin/admin.routes';

const router = Router();

const moduleRoutes = [
  { path: '/blogs', route: BlogRoutes },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/admin',
    route: AdminRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
