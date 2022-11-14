import React from "react";
import { Link } from "react-router-dom"; 

const Navbar = (props) => {

    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="routines">Routines</Link>
            <Link to="activities">Activities</Link>
            {
                props.loggedIn ? <Link to={"/routines/my-routines"}>My Routines</Link> : null
            }
        </nav>
    )
};

export default Navbar; 