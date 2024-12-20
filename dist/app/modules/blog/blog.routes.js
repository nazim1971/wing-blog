"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../../middlewire/validateRequest");
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.validateMiddlewire)(blog_validation_1.BlogValidations.blogCreateValidationSchema), blog_controller_1.BlogController.createBlog);
exports.BlogRoutes = router;
