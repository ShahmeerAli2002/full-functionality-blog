"use client"
import Link from 'next/link'
import React from 'react'
import { useAuth } from '../libs/contexts/AuthContext'

const Navbarbutton = () => {
  const {
    user,
    handelLogout,
  }=useAuth()

    return (
    <div>
     {!user && <Link href="/" className="text-gray-500 dark:text-gray-300 hover:text-purple-500 dark:hover:text-white transition">
              <button></button>
            </Link>}
           {user && (
            <div className="flex items-center gap-2">
              <div>{user?.displayName}</div>



              <Link href="/login">
                <button onClick={handelLogout} className="text-gray-500 dark:text-gray-300 hover:text-purple-500 dark:hover:text-white transition">
                  Logout
                </button>
              </Link>
            </div>
           )}
            {!user && <Link href="" className="text-gray-500 dark:text-gray-300 hover:text-purple-500 dark:hover:text-white transition">
              <button></button>
            </Link>}
    </div>
  )
}

export default Navbarbutton
