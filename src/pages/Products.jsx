
import React, { use, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FaCaretDown } from 'react-icons/fa'
import { allCategories, products } from '../constants'
import { IoIosClose } from 'react-icons/io'


console.log("add", addToCartItemsState)
const Products = () => {
    const location = useLocation()
    const categoryFromState = location.state || null
    const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false)

    const [SelectedCategory, setSelectedCategory] = useState(categoryFromState || "All Categories")

    const [allProducts, setAllProducts] = useState(products)
    const [itemsPerPage, setItemsPerPage] = useState(6)
    const totalPages = Math.ceil(allProducts.length / itemsPerPage)
    const [currentPage, setCurrentPage] = useState(1)


    const firstIndex = (currentPage - 1) * itemsPerPage
    const lastIndex = firstIndex + 5


    const paginateItems = allProducts.slice(firstIndex, lastIndex + 1)

    const [searchKeyword, setSearchKeyword] = useState('')

    // const cartItems = useRecoilValue(addToCartItemsState

    useEffect(() => {
        if (SelectedCategory === "All Categories")
            return setAllProducts(products)

        const filteredItems = products.filter(product => product.category === SelectedCategory)
        setAllProducts(filteredItems)
    }, [SelectedCategory])

    useEffect(() => {
        console.log("paginated ", paginateItems)
    }, [paginateItems])

    useEffect(() => {
        console.log(allProducts)
    }, [allProducts])


    useEffect(() => {
        console.log("search ", searchKeyword)
        const searchedItems = products.filter(item => item.name.toLowerCase().includes(searchKeyword.toLowerCase()))

        setAllProducts(searchedItems)
        setCurrentPage(1)
        console.log(searchedItems)

    }, [searchKeyword])

    const addItemtoCart = (item) => {
        // setCartItems([...cartItems, item])
    }
    return (
        <div className='quicksand p-4'>
            <div className='text-2xl '>Products</div>
            <div className='flex justify-between mt-10'>
                <div className='relative w-fit flex items-center gap-2 '>

                    <div>Filter By  </div>
                    <div className='border-2 flex items-center select-none gap-2 border-black px-4 py-1 rounded-lg cursor-pointer' onClick={() => setIsSelectBoxOpen(!isSelectBoxOpen)}>
                        {SelectedCategory}
                        <FaCaretDown />
                    </div>

                    {
                        SelectedCategory !== "All Categories" &&
                        <div className='flex items-center bg-slate-200 p-2 rounded-xl cursor-pointer' onClick={() => {
                            setSelectedCategory("All Categories")
                            setIsSelectBoxOpen(false)
                        }
                        }><IoIosClose className='text-xl text-red-500' /> Clear Filter</div>
                    }

                    {
                        isSelectBoxOpen && <div className='absolute left-[20%] top-10 bg-white shadow-lg flex flex-col  shadow-black/20 p-4 rounded-xl'>
                            {
                                allCategories.map(cat =>
                                    <div key={cat.id} className='hover:bg-black/20 rounded-xl  p-2 cursor-pointer active:text-white' onClick={() => {
                                        setSelectedCategory(cat.category)
                                        setIsSelectBoxOpen(false)
                                    }}>

                                        {cat.category}
                                    </div>
                                )
                            }
                        </div>
                    }
                </div>
                <div className='flex items-center gap-4'>
                    {/* <input value={itemsPerPage} type="number" className='bg-slate-200 p-2 w-56 rounded-md'
                        onChange={(e) => setItemsPerPage(parseInt(e.target.value))} /> */}
                    <input value={searchKeyword} type="text" className='bg-slate-200 p-2 w-56 rounded-md' placeholder='Search product'
                        onChange={(e) => setSearchKeyword(e.target.value)} />
                    <div className='flex gap-6'>
                        <button className='bg-amber-300 p-2 rounded-xl disabled:cursor-not-allowed disabled:bg-amber-100 cursor-pointer active:opacity-45'
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >prev</button>
                        <div className='flex items-center gap-2'>
                            {
                                Array.from({ length: totalPages }, (_, i) =>
                                    <button
                                        key={i}
                                        className={`w-6 rounded-md 
                                        ${currentPage === i + 1 ? 'bg-blue-400' : 'bg-slate-200 '}
                                         cursor-pointer active:opacity-45 text-center disabled:cursor-not-allowed`}
                                        disabled={currentPage === i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>)
                            }
                        </div>

                        <button className='bg-green-400 disabled:cursor-not-allowed disabled:bg-green-100 p-2 rounded-xl cursor-pointer active:opacity-45'
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >next</button>
                    </div>
                </div>
            </div>

            {/* <div className='mt-4'>Total Items : {allProducts.length}</div> */}
            <div className='mt-10 grid grid-cols-6 gap-10'>
                {
                    paginateItems.map((product, index) =>
                        <div key={product.id} className='bg-white shadow-md p-4 rounded-xl shadow-black/10 flex flex-col justify-between gap-6'>
                            <div>
                                {product.name}
                            </div>
                            <div>
                                {product.price}
                            </div>
                            <div className='bg-black/20 p-1 rounded-xl'>
                                {product.category}
                            </div>

                            <button className='bg-blue-400 p-2 rounded-xl text-white' onClick={() => addItemtoCart(product)}>Add to cart</button>
                        </div>
                    )
                }
            </div>


        </div >
    )
}

export default Products