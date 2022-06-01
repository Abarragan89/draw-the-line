import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useState } from "react";
import './nav.css';
import { Button, Offcanvas } from 'react-bootstrap'
import { QUERY_ME_BASIC } from "../../utils/queries";
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';

function Nav() {
    const location = useLocation()

    // offCanvas 
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
            return { color: "silver" }
        }
    }

    const { data } = useQuery(QUERY_ME_BASIC);
    const userId = data?.me._id || '';

    return (
        <>
            <div id="nav-container">
                <Button className="openbtn" onClick={handleShow}>
                    ☰
                </Button>
            </div>

            <Offcanvas placement="end" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Draw The Line</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <section id="nav-tabs">
                        <ul className="tabpanel">
                            {/* <a  className="closebtn" onClick={openNav()}>×</a> */}
                            <Link to="/" className="tab">Home</Link>
                            <Link to={`/profile/${userId}`}>View my profile</Link>
                            <Link to="/Create-post" className="tab">Create Post</Link>
                            <Link to="/search-people" className="tab">Search People</Link>
                            <Link to="/about" className="tab">About</Link>
                            <a onClick={() => Auth.logout()} className="tab">Logout</a>
                        </ul>
                        {/* <button className="openbtn" onClick={onClick}>☰</button> */}
                    </section>

                </Offcanvas.Body>
            </Offcanvas >

        </>
    )
}


export default Nav;