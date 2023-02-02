import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import './general.css';
import '../profile/profile.css';
import '../fitness/activities/activities.css';
import '../fitness/routines/routines.css';
import '../fitness/routineActivities/routine-activities.css';

import { fetchRoutines } from '../../api/routines';
import { meFetch } from '../../api/users';

import Header from './Header';

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

        if ( routinesData.routines.length ) {
            setRoutines(routinesData.routines);
        } else {
            console.log( routinesData.error );
        }
    }


    async function checkForUser() {
        const meData = await meFetch();    // arg me data

        if ( meData.success ) {
            console.log('welcome ' + meData.user.username);
            setLoggedIn(true);
            setProfileData(meData.user);
        } else {
            console.log(meData.message);
        }
    }


    return (
        <div className='center-column'>
            <Header loggedIn={loggedIn} profileData={profileData} />

            <Outlet context={{ routines, setRoutines, profileData, setProfileData, loggedIn, setLoggedIn }} />
        </div>
    )
}

export default App;