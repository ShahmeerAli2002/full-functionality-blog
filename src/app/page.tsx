import React from 'react'
import Navbar from './components/navbar'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      <Navbar/>
      <div >
      <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors duration-300 bg-[url('/images/cover.gif')] bg-cover bg-center">
        
        <main className="container mx-auto p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">No posts available click to add Your post</h1>
          <Link 
            href="/login" 
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200"
          >
            Add Your First Post
          </Link>
        </main>
      </div>

      </div>
      
    </div>
  )
}

export default page