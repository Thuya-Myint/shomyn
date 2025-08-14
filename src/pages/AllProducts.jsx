import React from 'react'
import ProductList from '../components/ProductList'
import { dealsProduct, newArrival, allproducts } from '../constants'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { addToCartItemsState } from '../atoms'

const AllProducts = () => {
    const allProduct = [...dealsProduct, ...newArrival, ...allproducts]

    // const [cartItems, setCartItems] = useRecoilState(addToCartItemsState)
    const setData = useSetRecoilState(addToCartItemsState)

    // console.log('cartItems:', cartItems)
    // console.log('setData:', setData)

    return (
        <div className='p-10'>
            <h1 className='text-2xl'>All Products</h1>
            <ProductList
                products={allProduct}
                fromAllProducts={true}
            />
        </div>
    )
}

export default AllProducts
