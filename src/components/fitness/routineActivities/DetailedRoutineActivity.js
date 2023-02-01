import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AiOutlineUpCircle } from 'react-icons/ai';

// import EditActivity from './EditActivity';
import EditRoutineActivity from './EditRoutineActivity';

const DetailedRoutineActivity = (props) => {
    const activityData = props.activity;
    console.log(activityData)

    const [toggleEditActivityForm, setToggleEditActivityForm] = useState(false);
    const [toggleEditRoutineActivityForm, setToggleEditRoutineActivityForm] = useState(false);


    function handleToggleEditActivityForm() {
        setToggleEditActivityForm(!toggleEditActivityForm);
    }


    function handleToggleEditRoutineActivityForm() {
        setToggleEditRoutineActivityForm(!toggleEditRoutineActivityForm);
    }


    return (
        <div className='detailed-activity-card'>
            <div className='activity-card-contents'>
                <div className='separated-vert-container'>
                {
                    activityData.imageUrl ? <img className='activity-card-image' src={activityData.imageUrl}></img> : null
                }
                    <button onClick={handleToggleEditRoutineActivityForm} className='edit-routine-activity-button'>{ !toggleEditRoutineActivityForm ? 'Update' : <div className='horiz-flex-container'><AiOutlineUpCircle className='edit-routine-activity-icon' />Nevermind</div>}</button>
                </div>

                <div className='activity-card-info-container'>
                    <Link to={`/routines/featured/${activityData.id}`} className="activity-tag">{activityData.name}</Link>
                    <div className='activity-card-description scroll-box'>{activityData.description}</div>
                    {
                        activityData.count ? 
                            <div className='activity-card-stats-container'>
                                <div className='activity-card-stats'><strong>Count: </strong><div className='activity-stat'>{activityData.count}</div></div>
                                <div className='activity-card-stats'><strong>Duration: </strong><div className='activity-stat'>{activityData.duration}</div></div>
                            </div>
                        : null
                    }
                    {/* {
                        myRoutinesPage ? 
                        : activitiesPage ? <button onClick={handleToggleEditActivityForm}  className="yellow small-button">Edit Activity</button> : null
                    } */}
                </div>    
            </div>
            {
                toggleEditRoutineActivityForm ? <EditRoutineActivity activityData={activityData} handleToggleEditRoutineActivityForm={handleToggleEditRoutineActivityForm} setRoutines={props.setRoutines} /> : null
            }
        </div>

        // {
        //         toggleEditActivityForm ? <EditActivity activityData={activityData} handleToggleEditActivityForm={handleToggleEditActivityForm} setActivities={props.setActivities} /> : null
        // }


    )
}

export default DetailedRoutineActivity;