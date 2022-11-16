import React from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";

const Logout = () => {

    const { setProfileData, setLoggedIn } = useOutletContext();
    const navigate = useNavigate();

    function logOutUser() {
        // console.log("logging out");
        localStorage.removeItem("token");
        setProfileData({});
        setLoggedIn(false);
        navigate('/');
    }

    return (
        <div className='centered'>
            <h1>Are you sure you want to log out?</h1>
            <button onClick={logOutUser} className='green button'>LOGOUT</button>
        </div>
    )
}

export default Logout;