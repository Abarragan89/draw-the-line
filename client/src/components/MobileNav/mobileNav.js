import NavLinks from '../Navlinks/navlinks'
import {CgMenuRound, CgCloseO} from 'react-icons/cg';
import { useState } from 'react';
import '../Navlinks/navlinks.css'


function MobileNav () {
    const [open, setOpen] = useState(false)
    const hamburgerIcon = <CgMenuRound className='hamburger' size='35px' color='rgb(229, 229, 241)' onClick={()=> setOpen(!open)}/>
    const closeIcon = <CgCloseO className='hamburger' size='35px' color='rgb(229, 229, 241)' onClick={()=> setOpen(!open)}/>

    function closeMobileMenu () {
        setOpen(false);
    }

    return (
        <nav className='mobile-nav'>
            {open ? closeIcon : hamburgerIcon}
            {open && 
            <NavLinks
            isMobile={true} 
            closeMobileMenu={closeMobileMenu}
            />}
        </nav>
    )
}

export default MobileNav;