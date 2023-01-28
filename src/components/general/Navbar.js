import React from "react";
import { Link } from "react-router-dom"; 

import { BiHomeAlt, BiUser } from 'react-icons/bi';
import { FaRegListAlt } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai';

const Navbar = (props) => {

    return (
        <nav>
            <Link to="/" className="nav-link"><BiHomeAlt />Home</Link>
            <Link to="routines" className="nav-link"><FaRegListAlt />Routines</Link>
            <Link to="activities" className="nav-link"><AiOutlineHeart />Activities</Link>
            {
                props.loggedIn ? <Link to={"/profile"} className="nav-link"><BiUser />Profile</Link> : null
            }
        </nav>
    )
};

export default Navbar; 