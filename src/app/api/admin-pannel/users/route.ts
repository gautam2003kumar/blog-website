import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
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

    const users = await UserModel.find({}).select("-password -__v");
    console.log("Fetched users:", users);
    if (!users.length) {
      return serveApiResponse(false, "No users found", 200);
    }

    return serveApiResponse(true, "Users retrieved successfully", 200, users);
  } catch (error) {
    console.error("[GET /api/user/all] Error:", error);
    return serveApiResponse(false, "An unexpected error occurred while retrieving users", 500);
  }
}
