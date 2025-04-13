'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Comment = {
    _id: string;
    content: string;
    name?: string;
    userId: string;
    createdAt: string;
};

type User = {
    _id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
};

export default function AdminPanel() {
    const { data: session, status } = useSession();
    const user = session?.user;
    const [comments, setComments] = useState<Comment[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.isAdmin) return;
        console.log(!user || user.isAdmin)

        const fetchData = async () => {
            try {
                const commentRes = await axios.get('/api/admin-pannel/comment');
                const userRes = await axios.get('/api/admin-pannel/users');
                console.log('Fetched comments:', commentRes.data);
                console.log('Fetched users:', userRes.data);
                setComments(commentRes.data.data || []);
                setUsers(userRes.data.data || []);
            } catch (err) {
                toast.error('Failed to load admin data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleDeleteComment = async (id: string) => {
        if (!confirm('Delete this comment?')) return;
        try {
            await axios.delete(`/api/comment/delete/${id}`);
            toast.success('Deleted successfully');
            setComments((prev) => prev.filter((c) => c._id !== id));
        } catch {
            toast.error('Failed to delete');
        }
    };

    if (status === 'loading') return <p>Loading session...</p>;
    if (!user || !user.isAdmin) return <p className="p-6 text-red-600">Access Denied</p>;

    return (
        <div className="max-w-5xl mx-auto py-10 space-y-10">
            <h1 className="text-3xl font-bold">Admin Panel</h1>

            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">All Comments</h2>
                {comments.map((c) => (
                    <div key={c._id} className="border-b py-3 text-sm">
                        <p>{c.content}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{c.name || 'Anonymous'} · {new Date(c.createdAt).toLocaleString()}</span>
                            <button onClick={() => handleDeleteComment(c._id)} className="text-red-500 hover:underline">Delete</button>
                        </div>
                    </div>
                ))}
            </Card>

            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">All Users</h2>
                {users.map((u) => (
                    <div key={u._id} className="border-b py-3 flex justify-between items-center text-sm">
                        {/* Left: User Info */}
                        <div>
                            <p className="font-medium">{u.username}</p>
                            <p className="text-xs text-gray-500">
                                {u.email} ·{" "}
                                <span className={u.role === "admin" ? "text-red-600 font-semibold" : "text-blue-600"}>
                                    {u.role}
                                </span>
                            </p>
                        </div>

                        {/* Right: Join Date */}
                        <div className="text-xs text-gray-500 text-right">
                            <p className="font-medium">Joined</p>
                            <p>{new Date(u.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}

            </Card>
        </div>
    );
}
