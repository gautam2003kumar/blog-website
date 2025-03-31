import dbConnect from "@/lib/dbConnect";
import Blog from "@/model/Blog";
import { serveApiResponse } from "@/utils/responseUtil";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    await dbConnect();

    try {
        const { blogId } = await req.json();

        if (!blogId) {
            return serveApiResponse(false, "Blog ID is required", 400);
        }

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return serveApiResponse(false, "Blog not found", 404);
        }

        return serveApiResponse(true, "Blog deleted successfully", 200);
    } catch (error) {
        console.error("Error deleting blog:", error);
        return serveApiResponse(false, "Unable to delete the blog", 500);
    }
}