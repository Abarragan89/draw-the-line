import React from 'react'
import './header.css'
import Nav from '../Nav/nav.js'
import Auth from '../../utils/auth';
import MobileNav from '../MobileNav/mobileNav';
import '../../assets/sounds/photos/DrawLogo.png'


const Header = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <header className="header">
      <img id='home-logo' src={require('../../assets/sounds/photos/DrawLogo.png')} alt='draw the line logo'/> 
      <nav>
        <Nav />
        <MobileNav />
      </nav>
    </header>
  )
}

export default Header