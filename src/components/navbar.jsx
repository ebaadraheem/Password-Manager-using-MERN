import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className=' bg-cyan-700 flex gap-2 justify-center items-center h-12'>
        <img width={25} src="user-lock.svg" alt="" /><h1 className=" text-lg font-bold">Password Manager</h1>
      </nav>
    </div>
  )
}

export default Navbar