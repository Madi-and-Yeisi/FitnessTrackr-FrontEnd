import React from 'react';
import { useOutletContext, useNavigate, Link } from "react-router-dom";


const Profile = () => {
    const { loggedIn, profileData } = useOutletContext();

    return (
        <div className='centered'>
            <h1>Welcome</h1>
            {
                loggedIn ? <h2>{profileData.username} !</h2> : null
            }
        </div>
    )
}

export default Profile;