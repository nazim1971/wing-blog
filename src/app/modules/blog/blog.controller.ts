import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BlogService } from "./blog.service";
import httpStatus from "http-status";

const createBlog = catchAsync(async(req,res)=>{
    const result = await BlogService.createBlogInDB(req.body)

    sendResponse(res,{
        "success": true,
        "message": "Blog created successfully",
        "statusCode": httpStatus.CREATED,
        "data": result
    })
})

export const BlogController = {
    createBlog
}