'use client';

import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import EditorRenderer from '@/services/EditorRenderer';
import BlogLoading from '@/components/Loader/BlogLoading';
import { Link, Unlink, } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);
  const [blogUrl, setBlogUrl] = useState("");

  useEffect(() => {
    const currentUrl = window.location.href;
    setBlogUrl(currentUrl);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(blogUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
      )
      .catch((error) => {
        console.error('Failed to copy: ', error);
      }
      );
  };

  const handlePostComment = async () =>{
    
  }

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

  if (!blog) return (
    <BlogLoading />
  );
  return (
    <div>
      {/* bog copy */}
      <div>
        <button
          onClick={handleCopy}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-2  rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
          title='Copy blog link'
          aria-label='Copy blog link'
        >
          {copied ? (
            <span className="flex items-center">
              <Unlink className="w-4 h-4 mr-2" />
              Copied!
            </span>
          ) : (
            <span className="flex items-center">
              <Link className="w-4 h-4 mr-2" />
              Blog link
            </span>
          )}

        </button>
      </div>

      {/* Blog Details */}
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
        <img src={blog.bannerUrl} alt={blog.title} className="w-full object-cover rounded-lg mb-4" />
        <span className="text-sm text-gray-500 mb-8 block">Category: {blog.category}</span>
        <div className="prose">
          <EditorRenderer blocks={blog.content.blocks} />
        </div>
      </div>
      {/* Author Section */}
      <div className="max-w-3xl mx-auto mt-12 p-4 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">About the Author</h2>
        <p className="text-sm text-gray-500">This is a placeholder for author information.</p>
        <div className="flex items-center mt-4">
          <img src="/author-placeholder.jpg" alt="Author" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Author Name</h3>
            <p className="text-sm text-gray-500">Author Bio goes here.</p>
          </div>
        </div>
      </div>
      {/* Comment Section */}
      <div className="max-w-3xl mx-auto mt-12 p-4 border-t border-gray-200">
        <h2 className="text-2xl font-semibold mb-6">Comments</h2>

        {/* New Comment Form */}
        <form className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <textarea
            placeholder="Write a comment..."
            rows={4}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          ></textarea>
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-900 transition"
            onClick={() => handlePostComment()}
          >
            Post Comment
          </button>
        </form>

        {/* Comments List (example static comments) */}
        <div className="space-y-6">
          <div className="border p-4 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-700">“Great blog post! Learned a lot.”</p>
            <span className="text-xs text-gray-400 mt-1 block">— John Doe</span>
          </div>

          <div className="border p-4 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-700">“Can you write more on this topic?”</p>
            <span className="text-xs text-gray-400 mt-1 block">— Jane Smith</span>
          </div>
        </div>
      </div>

    </div>

  );
};

export default BlogDetail;
