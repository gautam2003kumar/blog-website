'use client';

import BlogLoading from "@/components/Loader/BlogLoading";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer/footer";
import { useSession } from "next-auth/react";

const Page = () => {
    interface Blog {
        _id: string;
        title: string;
        bannerUrl: string;
        description: string;
        views: number;
        likes: number;
    }

    const { userId } = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`/api/blog/user-blogs/${userId}`);
                setBlogs(response.data.data); // Ensure `.data` is accessed properly
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        if (session) {
            fetchBlogs();
        }
    }, [userId, session]);

    const handleDelete = async (blogId: string) => {
        try {
            await axios.delete(`/api/blog/delete/${blogId}`);
            setBlogs(blogs.filter(blog => blog._id !== blogId));
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    if (status === "loading") return <BlogLoading />;

    if (!session) {
        return (
            <>
                <div className="min-h-screen bg-gradient-to-b from-white to-black p-6 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold text-gray-100 mb-6">Please login to view your blogs</h1>
                    <Button className="mb-4" onClick={() => router.push('/auth/sign-in')}>Go to Login</Button>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-black p-6">
            <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">User's Blogs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <Card key={blog._id} className="bg-white/10 shadow-lg hover:shadow-xl transition p-4 rounded-xl">
                        <CardHeader>
                            <Image 
                                src={blog.bannerUrl} 
                                alt={blog.title} 
                                width={400} 
                                height={250} 
                                className="w-full h-52 object-cover rounded-lg"
                                unoptimized
                            />
                            <CardTitle className="mt-4 text-xl font-semibold text-gray-100">
                                {blog.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-300 text-sm mb-3">
                                {blog.description.slice(0, 100)}...
                                <a href={`/blogs/${blog._id}`} className="text-blue-400 hover:underline ml-1">Read More</a>
                            </p>
                            <div className="flex justify-between text-gray-400 text-xs">
                                <span>👀 {blog.views} Views</span>
                                <span>❤️ {blog.likes} Likes</span>
                            </div>
                            <div className="flex justify-between mt-4">
                                <Button 
                                    variant="destructive" 
                                    onClick={() => handleDelete(blog._id)}
                                >
                                    Delete
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => router.push(`/edit-blog/${blog._id}`)}
                                >
                                    Edit
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Page;
