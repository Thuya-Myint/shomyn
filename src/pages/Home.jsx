import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        // get data from localStorage (localstorage.getItem())
        const userData = JSON.parse(localStorage?.getItem("user-data"))
        !userData && navigate("/login")
    }, [])


    return (
        <>
            <Navbar />
            <Banner />
        </>
    )
}

export default Home
