"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidations = void 0;
const zod_1 = require("zod");
/** Validation schema for creating a new blog */
const blogCreateValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required!'),
    content: zod_1.z.string().min(1, 'Content is required!'),
    isPublished: zod_1.z.boolean().default(true).optional(),
});
const blogUpdateSchema = blogCreateValidationSchema.partial().strict();
exports.BlogValidations = { blogCreateValidationSchema, blogUpdateSchema };
