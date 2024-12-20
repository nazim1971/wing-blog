import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
	{
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
			type: Schema.Types.ObjectId,
			ref: 'User',
			trim: true,
			required: true,
		},
		isPublished: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);


export const Blog = model<IBlog>('Blog', blogSchema);