import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";

import { activitiesFetch } from '../../../api/activities';
import { addActivityToRoutineFetch, fetchRoutine, fetchRoutines } from '../../../api/routines';

const AddRoutineActivity = (props) => {

    const [activities, setActivities] = useState([]);
    const [chosenActivity, setChosenActivity] = useState({});
    const [defaultChosenActivity, setDefaultChosenActivity] = useState({});

    const [count, setCount] = useState("");
    const [duration, setDuration] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const { profileData, setRoutines } = useOutletContext();
    const navigate = useNavigate();


    useEffect(() => {
        getActivities();
    }, []);


    async function getActivities() {
        const activitiesData = await activitiesFetch();
        activitiesData.success ? setActivities(activitiesData.activities) : console.log(activitiesData.message);
        console.log('activities', activities);
    }


    async function addRoutineActivityFormSubmitHandler(event) {
        event.preventDefault();

        const addRoutineActivityFetchData = await addActivityToRoutineFetch(props.routineData.id, chosenActivity.id, count, duration)

        if (addRoutineActivityFetchData.success) {
            props.handleToggleAddActivityForm();
            
            const updatedRoutineFetchData = await fetchRoutine(props.routineData.id);
            if (updatedRoutineFetchData.success) props.setRoutineData(updatedRoutineFetchData.routine);

            const updatedRoutinesFetchData = await fetchRoutines();
            if (updatedRoutinesFetchData.success) setRoutines(updatedRoutinesFetchData.routines);

            navigate(`/routines/${props.routineData.id}`);
        } else {
            setErrorMessage(data.error);
        }
    }


    function handleSetChosenActivity(activityName) {
        const activityObj = activities.find(activity => activity.name === activityName);
        setChosenActivity(activityObj);
    }


    // TODO: fix default select activity

    return (
        <div>
            <form onSubmit={addRoutineActivityFormSubmitHandler} className="add-activity-form">
                <label>Choose Activity</label>
                <select value={chosenActivity.name} defaultValue={defaultChosenActivity.name} onChange={(event) => handleSetChosenActivity(event.target.value)}>
                        {
                        activities.map((activity, idx) => {
                            return <option key={idx} value={activity.name}>{activity.name}</option>
                        })
                        }
                </select>
                
                <br/>

                <div className='separated-horiz-container'>
                    <div className='vert-flex-container'>
                        <label>Count:</label>
                        <input type="number" value={count} onChange={(event) => setCount(event.target.value)} className="numeric-input"></input>
                    </div>
                    <div className='vert-flex-container'>
                        <label>Duration:</label>
                        <input type="number" value={duration} onChange={(event) => setDuration(event.target.value)} className="numeric-input"></input>
                    </div>
                </div>

                <br/>

                <button type="submit">Add Activity</button>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }
        </div>
    )
};

export default AddRoutineActivity;