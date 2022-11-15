import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import EditActivity from './EditActivity';
import EditRoutineActivity from '../routineActivities/EditRoutineActivity';

const ActivityPreview = (props) => {
    const activityData = props.activity;

    const location = useLocation();
    const myRoutinesPage = location.pathname.slice('/routines/'.length) === 'my-routines';
    const activitiesPage = location.pathname === '/activities';

    const [toggleEditActivityForm, setToggleEditActivityForm] = useState(false);
    const [toggleEditRoutineActivityForm, setToggleEditRoutineActivityForm] = useState(false);

    function handleToggleEditActivityForm() {
        setToggleEditActivityForm(!toggleEditActivityForm);
    }

    function handleToggleEditRoutineActivityForm() {
        setToggleEditRoutineActivityForm(!toggleEditRoutineActivityForm);
    }


    return (
        <div className='card'>
            <Link to={`/routines/featured/${activityData.id}`}>{activityData.name}</Link>
            <p>{activityData.description}</p>
            {
                activityData.count ? 
                <div>
                    <p>count: {activityData.count}</p>
                    <p>duration: {activityData.duration}</p>
                </div>
                : null
            }
            {
                myRoutinesPage ? <button onClick={handleToggleEditRoutineActivityForm}>Edit Activity</button>  
                : activitiesPage ? <button onClick={handleToggleEditActivityForm}>Edit Activity</button> : null
            }
            {
                toggleEditActivityForm ? <EditActivity activityData={activityData} handleToggleEditActivityForm={handleToggleEditActivityForm} setActivities={props.setActivities} /> : null
            }
            {
                toggleEditRoutineActivityForm ? <EditRoutineActivity activityData={activityData} handleToggleEditRoutineActivityForm={handleToggleEditRoutineActivityForm} setRoutines={props.setRoutines} /> : null
            }
            
        </div>
    )
}

export default ActivityPreview;