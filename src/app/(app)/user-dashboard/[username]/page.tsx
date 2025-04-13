'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Comment = {
  _id: string;
  content: string;
  blogId: string;
  createdAt: string;
};

const UserDashboard = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserComments = async () => {
    if (!user?._id) return;

    try {
      const res = await axios.get(`/api/comment/user-comments/${user._id}`);
      setComments(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load your comments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await axios.delete(`/api/comment/delete/${commentId}`);
      toast.success("Comment deleted");
      fetchUserComments();
    } catch {
      toast.error("Error deleting comment");
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchUserComments();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="p-6">
        <p>Please <a href="/api/auth/signin" className="underline text-blue-600">login</a> to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">Welcome, {user.username || user.name}</h1>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">My Comments</h2>
        {loading ? (
          <p>Loading your comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500 italic">You haven’t posted any comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="border-b py-3">
              <p className="text-gray-700">{comment.content}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
};

export default UserDashboard;
