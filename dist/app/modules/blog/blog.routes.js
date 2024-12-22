"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../../middlewire/validateRequest");
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middlewire/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_constants_1.USER_ROLE.USER), (0, validateRequest_1.validateMiddlewire)(blog_validation_1.BlogValidations.blogCreateValidationSchema), blog_controller_1.BlogController.createBlog);
router.patch('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.USER), (0, validateRequest_1.validateMiddlewire)(blog_validation_1.BlogValidations.blogUpdateSchema), blog_controller_1.BlogController.updateBlog);
router.get('/', blog_controller_1.BlogController.getAllBlog);
router.delete('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.USER), blog_controller_1.BlogController.deleteBlog);
exports.BlogRoutes = router;
