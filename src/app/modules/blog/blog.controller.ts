import { Types } from 'mongoose';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { BlogService } from './blog.service';
import httpStatus from 'http-status';

// Controller to create a new blog
const createBlog = catchAsync(async (req, res) => {
   // console.log(req.headers['authorization']);
  const result = await BlogService.createBlogInDB(req.body, req.user?.email);

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

// Controller to update an existing blog
const updateBlog = catchAsync(async (req, res) => {
  const id = new Types.ObjectId(req.params.id);

  const result = await BlogService.updateBlogInDB(
    id,
    req.body,
    req?.user?.email,
  );

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

// Controller to delete a blog
const deleteBlog = catchAsync(async (req, res) => {
  await BlogService.deleteBlogDFromDB(req.params?.id, req.user?.email);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

// Controller to fetch all blogs
const getAllBlog = catchAsync(async (req, res) => {
  const result = await BlogService.getAllBlogFromDB(req.query);

  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  getAllBlog,
  deleteBlog,
};
