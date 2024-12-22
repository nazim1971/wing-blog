import { Types } from 'mongoose';
import { AppError } from '../../error/AppError';
import { User } from '../user/user.model';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';

const createBlogInDB = async (payload: IBlog, email?: string) => {
  const author = await User.findOne({ email });
  if (!author) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  payload.author = author._id;

  const newBlog = await Blog.create(payload);

  if (!newBlog) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Could not create blog!',
    );
  }

  const blog = await Blog.findBlogById(newBlog._id);

  return blog;
};

const updateBlogInDB = async (
  id: Types.ObjectId,
  payload: Partial<IBlog>,
  email: string,
) => {
  const existingBlog = await Blog.findBlogById(id);

  if (existingBlog.author.email !== email) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not cupdate!');
  }

  const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, payload, {
    runValidators: true,
    new: true,
  });

  return updatedBlog;
};

const deleteBlogDFromDB = async (id: string, email?: string) => {
  const author = await User.findOne({ email });
  if (!author) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isBlogExists = await Blog.findById(id);
  if (!isBlogExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog is not found ');
  }

  const blog = await Blog.findOne({ _id: id, author: author._id });
  if (!blog) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Your are not author of this blog ',
    );
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find({ isPublished: 0 }), query)
    .filter()
    .authorFilter()
    .search(['title', 'content'])
    .sort();

  const result = blogQuery.getQuery().exec();
  return result;
};

export const BlogService = {
  createBlogInDB,
  updateBlogInDB,
  deleteBlogDFromDB,
  getAllBlogFromDB,
};
