import React, { useEffect } from 'react';
import { useOutletContext, useNavigate, Link } from "react-router-dom";

import { MdPublic, MdSettings } from 'react-icons/md';
import { BiLogOutCircle } from 'react-icons/bi';


const Profile = () => {
    const { loggedIn, setLoggedIn, profileData, setProfileData } = useOutletContext();
    // console.log('profile data!!!!!!1', profileData) //todo: stop from error while waiting for this

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
            {
                profileData ?
                <div>
                    <header>
                        <h1>Hey {profileData.username}!</h1>
                    </header>
                    <div className='profile-container'>
                        <Link to='/routines/my-routines' className='profile-button-link'><MdPublic className='profile-icon'/>Your Routines</Link>
                        <Link to='' className='profile-button-link'><MdSettings className='profile-icon'/>Your Account</Link>
                        <button onClick={handleLogOut}><BiLogOutCircle className='profile-icon flip'/>Log Out</button>
                    </div>
                </div> : <p className='nothing-here'>No profile data...</p>
            }

        </div>
    )
}

export default Profile;