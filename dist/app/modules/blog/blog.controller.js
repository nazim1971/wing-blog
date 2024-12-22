"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const mongoose_1 = require("mongoose");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const blog_service_1 = require("./blog.service");
const http_status_1 = __importDefault(require("http-status"));
const createBlog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield blog_service_1.BlogService.createBlogInDB(req.body, (_a = req.user) === null || _a === void 0 ? void 0 : _a.email);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Blog created successfully',
        statusCode: http_status_1.default.CREATED,
        data: result,
    });
}));
const updateBlog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = new mongoose_1.Types.ObjectId(req.params.id);
    const result = yield blog_service_1.BlogService.updateBlogInDB(id, req.body, (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Blog updated successfully',
        statusCode: http_status_1.default.CREATED,
        data: result,
    });
}));
const deleteBlog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    yield blog_service_1.BlogService.deleteBlogDFromDB((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, (_b = req.user) === null || _b === void 0 ? void 0 : _b.email);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Blog Deleted successfully',
        statusCode: http_status_1.default.OK,
    });
}));
const getAllBlog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogService.getAllBlogFromDB(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Blog created successfully',
        statusCode: http_status_1.default.CREATED,
        data: result,
    });
}));
exports.BlogController = {
    createBlog,
    updateBlog,
    getAllBlog,
    deleteBlog
};
