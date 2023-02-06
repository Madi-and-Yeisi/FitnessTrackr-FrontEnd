import React, { useEffect } from 'react';
import { useOutletContext, useNavigate, Link } from "react-router-dom";

import { MdPublic, MdSettings } from 'react-icons/md';
import { BiLogOutCircle } from 'react-icons/bi';


const Profile = () => {
    const { setLoggedIn, profileData, setProfileData } = useOutletContext();

    const navigate = useNavigate();


    function handleLogOut() {
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
                </div> : <div className='nothing-here'>No profile data...<div className='spinner'></div></div>
            }
        </div>
    )
}

export default Profile;