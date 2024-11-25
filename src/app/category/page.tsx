"use client"
import React, { useState, useEffect } from 'react';
import { usePostStore } from '@/app/libs/posts';
import Link from 'next/link';
import Navbar from '../components/navbar';

const Category: React.FC = () => {
  const { posts, setFilteredPosts, filteredPosts } = usePostStore();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(posts.map((post) => post.category)))];

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts, setFilteredPosts]);

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.category === category));
    }
  };

  return (
    <>
      <Navbar/>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Filter by Category
        </h2>
        <div className="flex gap-4 flex-wrap mb-6">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded ${
                activeCategory === category
                  ? 'bg-indigo-700 text-white'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
              } hover:bg-purple-600`}
              onClick={() => handleFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              href={{
                pathname: `/posts/${post.id}`,
                query: { postData: JSON.stringify(post) }
              }}
              key={post.id}
            >
              <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer transition duration-200">
                <img
                  src={post.image}
                  alt={`Image for ${post.title}`}
                  className="w-full h-48 object-cover rounded"
                  loading="lazy"
                />
                <h2 className="text-xl font-semibold mt-4">{post.title}</h2>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-sm bg-purple-600 text-white px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
                  <span>{post.comments} Comments</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
