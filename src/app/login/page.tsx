import React from 'react'
import Navbar from '../components/navbar'

import Singinbutton from './components/singinbutton'
import AuthContextProvider from '../libs/contexts/AuthContext'

const Page = () => {
  return (
    <div>
      <video
        autoPlay
        muted
        loop
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 object-cover -z-10"
      >
        <source src="/images/Lock.mp4" type="video/mp4" />
      </video>

      <Navbar title="Login" />

      <div className="h-[calc(100vh-64px)] flex items-center justify-center">
       <AuthContextProvider> <Singinbutton/> </AuthContextProvider>
      </div>
    </div>
  )
}

export default Page