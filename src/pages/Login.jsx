import React, { useEffect, useState, useRef } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [login, setLogin] = useState(false)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate()
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    useEffect(() => {
        //JSON.parse() (convert string to object)
        const userDataString = localStorage.getItem("user-data")
        const userDataObject = JSON.parse(userDataString)
        console.log("userData ", userDataObject)

        // userDataObject?.rememberMe && navigate('/') 

    }, [])


    const userLogin = () => {

        try {
            if (username.trim() === "") {
                return alert("❌ Username is Required!")
            } else if (!emailRegex.test(email)) {
                return alert("❌ Invalid Email!")
            } else if (password.trim() === "") {
                return alert("❌ Password is Required!")
            }
            //login data valid
            //JSON.strify (to change object to string)
            const userDataString = JSON.stringify({
                username: username,
                email: email,
                rememberMe: rememberMe,
                lastLoginDate: new Date()
            })



            //store data to localstorage (localStorage.setItem())
            localStorage.setItem("user-data", userDataString)
            navigate('/')

        } catch (error) {
            alert("❌ Login Failed!")
        }

    }
    return (
        // main div
        <div className='w-screen h-screen bg-login flex overflow-hidden  justify-center items-center'>
            {/* image and form div */}

            <div className='grid sm:grid-cols-2 grid-cols-1  p-2  rounded-2xl sm:bg-white/30 xl:w-1/2 lg:w-2/3 md:w-[80%] w-[100%]'>
                {/* image div */}
                <div className='sm:block rounded-l-xl bg-shopNow  hidden '>

                </div>
                {/* form */}
                <div className='quicksand p-4 flex flex-col gap-8' onSubmit={(e) => {
                    e.preventDefault()
                    userLogin()
                }}>
                    <h1 className='text-2xl'>
                        {
                            login ? ' Login as a user!' : 'Register as a user!'
                        }
                    </h1>

                    {/* username div */}
                    <div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={(e) => {
                                e.key === "Enter" && emailRef.current.focus()
                            }}
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
                            ref={emailRef}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => {
                                e.key === "Enter" && passwordRef.current.focus()
                            }}
                            placeholder='Email'
                            className=' p-2 px-8 border-2 w-full transition-all duration-300 placeholder:text-black/30
                             focus:border-slate-400  bg-white/40 focus:bg-slate-100 rounded-md border-slate-200 outline-none'
                        />
                    </div>


                    {/* password div */}
                    <div className='relative flex items-center'>
                        <input
                            type={`${showPassword ? 'text' : 'password'}`}
                            value={password}
                            ref={passwordRef}
                            onKeyDown={(e) => e.key === "Enter" && userLogin()}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            className=' p-2 px-8 border-2 w-full transition-all duration-300 placeholder:text-black/30
                        focus:border-slate-400  bg-white/40 focus:bg-slate-100 rounded-md border-slate-200 outline-none'
                        />
                        {/* show hide password icon */}

                        {

                            showPassword ?
                                <FaEyeSlash className='absolute right-4 cursor-pointer active:opacity-50' onClick={() => setShowPassword(false)} />
                                :
                                <FaEye className='absolute right-4 cursor-pointer active:opacity-50' onClick={() => setShowPassword(true)} />

                        }

                    </div>

                    <div className='md:flex justify-between items-center'>
                        {/* remember me */}
                        <div className='flex items-center gap-1 cursor-pointer'>
                            <input
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                type="checkbox"
                                id='remember'
                            />
                            <label
                                htmlFor="remember"
                            >Remember Me</label>
                        </div>


                        {/* forgot password */}
                        <div className='transition-all md:text-left text-center duration-300 cursor-pointer text-black/40 hover:text-black underline'>
                            Forgot password!
                        </div>
                    </div>

                    {/* signup signin button */}
                    <button className='bg-blue-400 px-8 py-2 rounded-lg text-white active:bg-blue-300'>
                        {
                            login ? "Login" : "Register"
                        }
                    </button>

                    {/* new user or old user singin signup */}
                    <div className='flex gap-1 mx-auto'>
                        <div>
                            {
                                login ?
                                    "Don't have an account!"
                                    :
                                    "Already have an account!"
                            }
                        </div>
                        {
                            login ?
                                <div className='underline cursor-pointer active:opacity-35'
                                    onClick={() => {
                                        setLogin(false)
                                    }}>
                                    Register
                                </div>
                                :
                                <div className='underline cursor-pointer active:opacity-35'
                                    onClick={() => {
                                        setLogin(true)
                                    }}
                                >
                                    Login
                                </div>
                        }
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Login
