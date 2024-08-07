import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <main>
            <Header/>
            {/* The nested route components will be rendered here */}
            <Outlet/>
        </main>
    </>
  )
}

export default Layout