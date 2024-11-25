"use client";
import Link from 'next/link';
import { usePostStore } from '@/app/libs/posts';

export default function HomePage() {
  const { filteredPosts, posts } = usePostStore();
  
  const displayPosts = filteredPosts.length > 0 ? filteredPosts : posts;

  if (displayPosts.length === 0) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors duration-300">
        
        <main className="container mx-auto p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">No posts available</h1>
          <Link 
            href="/admin" 
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200"
          >
            Add Your First Post
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      
      <main className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Latest Posts</h1>
          <Link 
            href="/admin" 
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200"
          >
            Manage Posts & Admin Panel
          </Link>
        </div>
        <div className="flex flex-col gap-8">
          {displayPosts.length > 0 && (
            <div className="relative">
              <img 
                src={displayPosts[0].image} 
                alt={`Image for ${displayPosts[0].title}`} 
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-2">{displayPosts[0].title}</h2>
                <div className="flex gap-2 flex-wrap">
                  {displayPosts[0].tags.map(tag => (
                    <span key={tag} className="text-sm bg-purple-600 text-white px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayPosts.map((post) => (
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
                    <span>{post.likes} Likes</span>
                    <span>{post.views} Views</span>
                    <span>{post.comments} Comments</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
