import React from 'react';
import { useOutletContext, useNavigate, Link } from "react-router-dom";

import { MdPublic, MdSettings } from 'react-icons/md';
import { BiLogOutCircle } from 'react-icons/bi';


const Profile = () => {
    const { loggedIn, setLoggedIn, profileData, setProfileData } = useOutletContext();

    const navigate = useNavigate();

    function handleLogOut() {
        // console.log("logging out");
        localStorage.removeItem("token");
        setProfileData({});
        setLoggedIn(false);
        navigate('/');
    }

    return (
        <div className='page-container'>
            <header>
                <h1>Hey { loggedIn ? <div className='inline'> {profileData.username}!</div> : null }</h1>
            </header>
            <div className='profile-container'>
                <Link to='/routines/my-routines' className='profile-button-link'><MdPublic className='profile-icon'/>Your Routines</Link>
                <Link to='' className='profile-button-link'><MdSettings className='profile-icon'/>Your Account</Link>
                <button onClick={handleLogOut}><BiLogOutCircle className='profile-icon flip'/>Log Out</button>
            </div>
        </div>
    )
}

export default Profile;