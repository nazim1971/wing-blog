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
exports.BlogService = void 0;
const AppError_1 = require("../../error/AppError");
const user_model_1 = require("../user/user.model");
const blog_model_1 = require("./blog.model");
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createBlogInDB = (payload, email) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield user_model_1.User.findOne({ email });
    if (!author) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    payload.author = author._id;
    const newBlog = yield blog_model_1.Blog.create(payload);
    if (!newBlog) {
        throw new AppError_1.AppError(http_status_1.default.INTERNAL_SERVER_ERROR, 'Could not create blog!');
    }
    const blog = yield blog_model_1.Blog.findBlogById(newBlog._id);
    return blog;
});
const updateBlogInDB = (id, payload, email) => __awaiter(void 0, void 0, void 0, function* () {
    const existingBlog = yield blog_model_1.Blog.findBlogById(id);
    if (existingBlog.author.email !== email) {
        throw new AppError_1.AppError(http_status_1.default.INTERNAL_SERVER_ERROR, 'Could not cupdate!');
    }
    const updatedBlog = yield blog_model_1.Blog.findOneAndUpdate({ _id: id }, payload, {
        runValidators: true,
        new: true,
    });
    return updatedBlog;
});
const deleteBlogDFromDB = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield user_model_1.User.findOne({ email });
    if (!author) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isBlogExists = yield blog_model_1.Blog.findById(id);
    if (!isBlogExists) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Blog is not found ');
    }
    const blog = yield blog_model_1.Blog.findOne({ _id: id, author: author._id });
    if (!blog) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Your are not author of this blog ');
    }
    const result = yield blog_model_1.Blog.findByIdAndDelete(id);
    return result;
});
const getAllBlogFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.Blog.find({ isPublished: 0 }), query)
        .filter()
        .authorFilter()
        .search(['title', 'content'])
        .sort();
    const result = blogQuery.getQuery().exec();
    return result;
});
exports.BlogService = {
    createBlogInDB,
    updateBlogInDB,
    deleteBlogDFromDB,
    getAllBlogFromDB,
};
