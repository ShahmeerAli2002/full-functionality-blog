"use client";
import { useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/navbar';
import { useState, useEffect } from 'react';
import { usePostStore } from '@/app/libs/posts';
import Link from 'next/link';

interface Comment {
  id: number;
  user: string;
  text: string;
  date: string;
}

interface Post {
  id: number;
  title: string;
  author: string;
  image: string;
  tags: string[];
  readTime: string;
  likes: number;
  views: number;
}

export default function BlogPost() {
  const searchParams = useSearchParams();
  const postData = JSON.parse(searchParams.get('postData') || '{}') as Post;
  const { posts } = usePostStore();

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [darkMode, setDarkMode] = useState(true);

  const currentPost = posts.find(post => post.id === postData.id) || postData;

  useEffect(() => {
    const savedComments = localStorage.getItem('blogComments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      const initialComments = [
        { id: 1, user: "John Doe", text: "Great post!", date: "2023-08-27" },
        { id: 2, user: "Jane Smith", text: "Very informative!", date: "2023-08-28" },
      ];
      setComments(initialComments);
      localStorage.setItem('blogComments', JSON.stringify(initialComments));
    }
  }, []);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 100,
        user: "Current User",
        text: comment,
        date: new Date().toISOString().split('T')[0],
      };
      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      localStorage.setItem('blogComments', JSON.stringify(updatedComments));
      setComment('');
    }
  };

  const handleDeleteComment = (commentId: number) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    localStorage.setItem('blogComments', JSON.stringify(updatedComments));
  };

  if (!currentPost || !currentPost.title) {
    return (
      <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen flex items-center justify-center`}>
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded bg-purple-600 hover:bg-purple-700 text-white transition duration-200 text-sm sm:text-base"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <article className="max-w-4xl mx-auto">
          <img 
            src={currentPost.image} 
            alt={`Image for ${currentPost.title}`} 
            className="w-full h-48 sm:h-72 md:h-96 object-cover rounded-lg"
            loading="lazy"
          />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 sm:mt-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{currentPost.title}</h1>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">By {currentPost.author} • {currentPost.readTime}</p>
              <div className="flex gap-4 mt-2">
                <span className="text-gray-400 text-sm sm:text-base">❤️ {currentPost.likes || 29} likes</span>
                <span className="text-gray-400 text-sm sm:text-base">👁️ {currentPost.views || 900} views</span>
              </div>
            </div>
            <Link 
              href="/admin" 
              className={`${darkMode ? "bg-purple-600" : "bg-purple-500"} px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-purple-700 transition duration-200 mt-4 sm:mt-0 text-sm sm:text-base`}
            >
              Edit Post
            </Link>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {currentPost.tags?.map(tag => (
              <span 
                key={tag} 
                className={`text-xs sm:text-sm ${darkMode ? "bg-purple-600" : "bg-purple-300"} px-2 py-1 rounded hover:bg-purple-700 transition duration-200`}
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-8 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8">Comments ({comments.length})</h2>

            <form onSubmit={handleCommentSubmit} className="mb-6 sm:mb-8">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`w-full ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} rounded-lg p-3 sm:p-4 text-sm sm:text-base`}
                placeholder="Add a comment..."
                rows={4}
                aria-label="Add a comment"
              />
              <button 
                type="submit"
                className={`mt-2 ${darkMode ? "bg-purple-600" : "bg-purple-500"} px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-purple-700 transition duration-200 text-sm sm:text-base`}
              >
                Post Comment
              </button>
            </form>

            <div className="space-y-4 sm:space-y-6">
              {comments.map(comment => (
                <div key={comment.id} className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} rounded-lg p-4 sm:p-6`}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-sm sm:text-base">{comment.user}</h3>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className="text-gray-400 text-xs sm:text-sm">{comment.date}</span>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete comment"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
