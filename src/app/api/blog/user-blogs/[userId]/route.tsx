'use server'

import dbConnect from "@/lib/dbConnect"
import Blog from "@/model/Blog";
import { serveApiResponse } from "@/utils/responseUtil";

export async function GET(req: Request) {
    try {

        await dbConnect();
        const url = new URL(req.url);
        const userId = url.pathname.split('/')[4];
        console.log(`${userId}`);

        const blogs = await Blog.find({
            author: userId
        })

        if(!blogs){
            return serveApiResponse(false, "Blog not found", 404);
        }

        return serveApiResponse(true, 'Blog fetched successfully', 200, blogs);
    } catch (error) {
        console.log("Error fetching blog:", error);
        return serveApiResponse(false, "There is some issue when fetching the blog of user", 500)
    }
}