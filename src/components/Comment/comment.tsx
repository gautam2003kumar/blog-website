'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'sonner';
import { User } from 'next-auth';
import { Button } from '@/components/ui/button';

type Comment = {
  _id: string;
  name?: string;
  content: string;
  createdAt: string;
};

const CommentSection = ({ blogId }: { blogId: string }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);
  const { data: session } = useSession();
  const user: User | undefined = session?.user;

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comment/all-comments/${blogId}`);
        setComments(res.data.data || []);
      } catch (err) {
        toast.error('Failed to load comments');
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [blogId, loadingComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error('Comment cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/comment/new-comments', {
        userId: user?._id,
        blogId,
        content,
        name: name || user?.username || 'Anonymous',
      });
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message || '📩 Successfully posted your comment');
        // Clear the input fields after posting
        setContent('');
        setName('');

        // Refresh comments after posting
        const res = await axios.get(`/api/comment/blog/${blogId}`);
        setComments(res.data.data || []);
      } else {
        toast.error(response.data.message || 'Something went wrong.');
      }
    } catch (err) {
      toast.error('Failed to post comment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 mt-10">
      <h3 className="text-xl font-semibold">Leave a Comment</h3>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg"
        />
        <textarea
          placeholder="Write a comment..."
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg"
        ></textarea>
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {loadingComments ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-400 italic">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="border p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-700">{comment.content}</p>
              <span className="text-xs text-gray-400 mt-1 block">
                — {comment.name || user?.username || 'Anonymous'} · {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
