import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

import Navbar from './Navbar';

const Homepage = () => {

    const [ routines, setRoutines ] = useState([]);

    const [ profileData, setProfileData ] = useState({});
    const [ loggedIn, setLoggedIn ] = useState(false);


    useEffect(() => {
        async function isLoggedIn() {    
            try {
                const response = await fetch(
                    'https://fitnesstrac-kr.herokuapp.com/api/users/me',
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                    })
                    
                const data = await response.json();
                // console.log("User profile data: ", data);

                if (data.username) {
                    setProfileData(data);
                    setLoggedIn(true);
                }
            } catch(error) {
                console.log(error);
            }
        }
        isLoggedIn();
    }, []);


    useEffect(() => {
        async function fetchRoutines() {
            try {
                const response = await fetch(
                    'https://fitnesstrac-kr.herokuapp.com/api/routines',
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )
                const data = await response.json();
                // console.log("routines data: ", data);
                setRoutines(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRoutines();
    }, []);


    return (
        <div>
            <div className='header'>
                <h1 className='title'>FitnessTrackr</h1>
                {
                    loggedIn ? <Link to="profile/logout" className='login'>Logout</Link> : <Link to="profile/login" className='login'>Login</Link>
                }
            </div>
            <Navbar loggedIn={loggedIn} profileData={profileData} />

            <Outlet context={{ routines, setRoutines, profileData, setProfileData, loggedIn, setLoggedIn }} />
        </div>

    )
}

export default Homepage;