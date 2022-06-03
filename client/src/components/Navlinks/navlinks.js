import { NavLink } from "react-router-dom";
import './navlinks.css';
import { QUERY_ME_BASIC } from "../../utils/queries";
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';


function NavLinks ({ closeMobileMenu, isMobile }) {
    // Get user Data
    const { data } = useQuery(QUERY_ME_BASIC);
    const userId = data?.me._id || '';

    // check if logged in
    const loggedIn = Auth.loggedIn();
        // const [playSwish, { stop }] = useSound(clickSound, { volume: '.5' });
    
        function closeHamburger () {
            // playSwish();
            if(isMobile) {
                closeMobileMenu();
            }
        }
    return (
        <>
            {loggedIn ?
                <ul className="tabpanel">
                    <li className={'link-el'}
                        onClick={closeHamburger}>
                        <NavLink className={'link-el'} to="/">Home</NavLink>
                    </li>
                    <li className={'link-el'}
                        onClick={closeHamburger}>
                        <NavLink className={'link-el'} to={`/profile/${userId}`}>View my profile</NavLink>

                    </li>
                    <li className={'link-el'}
                        onClick={closeHamburger}>
                        <NavLink className={'link-el'} to="/Create-post">Create Post</NavLink>
                    </li>
                    <li className={'link-el'}
                        onClick={closeHamburger}>
                        <NavLink className={'link-el'} to="/search-people">Search People</NavLink>
                    </li>
                    <li className={'link-el'}
                        onClick={closeHamburger}>
                        <NavLink className={'link-el'} to="/about">About</NavLink>
                        <a className={'link-el'} onClick={() => Auth.logout()} >Logout</a>
                    </li>
                </ul>
                :
                <ul>
                    <li className={'link-el'}
                        onClick={closeHamburger}>
                        <NavLink className={'link-el'} to="/">Home</NavLink>
                    </li>
                    <li className={'link-el'}
                        onClick={closeHamburger}>
                        <NavLink className={'link-el'} to="/signup">Sign In</NavLink>
                    </li>
                    <li className={'link-el'}
                        onClick={closeHamburger}>
                        <NavLink  className={'link-el'} to="/login">Login</NavLink>
                    </li>
                    <li className={'link-el'}
                        onClick={closeHamburger}>
                        <NavLink className={'link-el'} to="/about">About</NavLink>
                    </li>
                </ul>
            }
        </>
    )
}


export default NavLinks;