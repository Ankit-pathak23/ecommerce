import React from 'react'
import Navbaar from '../components/Navigation/Navbaar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Navigation/Footer'
import {ToastContainer} from 'react-toastify'
import Filer from '../components/Navigation/Filer'
// import 'react-toastify/dist/reactToastify.css'
function Layout() {
  return (
    <>
    <Navbaar/>
    <ToastContainer autoClose={5000}/>
    <Filer>
    <Outlet/>
    </Filer>
    
    <Footer/>
    </>
  )
}

export default Layout