import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';

import './general.css';
import '../fitness/fitness.css'

import { fetchRoutines } from '../../api/routines';
import { userFetch } from '../../api/users';

import Navbar from './Navbar';

const App = () => {

    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ profileData, setProfileData ] = useState({});

    const [ routines, setRoutines ] = useState([]);


    useEffect(() => {
        getRoutines();
        checkForUser();
    }, []);


    async function getRoutines() {
        const routinesData = await fetchRoutines();

        if ( routinesData.length ) {
            setRoutines(routinesData);
        } else {
            console.log( routinesData.error );
        }
    }


    async function checkForUser() {
        const meData = await userFetch();    // arg me data

        if ( meData.success ) {
            console.log('welcome ' + meData.user.username);
            setLoggedIn(true);
            setProfileData(meData.user);
        } else {
            console.log(meData.message);
        }
    }


    return (
        <div className='vert-flex-container'>
            <div className='sticky-header vert-flex-container'>
                <header className='sticky-header'>
                    <h1 className="title">Fitness Trackr</h1>
                    {
                    loggedIn ? <Link className='logout' to='profile/logout'><AiOutlineLogout />Log out</Link> : <Link className='logout' to='profile/login'><AiOutlineLogin />Log in</Link>
                    }
                </header>
                <div className='nav-container'>
                    <Navbar loggedIn={loggedIn} profileData={profileData}/>
                </div>
            </div>

            <Outlet context={{ routines, setRoutines, profileData, setProfileData, loggedIn, setLoggedIn }} />
        </div>

    )
}

export default App;