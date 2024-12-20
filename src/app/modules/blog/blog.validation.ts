import { z } from 'zod';

/** Validation schema for creating a new blog */
const blogCreateValidationSchema = z.object({
  title: z.string().min(1, 'Title is required!'),
  content: z.string().min(1, 'Content is required!'),
  isPublished: z.boolean().default(true).optional(),
});

const blogUpdateSchema = blogCreateValidationSchema.partial().strict();

export const BlogValidations = { blogCreateValidationSchema, blogUpdateSchema };
