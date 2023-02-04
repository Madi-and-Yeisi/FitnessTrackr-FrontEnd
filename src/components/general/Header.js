import React from 'react';
import { Link } from "react-router-dom"; 

import { BiLogOutCircle, BiLogInCircle } from 'react-icons/bi';

import Navbar from './Navbar';


const Header = ({ loggedIn, profileData }) => {

    return (
        <div className='sticky-header center-column'>
            <header className='sticky-header'>
                <h1 className="title">Fitness Trackr</h1>
                {
                loggedIn ? <Link className='logout' to='profile/logout'><BiLogOutCircle className='flip' />Log out</Link> : <Link className='logout' to='profile/login'><BiLogInCircle />Log in</Link>
                }
            </header>
            <div className='nav-container'>
                <Navbar loggedIn={loggedIn} profileData={profileData}/>
            </div>
        </div>
    )
};

export default Header; 