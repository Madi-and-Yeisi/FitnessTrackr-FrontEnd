import React, { useState } from 'react';
import { Link, useOutletContext } from "react-router-dom";

import EditRoutine from './EditRoutine';
import ActivityPreview from '../activities/ActivityPreview';
import AddRoutineActivity from '../routineActivities/AddRoutineActivity';

const RoutinePreview = (props) => {
    const routineData = props.routine;

    const { profileData } = useOutletContext();

    const [toggleEditRoutineForm, setToggleEditRoutineForm] = useState(false);
    const [toggleAddActivityForm, setToggleAddActivityForm] = useState(false);

    let myPost = routineData.creatorName === profileData.username;


    function handleToggleEditRoutineForm() {
        setToggleEditRoutineForm(!toggleEditRoutineForm);
    }


    function handleToggleAddActivityForm() {
        setToggleAddActivityForm(!toggleAddActivityForm);
    }


    return (
        <div className='routine-card'>
            <h2 className='centered routine-title'>{routineData.name}</h2>
            <p><strong>Goal: </strong>{routineData.goal}</p>
            {
                toggleEditRoutineForm ? <EditRoutine routineData={routineData} handleToggleEditRoutineForm={handleToggleEditRoutineForm} setRoutines={props.setRoutines} /> : null
            }
            <h4 className='purple centered'>Activities {`(${routineData.activities.length} total)`}:</h4>
            {
                toggleAddActivityForm ? <AddRoutineActivity routineData={routineData} handleToggleAddActivityForm={handleToggleAddActivityForm} setRoutines={props.setRoutines} /> : null
            }
            <div className='activities-container'>
            {
                routineData.activities.length ? routineData.activities.map((activity, idx) => {
                    return (
                        <ActivityPreview activity={activity} key={idx} setRoutines={props.setRoutines}/>
                    )
                }) : <p className='card'>No activities to display</p>
            }
            </div>
            <div className='separated-horiz-container'>
                {
                    myPost ? <button onClick={handleToggleEditRoutineForm} className="purple small-button">Edit Routine</button> 
                    : <div className='centered creator-tag-container'><p className='black'>created by </p><Link to={`/routines/${routineData.creatorName}`} className="creator-tag">@{routineData.creatorName}</Link></div>
                }
                {
                    myPost ? <button onClick={handleToggleAddActivityForm} className="purple small-button">Add Activity</button> : null
                }
            </div>
        </div>
    )
}

export default RoutinePreview;