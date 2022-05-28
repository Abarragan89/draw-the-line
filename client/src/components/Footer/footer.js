import React from 'react'
import './footer.css'
import { AiOutlineInstagram } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaStackOverflow } from 'react-icons/fa';
import { AiFillMail } from 'react-icons/ai';


const Footer = () => {
  return (
      <footer>
          <a href='https://www.instagram.com/draw_the_line_co/' className='instagramIcon'><AiOutlineInstagram size={25}/></a>
          <a href='https://twitter.com/DrawTheLineCo' className='twitterIcon'><AiOutlineTwitter size={25}/></a>
          <a href='https://stackoverflow.com/users/17585483/sophie-homer' className='stackOverflowIcon'><FaStackOverflow size={25}/></a>
          <a href='mailto:drawthelinecompany@gmail.com' className='emailIcon'><AiFillMail size={25}/></a>
      </footer>
  )
}

export default Footer