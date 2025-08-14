import React from 'react'
import ProductList from '../components/ProductList'
import { newArrival } from '../constants'

const NewProducts = () => {
    return (
        <div className='p-10'>
            <h1>
                New Arrivals
            </h1>
            <ProductList products={newArrival} />
        </div>
    )
}

export default NewProducts