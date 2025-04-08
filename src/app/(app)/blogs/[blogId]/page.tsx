'use client';

import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import EditorRenderer from '@/services/EditorRenderer';
import BlogLoading from '@/components/Loader/BlogLoading';
import { Link, Unlink,  } from 'lucide-react';
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
  },[]);

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

  if (!blog) return(
    <BlogLoading/>
  );
  return (
    <div>
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
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
        <img src={blog.bannerUrl} alt={blog.title} className="w-full object-cover rounded-lg mb-4" />
        <span className="text-sm text-gray-500 mb-8 block">Category: {blog.category}</span>
        <div className="prose">
          <EditorRenderer blocks={blog.content.blocks} />
        </div>
      </div>
    </div>
    
  );
};

export default BlogDetail;
