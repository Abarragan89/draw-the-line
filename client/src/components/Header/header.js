import React from 'react'
import './header.css'
import Nav from '../Nav/nav.js'


const Header = () => {
  return (
    <header>
        <h1 className="logoFont">Draw The Line</h1>
        <Nav/>
    </header>
  )
}

export default Header