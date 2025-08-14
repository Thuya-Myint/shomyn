import React from 'react'
import watch from '../assets/images/watch.png'
import { priceAndText, allCategories } from '../constants'
import { Link } from 'react-router-dom'
const Banner = () => {
    return (
        <div className='w-screen bg-gradient-to-br from-black  to-[#0e1847]  text-white pb-20
        p-8'>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-4'>
                    <div className='font-bold'>🌍 International Ecommerce</div>
                    <div className='text-[3rem] quicksand w-80'>Global growth without limits</div>
                    <div className='w-96'>
                        Simplify cross-border sales and scale your business with the platform built for global success.
                    </div>

                    <button className='bg-[#dcff6a] active:opacity-60 text-black w-fit px-4 py-2 rounded-lg'>
                        Start Selling Globally
                    </button>


                </div>
                <img src={watch} alt="" className='w-1/3' />
            </div>
            <div className='text-[2rem] quicksand w-1/2'>
                Take your brand worldwide on the platform trusted by millions
            </div>

            <div className='grid grid-cols-3 gap-8 mt-10'>
                {
                    priceAndText.map((pAndT, index) => (
                        <div
                            key={index}
                            className='bg-gradient-to-br relative  from-black to-[#0e1847] p-8 rounded-xl'
                            style={{
                                boxShadow: "inset 0px 0px 20px rgba(105,65,255,0.3)"
                            }}
                        >
                            <div className='text-4xl'>{pAndT.price}</div>
                            <div className='quicksand text-xl mt-2'>{pAndT.text}</div>

                            <div className='absolute -top-4 -right-4 p-[2px] bg-white rounded-full 
                            bg-gradient-to-br from-[#0c0f1a] via-white to-[#0c1022]'>
                                <div className=' rounded-full  bg-gradient-to-br p-2  from-[#485bae] to-[#292727]  bg-white w-10 h-10 flex justify-center items-center text-xl'>
                                    {pAndT.icon}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='mt-10 text-2xl quicksand'>Browse by category</div>
            <div className='mt-4 grid grid-cols-8 gap-4'>
                {
                    allCategories.map(cat =>
                        <Link key={cat.id} to={'/products'} state={cat.category} className='bg-white text-black active:bg-white/40 p-2 text-center rounded-xl' >
                            {cat.category}
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default Banner