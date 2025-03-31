'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import EditorRenderer from '@/components/output/EditorRenderer';
type Blog = {
  _id: string;
  bannerUrl: string;
  title: string;
  description: string;
  category: string;
  content: any;
};

const BlogDetail = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const { blogId } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;
      try {
        const response = await axios.get(`/api/blog/blogs/${blogId}`);
        setBlog(response.data.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (!blog) return <p>Loading...</p>;
  return (
    <div className="container mx-auto p-4">
      <img src={blog.bannerUrl} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <span className="text-sm text-gray-500 mb-8 block">Category: {blog.category}</span>
      <div className="prose">
        <EditorRenderer blocks={blog.content.blocks} />
      </div>
    </div>
  );
};

export default BlogDetail;
