"use client";
import { useState } from 'react';
import { usePostStore } from '@/app/libs/posts';
import Navbar from '@/app/components/navbar';

export default function AdminPage() {
  const { posts, addPost, deletePost } = usePostStore();
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: '',
    image: null as File | null,
    imagePreview: '',
    author: '',
    readTime: '',
    category: '',
    likes: 0,
    views: 0,
    comments: 0,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setNewPost({
        ...newPost,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newPost.title);
    formData.append('content', newPost.content);
    formData.append('tags', newPost.tags);
    formData.append('author', newPost.author);
    formData.append('readTime', newPost.readTime);
    formData.append('category', newPost.category);
    formData.append('likes', String(newPost.likes));
    formData.append('views', String(newPost.views));
    formData.append('comments', String(newPost.comments));
    if (newPost.image) formData.append('image', newPost.image);

    addPost({
      ...newPost,
      tags: newPost.tags.split(',').map((tag) => tag.trim()),
      image: newPost.imagePreview,
    });

    setNewPost({
      title: '',
      content: '',
      tags: '',
      image: null,
      imagePreview: '',
      author: '',
      readTime: '',
      category: '',
      likes: 0,
      views: 0,
      comments: 0,
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        
        {/* Add New Post Form */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                className="w-full bg-gray-700 rounded p-2"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">Content</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                className="w-full bg-gray-700 rounded p-2 h-32"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={newPost.tags}
                onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                className="w-full bg-gray-700 rounded p-2"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-gray-300 bg-gray-700 border border-gray-600 rounded"
              />
              {newPost.imagePreview && (
                <div className="mt-4">
                  <img
                    src={newPost.imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded border border-gray-600"
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Author</label>
                <input
                  type="text"
                  value={newPost.author}
                  onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                  className="w-full bg-gray-700 rounded p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2">Read Time</label>
                <input
                  type="text"
                  value={newPost.readTime}
                  onChange={(e) => setNewPost({...newPost, readTime: e.target.value})}
                  className="w-full bg-gray-700 rounded p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2">Category</label>
                <input
                  type="text"
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="w-full bg-gray-700 rounded p-2"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
            >
              Add Post
            </button>
          </form>
        </div>

        {/* Existing Posts List */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Existing Posts</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between bg-gray-700 p-4 rounded">
                <div>
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-400">{post.date}</p>
                </div>
                <button
                  onClick={() => deletePost(post.id)}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}