import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/model/Blog";
import { serveApiResponse } from "@/utils/responseUtil";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    await dbConnect();

    // Check if the request is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
        return serveApiResponse(false, "Unauthorized: Please log in to delete the blogs", 401);
    }
    try {
        const url = new URL(req.url);
        const blogId = url.pathname.split('/')[4];

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