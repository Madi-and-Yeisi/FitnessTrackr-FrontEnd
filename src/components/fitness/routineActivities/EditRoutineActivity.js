import React, { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";
import { fetchRoutine, fetchRoutines } from '../../../api/routines';
import { deleteRoutineActivityFetch, editRoutineActivityFetch } from '../../../api/routine_activities';

const EditRoutineActivity = (props) => {
    const [count, setCount] = useState(props.activityData.count);
    const [duration, setDuration] = useState(props.activityData.duration);

    const [errorMessage, setErrorMessage] = useState("");

    const { profileData, setRoutines } = useOutletContext();
    const navigate = useNavigate();

    console.log('props', props)

    async function editRoutineActivityFormSubmitHandler(event) {
        event.preventDefault();

        const editRoutineActivityFetchData = await editRoutineActivityFetch(props.activityData.routineActivityId, count, duration);

        if (editRoutineActivityFetchData.success) {
            props.handleToggleEditRoutineActivityForm();

            const updatedRoutineFetchData = await fetchRoutine(props.activityData.routineId);
            if (updatedRoutineFetchData.success) props.setRoutineData(updatedRoutineFetchData.routine);

            const updatedRoutinesFetchData = await fetchRoutines();
            if (updatedRoutinesFetchData.success) setRoutines(updatedRoutinesFetchData.routines);

            navigate(`/routines/${props.activityData.routineId}`);
        } else {
            setErrorMessage(editRoutineActivityFetchData.message);
        }
    }


    async function deleteRoutineActivity(event) {
        event.preventDefault();

        const deleteRoutineActivityFetchData = await deleteRoutineActivityFetch(props.activityData.routineActivityId)

        if (deleteRoutineActivityFetchData.success) {
            props.handleToggleEditRoutineActivityForm();
            
            const updatedRoutineFetchData = await fetchRoutine(props.activityData.routineId);
            if (updatedRoutineFetchData.success) props.setRoutineData(updatedRoutineFetchData.routine);

            const updatedRoutinesFetchData = await fetchRoutines();
            if (updatedRoutinesFetchData.success) setRoutines(updatedRoutinesFetchData.routines);

            navigate(`/routines/${props.activityData.routineId}`);
        } else {
            setErrorMessage(deleteRoutineActivityFetchData.message);
        }
    }


    return (
        <div>
            <form onSubmit={editRoutineActivityFormSubmitHandler} className="routine-activity-form">
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
                <div className='separated-horiz-container'>
                    <button onClick={deleteRoutineActivity}>Remove Activity</button>
                    <button type="submit">Update</button>
                </div>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }
        </div>
    )
};

export default EditRoutineActivity;