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

    function activityCardClass() {
        if (activitiesPage) return "activity-page-card";
        else return "activity-card"
    }


    return (
        <div className={ activityCardClass() }>
            <Link to={`/routines/featured/${activityData.id}`} className="activity-tag">{activityData.name}</Link>
            <p>{activityData.description}</p>
            {
                activityData.count ? 
                <div className='separated-horiz-container'>
                    <div><strong>Count: </strong>{activityData.count}</div>
                    <div><strong>Duration: </strong>{activityData.duration}</div>
                </div>
                : null
            }
            {
                myRoutinesPage ? <button onClick={handleToggleEditRoutineActivityForm}  className="purple small-button">Edit Activity</button>  
                : activitiesPage ? <button onClick={handleToggleEditActivityForm}  className="purple small-button">Edit Activity</button> : null
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