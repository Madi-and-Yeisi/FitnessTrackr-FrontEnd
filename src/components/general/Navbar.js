import React from "react";
import { Link } from "react-router-dom"; 

import { BiHomeAlt, BiDumbbell, BiUser } from 'react-icons/bi';
import { MdPublic } from 'react-icons/md';

const Navbar = (props) => {

    return (
        <nav>
            <Link to="/" className="nav-link"><BiHomeAlt />Home</Link>
            <Link to="routines" className="nav-link"><MdPublic />Routines</Link>
            <Link to="activities" className="nav-link"><BiDumbbell />Activities</Link>
            {
                props.loggedIn ? <Link to={"/profile"} className="nav-link"><BiUser />Profile</Link> : null
            }
        </nav>
    )
};

export default Navbar; 