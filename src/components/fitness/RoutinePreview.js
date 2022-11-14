import React, { useState } from 'react';
import { Link, useOutletContext } from "react-router-dom";
import EditRoutine from './EditRoutine';
import AddActivity from './AddActivity';

const RoutinePreview = (props) => {
    const { profileData, setRoutines } = useOutletContext();

    const [toggleEditForm, setToggleEditForm] = useState(false);
    const [toggleAddActivityForm, setToggleAddActivityForm] = useState(false);
    // console.log("THIS THE PROPS", props)

    const routineData = props.routine;


    let myPost = routineData.creatorName === profileData.username;
    // console.log("myPost? ", myPost)

    function handleToggleEditForm() {
        setToggleEditForm(!toggleEditForm);
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
                        <div key={idx} className='card'>
                            <h4>{activity.name}</h4>
                            <p>{activity.description}</p>
                            <p>duration: {activity.duration}</p>
                            <p>count: {activity.count}</p>
                        </div>
                    )
                }) : <p className='card'>No activities to display</p>
            }
            {
                myPost ? <button onClick={handleToggleEditForm}>Edit Routine</button> 
                : <p>created by <Link to={`/routines/${routineData.creatorName}`}>@{routineData.creatorName}</Link></p>
            }
            {
                toggleEditForm ? <EditRoutine routineData={routineData} handleToggleEditForm={handleToggleEditForm} /> : null
            }
            {
                myPost ? <button onClick={handleToggleAddActivityForm}>Add Activity</button> : null
            }
            {
                toggleAddActivityForm ? <AddActivity routineData={routineData} handleToggleAddActivityForm={handleToggleAddActivityForm} /> : null
            }
            
        </div>
    )
}

export default RoutinePreview;