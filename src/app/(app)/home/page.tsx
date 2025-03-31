'use client';
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { Heart, EyeIcon, MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";
const Category = [
  "Technology",
  "Health & Wellness",
  "Science & Research",
  "Artificial Intelligence",
  "Business & Finance",
  "Lifestyle",
  "Travel",
  "Education",
  "Entertainment",
  "Food & Cooking",
  "Sports",
  "Self-Improvement",
  "Psychology",
  "Startups",
  "Marketing",
  "Photography",
  "Fashion",
  "Spirituality",
  "Music",
  "History",
  "Fitness",
  "Personal Finance",
  "Environment",
  "Politics"
];


const Home = () => {
  interface Blog {
    _id: string;
    title: string;
    likes: number;
    views: number;
    comments: Array<string>;
  }

  const [latestBlog, setLatestBlog] = useState<Blog[]>([]);
  const [trendingBlog, setTrendingBlog] = useState<Blog[]>([]);

  const fetchLatestBlogs = async () => {
    const response = await axios.get('/api/blog/latest-blogs');
    if (response.status !== 200) {
      throw new Error('Failed to fetch latest blogs');
    }
    setLatestBlog(response.data.data);
  }
  const fetchTrendingBlogs = async () => {
    const response = await axios.get('/api/blog/trending-blogs');
    if (response.status !== 200) {
      throw new Error('Failed to fetch trending blogs');
    }
    setTrendingBlog(response.data.data);
    console.log(response.data.data);
  }
  // Fetch blogs when the component mounts
  useEffect(() => {
    fetchLatestBlogs();
    fetchTrendingBlogs();
  }, []);
  // Handle errors
  useEffect(() => {
    const handleError = (error: any) => {
      console.error('Error fetching blogs:', error);
      alert('Failed to fetch blogs. Please try again later.');
    };
    fetchLatestBlogs().catch(handleError);
    fetchTrendingBlogs().catch(handleError);
  }, []);
  return (

    <div className="">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 px-6 md:px-20 ">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Bogify</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            The ultimate platform to explore and share amazing blogs on various topics.
          </p>
          <Link href={`/write-blog`}><Button className="px-6 py-3 text-lg">Get Started</Button></Link>
        </div>
        {/* Blog Catogory*/}
        <div className="mt-16 w-full">
          <h2 className="text-3xl font-bold mb-6">Explore Categoies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Category.map((category, index) => (
              <Button key={index} className="text-md max-w-full py-6 bg-gray-200 text-black hover:text-white">
                {category}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Latest Blog */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Latest Blogs</h3>
            <div className="space-y-4">
              {latestBlog.map((blog) => (
                <Card key={blog._id} className="p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                  <p className="text-lg font-semibold">{blog.title}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1"><ThumbsUp className="w-5 h-5" /> {blog.likes}</div>
                    <div className="flex items-center gap-1"><EyeIcon className="w-5 h-5" /> {blog.views}</div>
                    <div className="flex items-center gap-1"><MessageCircle className="w-5 h-5" /> {blog.comments.length}</div>
                  </div>
                  <Link href={`/blogs/${blog._id}`}>
                    <Button className="ml-4">Read More</Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          {/* Trending Blog */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Trending Blogs</h3>
            <div className="space-y-4">
              {trendingBlog.map((blog) => (
                <Card key={blog._id} className="p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                  <p className="text-lg font-semibold">{blog.title}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1"><ThumbsUp className="w-5 h-5" /> {blog.likes}</div>
                    <div className="flex items-center gap-1"><EyeIcon className="w-5 h-5" /> {blog.views}</div>
                    <div className="flex items-center gap-1"><MessageCircle className="w-5 h-5" /> {blog.comments.length}</div>
                  </div>
                  <Link href={`/blogs/${blog._id}`}>
                    <Button className="ml-4">Read More</Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;