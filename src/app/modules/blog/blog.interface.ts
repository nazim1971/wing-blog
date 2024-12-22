import { Model } from 'mongoose';
import { Document, Types } from 'mongoose';

export interface IBlog {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
}

export interface TBlogsDoc extends IBlog, Document {
  _id: Types.ObjectId;
}

export interface TPopulateBlogs {
  _id: Types.ObjectId;
  title: string;
  content: string;
  author: {
    _id: Types.ObjectId;
    name: string;
    email: string;
  };
}

export interface BlogStatics extends Model<TBlogsDoc> {
  findBlogById: (id: Types.ObjectId) => Promise<TPopulateBlogs>;
}
