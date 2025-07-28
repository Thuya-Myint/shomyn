import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Notfound from './pages/Notfound'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />

          <Route path='/*' element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
