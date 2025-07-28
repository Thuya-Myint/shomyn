import React from 'react'

import { FaEye, FaEyeSlash } from 'react-icons/fa'
const Login = () => {
    return (
        // main div
        <div className='w-screen h-screen bg-login flex  justify-center items-center'>
            {/* image and form div */}

            <div className='grid sm:grid-cols-2 grid-cols-1  p-2  rounded-2xl sm:bg-white/30 xl:w-1/2 lg:w-2/3 md:w-[80%] w-[100%]'>
                {/* image div */}
                <div className='sm:block rounded-l-xl bg-shopNow  hidden '>

                </div>
                {/* form */}
                <form className='quicksand p-4 flex flex-col gap-8'>
                    <h1 className='text-2xl'>Login as a user!</h1>

                    {/* username div */}
                    <div>
                        <input type="text"
                            autoFocus
                            placeholder='Username'
                            className='capitalize p-2 px-8 border-2 w-full transition-all duration-300 placeholder:text-black/30
                             focus:border-slate-400 bg-white/40 focus:bg-slate-100 rounded-md border-slate-200 outline-none'
                        />
                    </div>


                    {/* email div */}
                    <div>
                        <input
                            type="email"
                            placeholder='Email'
                            className=' p-2 px-8 border-2 w-full transition-all duration-300 placeholder:text-black/30
                             focus:border-slate-400  bg-white/40 focus:bg-slate-100 rounded-md border-slate-200 outline-none'
                        />
                    </div>


                    {/* password div */}
                    <div className='relative flex items-center'>
                        <input
                            type="password"
                            placeholder='Password'
                            className=' p-2 px-8 border-2 w-full transition-all duration-300 placeholder:text-black/30
                             focus:border-slate-400  bg-white/40 focus:bg-slate-100 rounded-md border-slate-200 outline-none'
                        />
                        {/* show hide password icon */}
                        <FaEye className='absolute right-4' />
                    </div>

                    <div className='md:flex justify-between items-center'>
                        {/* remember me */}
                        <div className='flex items-center gap-1 cursor-pointer'>
                            <input type="checkbox" id='remember' />
                            <label htmlFor="remember">Remember Me</label>
                        </div>
                        {/* forgot password */}
                        <div className='transition-all md:text-left text-center duration-300 cursor-pointer text-black/40 hover:text-black underline'>
                            Forgot password!
                        </div>
                    </div>

                    {/* signup signin button */}
                    <button className='bg-blue-400 px-8 py-2 rounded-lg text-white active:bg-blue-300'>
                        Login
                    </button>

                    {/* new user or old user singin signup */}
                    <div className='flex gap-1 mx-auto'>
                        <div>Don't have an account.</div>
                        <div className='underline'>Sign Up</div>
                    </div>
                </form>

            </div>
        </div >
    )
}

export default Login
