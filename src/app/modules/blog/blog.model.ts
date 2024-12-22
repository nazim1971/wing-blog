import { model, Query, Schema, Types } from 'mongoose';
import { BlogStatics, TBlogsDoc } from './blog.interface';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';

const blogSchema = new Schema<TBlogsDoc>(
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
    versionKey: false,
  },
);

blogSchema.pre(/^find/, function (next) {
  const query = this as Query<TBlogsDoc, TBlogsDoc>;

  query
    .find({ isPublished: { $eq: true } })
    .select('-createdAt -updatedAt -isPublished')
    .populate('author', 'name email');

  next();
});

blogSchema.statics.findBlogById = async function (id: Types.ObjectId) {
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Please provide a valid ID!');
  }

  const blog = await this.findById(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, `No blog found with ID ${id}!`);
  }

  return blog;
};

export const Blog = model<TBlogsDoc, BlogStatics>('Blog', blogSchema);
