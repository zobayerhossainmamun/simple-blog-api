import { ResponseData } from "src/common/interfaces/response-data.interface";
import { Blog } from "../entities/blog.entity";

export interface createBlogResponse extends ResponseData {
    blogId: string;
}

export interface getBlogListResponse extends ResponseData {
    blogList: Blog[]
}