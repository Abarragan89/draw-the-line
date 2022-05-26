import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useState } from "react";
import './nav.css';

function Nav() {
    const location = useLocation() 
    const [show, setShow] = useState(false);
    const onClick = () => setShow(true);
        // console.log(location.pathname);

        const selectedTab = location.pathname;

        function activeTab(path) {
            if (selectedTab !== path) {
                return;
            } else {
                return {color: "silver"}
            }
        }


        // function openNav() {
        //     setShow(true);
        //   }
          
        //   function closeNav() {
        //     setShow(false);
        //   }

    return (
        <section id="nav-tabs">
            <ul className="tabpanel">
            {/* <a  className="closebtn" onClick={openNav()}>×</a> */}
                <Link to="/" className="tab">Home</Link>
                <Link to="/Profile" className="tab">Profile</Link>
                <Link to="/Contact" className="tab">Contact</Link>
                <Link to="/Logout" className="tab">Logout</Link>
            </ul>
            <button className="openbtn" onClick={onClick}>☰</button>
        </section>
    )
}

export default Nav;