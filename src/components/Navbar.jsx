import React, { useEffect, useState } from 'react'
import { navItems } from '../constants'
import logo from '../assets/images/logo2.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
const Navbar = () => {
    const myScreenWidth = window.innerWidth
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <nav className='p-4 flex  w-full bg-black text-white justify-between items-center quicksand'>
            <div className=' flex gap-2 items-center'
                onClick={() => {
                    navigate("/")
                }}
            >
                <img src={logo} alt="Shomyn logo" className='w-28 h-16 rounded-2xl'
                />
            </div>
            <div className='md:flex hidden gap-8'>
                {
                    navItems.map((item, index) => {
                        return <NavLink
                            to={item.path}
                            key={item.path}
                            className={({ isActive }) => `${isActive ? 'text-white' : 'text-white/30'}`}
                        >
                            {item.title}
                        </NavLink>
                    })
                }
            </div>
            {
                myScreenWidth <= 768 &&
                <div className='bg-black/20 z-50 p-2 rounded-xl group active:bg-black/50'
                    onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                    style={{
                        boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.4)"
                    }}
                >
                    <HiOutlineMenuAlt3 className='text-2xl cursor-pointer group-active:opacity-25' />
                </div>
            }
            {
                myScreenWidth <= 768 &&
                <nav className={`transition-all duration-500 ease-in-out fixed top-0 z-40  right-0 ${isSideBarOpen ? 'sm:w-[60%] w-[70%]' : 'w-0'}  h-screen bg-white`}
                    style={{
                        boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.4)"
                    }}
                >
                    <div className=' p-4 mt-14 flex flex-col gap-4'>
                        {
                            navItems.map((nav) =>
                                <NavLink
                                    to={nav.path}
                                    className={({ isActive }) => `${isActive ? 'text-black' : 'text-black/40'} rounded-lg p-2 hover:bg-black/20 group flex items-center`}>

                                    {nav.title}

                                </NavLink>
                            )
                        }
                    </div>
                </nav>
            }
            {
                myScreenWidth <= 768 && isSideBarOpen &&
                <div className='bg-black/20 fixed z-20 inset-0 w-screen h-screen'>

                </div>
            }
        </nav >
    )
}

export default Navbar
