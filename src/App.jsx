import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Notfound from './pages/Notfound'
import Products from './pages/Products'
import AllProducts from './pages/AllProducts'
import DealsProducts from './pages/DealsProducts'
import NewProducts from './pages/NewProducts'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/all-products' element={<AllProducts />} />
          <Route path='/deal-products' element={<DealsProducts />} />
          <Route path='/new-products' element={<NewProducts />} />



          <Route path='/*' element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
