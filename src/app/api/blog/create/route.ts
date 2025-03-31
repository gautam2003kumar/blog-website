import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/model/Blog';
import { getSession } from 'next-auth/react';
import { serveApiResponse } from '@/utils/responseUtil';

// Define interface for request body
interface BlogRequestBody {
  title: string;
  content: any; // Adjust this based on Editor.js data
  bannerUrl?: string;
  description: string;
  status?: string;
  tags?: string[];
  category?: string;
}

export async function POST(req: NextRequest) {
  await dbConnect(); // Ensure DB connection

  try {
    // Validate and parse request data
    const body: BlogRequestBody = await req.json();
    const { title, content, bannerUrl, description, status, tags, category } = body;

    if (!title || !content || !description) {
      return serveApiResponse(false, 'Title, Content, and Description are required.', 400);
    }

    // Get the logged-in user using NextAuth
    const session = await getSession({ req: { headers: Object.fromEntries(req.headers) } });

    if (!session?.user?._id) {
      return serveApiResponse(false, 'Unauthorized user, please login again', 401);
    }

    // Validate status if provided
    const validStatuses = ['draft', 'published'];
    if (status && !validStatuses.includes(status)) {
      return serveApiResponse(false, 'Invalid status provided. Valid statuses are: draft, published', 400);
    }

    // Create new blog
    const newBlog = new Blog({
      title,
      content,
      bannerUrl,
      description,
      author: session.user._id,
      status: status || 'draft',
      tags: tags || [],
      category: category || '',
    });

    console.log(newBlog);

    const response = await newBlog.save();

    if (!response) {
      return serveApiResponse(false, 'Failed to create blog', 500);
    }

    // Return success response
    return serveApiResponse(true, 'Blog created successfully', 201, response);

  } catch (error) {
    console.error('Error creating blog:', (error as Error).message);
    return serveApiResponse(false, 'Internal server error while creating the blog', 500);
  }
}
