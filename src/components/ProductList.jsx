import { div } from 'framer-motion/client'
import React, { useState } from 'react'

const ProductList = ({ products, fromAllProducts = false }) => {

    const [currentProducts, setCurrentProducts] = useState(products)
    const [selectedGender, setSelectedGender] = useState('')

    const onChangeGender = (gender) => {
        console.log(gender)
        setSelectedGender(gender)
        const filterProducts = products.filter(product => product.gender === gender)
        console.log("filtered products ", filterProducts)
        setCurrentProducts(filterProducts)
    }

    return (
        <div>
            {
                fromAllProducts &&

                <div className='flex gap-4 items-center w-fit bg-slate-300 p-2 mt-10 rounded-xl'>
                    <div>Filter By Gender </div>
                    <button className={`bg-neutral-200 p-2 w-[100px] text-center rounded-xl ${selectedGender === "male" && 'bg-neutral-400'}`} onClick={() =>
                        onChangeGender('male')}>Male</button>
                    <button className={`bg-neutral-200 p-2 w-[100px] text-center rounded-xl ${selectedGender === "female" && 'bg-neutral-400'}`} onClick={() => onChangeGender('female')}>Female</button>
                    <button className={`bg-neutral-200 p-2 w-[100px] text-center rounded-xl ${selectedGender === "unisex" && 'bg-neutral-400'}`} onClick={() => onChangeGender('unisex')}>Unisex</button>
                </div>

            }
            <div className='grid grid-cols-4 gap-4 mt-10'>
                {
                    currentProducts.map(product => (
                        <div key={product.id} className='bg-slate-200 border-l-4 border-slate-400 p-2'>
                            {product.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductList