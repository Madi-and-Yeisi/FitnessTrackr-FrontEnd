import React from 'react';
import { Link, useOutletContext, useNavigate } from "react-router-dom";


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
        <div>
            <p>Are you sure you want to log out?</p>
            <button onClick={logOutUser}>LOGOUT</button>
        </div>
    )
}

export default Logout;