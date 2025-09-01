import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthTemplate = () => {
  return (
    <div className='bg-[url("https://wallpaper.dog/large/20493446.jpg")] bg-no-repeat bg-cover w-screen h-screen flex justify-center items-center' >
        <Outlet/>
    </div>
  )
}

export default AuthTemplate