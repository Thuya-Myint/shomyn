import React from 'react'
import ProductList from '../components/ProductList'
import { dealsProduct } from '../constants'

const DealsProducts = () => {
    return (
        <div className='p-10'>
            <h1 className='text-2xl'> Deals Product </h1>
            <ProductList products={dealsProduct} />
        </div>
    )
}

export default DealsProducts