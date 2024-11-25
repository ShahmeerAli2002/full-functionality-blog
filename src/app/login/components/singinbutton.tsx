"use client"
import { useAuth } from '@/app/libs/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BsGoogle } from 'react-icons/bs'

const Singinbutton = () => {
   const {
     user,
    isLoading,
    error,
    handelSigninWithGoogle,
    handelLogout,
   } = useAuth();
   
   const router = useRouter();
   const [showPopup, setShowPopup] = useState(false);
   const [buttonHover, setButtonHover] = useState(false);

   useEffect(() => {
     if(user) {
       router.push('/dashboard');
     }
   }, [user, router]);

   useEffect(() => {
     const interval = setInterval(() => {
       setShowPopup(prev => !prev);
     }, 2000);
     return () => clearInterval(interval);
   }, []);
  
   if(user){ 
    return null;
   }
     
  return <>
  { error && <p className='text-red-800 animate-pulse'>{error}</p>}
    <div className="relative flex justify-center">
      {showPopup && (
        <div className="absolute -top-12 transform bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg animate-bounce flex items-center gap-3 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-blue-500 shadow-xl">
          <BsGoogle className="text-xl animate-pulse" />
          <span className="font-medium tracking-wide">Click me to login!</span>
        </div>
      )}
       <button 
       onClick={handelSigninWithGoogle}
       disabled={isLoading}
       onMouseEnter={() => setButtonHover(true)}
       onMouseLeave={() => setButtonHover(false)}
       className={`flex items-center gap-3 px-8 py-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out
         ${buttonHover ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-105' : 'bg-white text-gray-700'}
         hover:shadow-xl border border-gray-200 transform hover:-translate-y-1 active:scale-95`}>
          <BsGoogle className={`text-2xl transition-colors duration-300 ${buttonHover ? 'text-white' : 'text-[#4285F4]'}`}/>
          <span className={`font-semibold tracking-wide ${isLoading && 'animate-pulse'}`}>
            {isLoading ? "Connecting..." : "Sign up with Google"}
          </span>
        </button>
    </div>
  </>
}

export default Singinbutton
