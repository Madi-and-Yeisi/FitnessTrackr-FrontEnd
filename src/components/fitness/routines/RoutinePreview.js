import React, { useState } from 'react';
import { Link, useOutletContext } from "react-router-dom";
import EditRoutine from './EditRoutine';
import ActivityPreview from '../activities/ActivityPreview';
import AddRoutineActivity from '../routineActivities/AddRoutineActivity';

const RoutinePreview = (props) => {
    const { profileData, setRoutines } = useOutletContext();

    const [toggleEditRoutineForm, setToggleEditRoutineForm] = useState(false);
    // const [toggleEditActivityForm, setToggleEditActivityForm] = useState(false);
    const [toggleAddActivityForm, setToggleAddActivityForm] = useState(false);
    // console.log("THIS THE PROPS", props)

    const routineData = props.routine;


    let myPost = routineData.creatorName === profileData.username;
    // console.log("myPost? ", myPost)

    function handleToggleEditRoutineForm() {
        setToggleEditRoutineForm(!toggleEditRoutineForm);
    }

    function handleToggleAddActivityForm() {
        setToggleAddActivityForm(!toggleAddActivityForm);
    }

    return (
        <div className='card'>
            <h2>{routineData.name}</h2>
            <p>{routineData.goal}</p>
            <h4>Activities:</h4>
            {
                routineData.activities.length ? routineData.activities.map((activity, idx) => {
                    return (
                        <ActivityPreview activity={activity} key={idx} setRoutines={props.setRoutines}/>
                    )
                }) : <p className='card'>No activities to display</p>
            }
            {
                myPost ? <button onClick={handleToggleEditRoutineForm}>Edit Routine</button> 
                : <p>created by <Link to={`/routines/${routineData.creatorName}`}>@{routineData.creatorName}</Link></p>
            }
            {
                toggleEditRoutineForm ? <EditRoutine routineData={routineData} handleToggleEditRoutineForm={handleToggleEditRoutineForm} setRoutines={props.setRoutines} /> : null
            }
            {
                myPost ? <button onClick={handleToggleAddActivityForm}>Add Activity</button> : null
            }
            {
                toggleAddActivityForm ? <AddRoutineActivity routineData={routineData} handleToggleAddActivityForm={handleToggleAddActivityForm} setRoutines={props.setRoutines} /> : null
            }
            
        </div>
    )
}

export default RoutinePreview;