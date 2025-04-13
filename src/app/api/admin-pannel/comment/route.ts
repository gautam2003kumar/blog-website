import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import CommentModel from "@/model/Comment";
import { serveApiResponse } from "@/utils/responseUtil";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return serveApiResponse(false, "Unauthorized access", 401);
    }

    const user = session.user as { isAdmin?: boolean };

    if (!user.isAdmin) {
      return serveApiResponse(false, "Forbidden: Admins only", 403);
    }

    await dbConnect();

    const comments = await CommentModel.find({})
      .select("-__v")
      .sort({ createdAt: -1 });

    if (!comments.length) {
      return serveApiResponse(false, "No comments found", 200);
    }

    return serveApiResponse(true, "Comments retrieved successfully", 200, comments);
  } catch (error) {
    console.error("[GET /api/comment/all-comments] Error:", error);
    return serveApiResponse(false, "Server error while retrieving comments", 500);
  }
}
