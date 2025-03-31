'use server'

import dbConnect from "@/lib/dbConnect";
import Blog from "@/model/Blog";
import { serveApiResponse } from "@/utils/responseUtil";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const url = new URL(req.url);

    const blogId = url.pathname.split('/')[4];  // Extract blogId from query parameters
    console.log('Blog ID:', blogId);  // Log the blogId for debugging
    if (!blogId) {
      return serveApiResponse(false, 'Blog ID is required.', 400);  // Return error if ID is missing
    }

    // Find the blog using the blogId and populate the author details
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return serveApiResponse(false, 'Blog not found.', 404);  // Return error if blog is not found
    }

    return serveApiResponse(true, 'Blog fetched successfully', 200, blog);  // Return the found blog
  } catch (error) {
    console.error('Error fetching blog:', error);
    return serveApiResponse(false, 'Internal server error', 500);  // Return server error if something goes wrong
  }
}
