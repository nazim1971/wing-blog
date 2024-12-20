import { Router } from "express";
import { validateMiddlewire } from "../../middlewire/validateRequest";
import { BlogValidations } from "./blog.validation";
import { BlogController } from "./blog.controller";

const router = Router();


router.post(
	'/', validateMiddlewire(BlogValidations.blogCreateValidationSchema)
	,
	BlogController.createBlog,
);

export const BlogRoutes = router