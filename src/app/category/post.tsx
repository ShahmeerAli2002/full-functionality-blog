// src/app/components/Category/PostCard.tsx
import React from 'react';
import { Post } from '@/app/libs/posts';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden border-2 border-purple-500">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {post.readTime} • {post.category}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {post.content.substring(0, 100)}...
        </p>
        <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          Read More
        </button>
      </div>
    </div>
  );
};

export default PostCard;