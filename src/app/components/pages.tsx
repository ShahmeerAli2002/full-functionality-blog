"use client";
import { useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/navbar';
import { useState } from 'react';
import { usePostStore } from '@/app/libs/posts';
import Link from 'next/link';

export default function BlogPost() {
  const searchParams = useSearchParams();
  const postData = JSON.parse(searchParams.get('postData') || '{}');
  const { posts } = usePostStore();
  
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: "John Doe", text: "Great post!", date: "2023-08-27" },
    { id: 2, user: "Jane Smith", text: "Very informative!", date: "2023-08-28" }
  ]);

  // Find the current post from the store
  const currentPost = posts.find(post => post.id === parseInt(postData.id)) || postData;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          user: "Current User",
          text: comment,
          date: new Date().toISOString().split('T')[0]
        }
      ]);
      setComment('');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <main className="container mx-auto p-8">
        <article className="max-w-4xl mx-auto">
          <img src={currentPost.image} alt={currentPost.title} className="w-full h-96 object-cover rounded-lg" />
          <div className="flex justify-between items-center mt-6">
            <div>
              <h1 className="text-4xl font-bold">{currentPost.title}</h1>
              <p className="text-gray-400 mt-2">By {currentPost.author} • {currentPost.readTime}</p>
            </div>
            <Link 
              href="/admin" 
              className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
            >
              Edit Post
            </Link>
          </div>
          
          <div className="flex gap-2 mt-4 flex-wrap">

            {currentPost.tags?.map((tag: string) => (
              <span key={tag} className="text-sm bg-purple-600 px-2 py-1 rounded">#{tag}</span>
            ))}
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Comments ({comments.length})</h2>
            
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-gray-800 rounded-lg p-4 text-white"
                placeholder="Add a comment..."
                rows={4}
              />
              <button 
                type="submit"
                className="mt-2 bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Post Comment
              </button>
            </form>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{comment.user}</h3>
                    <span className="text-gray-400 text-sm">{comment.date}</span>
                  </div>
                  <p className="text-gray-300">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  );





}