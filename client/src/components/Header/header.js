import React from 'react'
import './header.css'
import Nav from '../Nav/nav.js'
import Auth from '../../utils/auth';
import MobileNav from '../MobileNav/mobileNav';


const Header = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <header className="header">
      <h1 className="logoFont">Draw The Line</h1>
      <nav>
        <Nav />
        <MobileNav />
      </nav>
    </header>
  )
}

export default Header