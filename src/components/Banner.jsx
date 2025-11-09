import React, { useEffect, useState } from 'react'
import watch from '../assets/images/watch.png'
import { priceAndText } from '../constants'
import { Link } from 'react-router-dom'
import { getAllCategories } from "../services/category.service"
import { getItemFromLocalStorage } from '../helpers/helper'

const Banner = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllCategories();
            if (res?.data) {
                setCategories(res.data);
            }
        };
        fetchData();
        const data = getItemFromLocalStorage("user-data")
        // console.log(data)
    }, []);

    return (
        <div className="w-screen bg-gradient-to-br from-black to-[#0e1847] text-white pb-20 p-8">

            {/* ---------------- HERO ---------------- */}
            <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col gap-4">
                    <div className="font-bold text-[#dcff6a]">
                        🌍 International Ecommerce
                    </div>

                    <div className="text-[3rem] quicksand w-80 leading-tight">
                        Global growth without limits
                    </div>

                    <div className="w-96 text-gray-300">
                        Simplify cross-border sales and scale your business with the platform built for global success.
                    </div>
                </div>

                <img src={watch} alt="" className="w-1/3 drop-shadow-2xl" />
            </div>

            {/* ---------------- Highlight Boxes ---------------- */}
            <div className="text-[2rem] quicksand w-1/2 mb-6">
                Take your brand worldwide on the platform trusted by millions
            </div>

            <div className="grid grid-cols-3 gap-8 mt-6">
                {priceAndText.map((pAndT, index) => (
                    <div
                        key={index}
                        className="relative bg-gradient-to-br from-black to-[#111b5d] p-6 rounded-xl border border-white/10 backdrop-blur-md hover:scale-[1.03] transition cursor-pointer"
                        style={{
                            boxShadow: "inset 0 0 20px rgba(105,65,255,0.3)"
                        }}
                    >
                        <div className="text-4xl font-semibold text-[#dcff6a]">{pAndT.price}</div>
                        <div className="quicksand text-lg mt-2 text-gray-200">{pAndT.text}</div>

                        <div className="absolute -top-4 -right-4 p-[2px] rounded-full bg-gradient-to-r from-[#7684ff] to-[#2d53e5] shadow-xl">
                            <div className="rounded-full bg-gradient-to-br p-2 from-[#485bae] to-[#1d1a1a] w-12 h-12 flex justify-center items-center text-xl">
                                {pAndT.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ---------------- Categories Title ---------------- */}
            <div className="mt-16 text-2xl quicksand font-semibold">Browse by category</div>

            {/* ---------------- Category Grid ---------------- */}
            <div className="grid grid-cols-4 gap-6 mt-6">
                {categories.length === 0 ? (
                    <div className="col-span-4 text-gray-400">No categories available.</div>
                ) : (
                    categories.map((cat) => (
                        <Link
                            to={`/products?category=${encodeURIComponent(cat.name)}`}
                            key={cat._id}
                            className="group bg-gradient-to-br from-[#0b0f24] to-[#16245a] border border-white/10 
                                       rounded-xl p-5 flex flex-col items-center justify-center gap-3
                                       hover:scale-105 hover:border-[#dcff6a] transition duration-300 cursor-pointer"
                        >
                            {/* Category Icon Circle */}
                            <div className="w-16 h-16 rounded-full bg-[#dcff6a] text-black flex items-center justify-center 
                                             text-xl font-bold shadow-md group-hover:rotate-6 transition">
                                {cat.name?.slice(0, 1).toUpperCase()}
                            </div>

                            {/* Name */}
                            <div className="text-lg font-medium group-hover:text-[#dcff6a] transition">
                                {cat.name}
                            </div>
                        </Link>
                    ))
                )}
            </div>

            <div className="mt-16 text-2xl quicksand font-semibold">Browse by Discount</div>
            {/* ---------------- Category Grid ---------------- */}
            <div className="grid grid-cols-4 gap-6 mt-6">


                <Link
                    to={`/products?discount=${true}`}

                    className="group bg-gradient-to-br from-[#0b0f24] to-[#16245a] border border-white/10 
                                       rounded-xl p-5 flex flex-col items-center justify-center gap-3
                                       hover:scale-105 hover:border-[#dcff6a] transition duration-300 cursor-pointer"
                >
                    {/* Category Icon Circle */}
                    <div className="w-16 h-16 rounded-full bg-[#dcff6a] text-black flex items-center justify-center 
                                             text-xl font-bold shadow-md group-hover:rotate-6 transition">
                        D
                    </div>

                    {/* Name */}
                    <div className="text-lg font-medium group-hover:text-[#dcff6a] transition">
                        Discount Items
                    </div>
                </Link>

            </div>


        </div>
    )
}

export default Banner