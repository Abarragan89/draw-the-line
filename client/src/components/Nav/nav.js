import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useState } from "react";
import './nav.css';
import {Button, Offcanvas} from 'react-bootstrap'

function Nav() {
    const location = useLocation() 
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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



    return (
        <>
        <Button className="openbtn" onClick={handleShow}>
        ☰
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Draw The Line</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <section id="nav-tabs">
            <ul className="tabpanel">
            {/* <a  className="closebtn" onClick={openNav()}>×</a> */}
                <Link to="/Home" className="tab">Home</Link>
                <Link to="/Profile" className="tab">Profile</Link>
                <Link to="/Contact" className="tab">Contact</Link>
                <Link to="/Logout" className="tab">Logout</Link>
            </ul>
            {/* <button className="openbtn" onClick={onClick}>☰</button> */}
        </section>
                  
        </Offcanvas.Body>
      </Offcanvas>
      </>
    )
}

export default Nav;