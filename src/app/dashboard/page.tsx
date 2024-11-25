import React from 'react'
import Navbar from '../components/navbar'
import HomePage from '../components/blogs'

const page = () => {
  return (
    <div>
     <Navbar title='dashboard'/> 
     <HomePage/>
    </div>
  )
}

export default page
