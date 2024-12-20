import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogInDB = async ( payload: IBlog) => {
  const blog = await Blog.create(payload);
  return {
    _id: blog._id,
    title: blog.title,
    content: blog.content,
    // author: {
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    // },
  };
};

export const BlogService = {
    createBlogInDB
}