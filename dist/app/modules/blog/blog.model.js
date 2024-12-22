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
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../error/AppError");
const http_status_1 = __importDefault(require("http-status"));
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
blogSchema.pre(/^find/, function (next) {
    const query = this;
    query
        .find({ isPublished: { $eq: true } })
        .select('-createdAt -updatedAt -isPublished')
        .populate('author', 'name email');
    next();
});
blogSchema.statics.findBlogById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Please provide a valid ID!');
        }
        const blog = yield this.findById(id);
        if (!blog) {
            throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, `No blog found with ID ${id}!`);
        }
        return blog;
    });
};
exports.Blog = (0, mongoose_1.model)('Blog', blogSchema);
