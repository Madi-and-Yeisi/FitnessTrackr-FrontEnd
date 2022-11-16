import React from "react";
import { Link } from "react-router-dom"; 

const Navbar = (props) => {

    return (
        <nav className="navbar">
            <Link to="/" className="link">Home</Link>
            <Link to="routines" className="link">Routines</Link>
            <Link to="activities" className="link">Activities</Link>
            {
                props.loggedIn ? <Link to={"/routines/my-routines"} className="link">My Routines</Link> : null
            }
        </nav>
    )
};

export default Navbar; 