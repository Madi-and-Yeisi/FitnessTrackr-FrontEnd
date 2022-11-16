import React, { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";

const EditRoutineActivity = (props) => {
    const [count, setCount] = useState(props.activityData.count);
    const [duration, setDuration] = useState(props.activityData.duration);

    const [errorMessage, setErrorMessage] = useState("");

    const { profileData, setRoutines } = useOutletContext();
    const navigate = useNavigate();


    async function editActivityFormSubmitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                `http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${props.activityData.routineActivityId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        count: count,
                        duration: duration
                    })
                }
            )
            const data = await response.json();
            console.log("EDIT ACTIVITY DATA: ", data);

            if (data.id) {
                props.handleToggleEditRoutineActivityForm();
                await fetchRoutines();
                navigate('/routines/my-routines');
            } else {
                setErrorMessage(data.error);
            }


        } catch(error) {
            console.log(error);
        }
    }


    async function deleteActivity() {
        try {
            const response = await fetch(
                `http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${props.activityData.routineActivityId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            const data = await response.json();
            console.log("DELETE ACTIVITY DATA: ", data);

            if (data.success) {
                await fetchRoutines();
                props.handleToggleEditActivityForm();
                
                navigate('/routines/my-routines');
            } else {
                setErrorMessage(data.error);
            }


        } catch(error) {
            console.log(error);
        }
    }


    async function fetchRoutines() {
        try {
            const updatedMyRoutines = await fetch(
                `http://fitnesstrac-kr.herokuapp.com/api/users/${profileData.username}/routines`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            const updatedMyRoutinesData = await updatedMyRoutines.json();
            console.log("FAST UPDATE my routines data: ", updatedMyRoutinesData);
            props.setRoutines(updatedMyRoutinesData);
        } catch (error) {
            console.log(error);
        }
        try {
            const updatedRoutines = await fetch(
                `http://fitnesstrac-kr.herokuapp.com/api/routines`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            const updatedRoutinesData = await updatedRoutines.json();
            console.log("FAST UPDATE routines data: ", updatedRoutinesData);
            setRoutines(updatedRoutinesData);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <form onSubmit={editActivityFormSubmitHandler} className="activity-form">
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
                    <button onClick={deleteActivity} className="red small-button">Remove Activity</button>
                    <button type="submit" className='green small-button'>Update Activity</button>
                </div>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }
        </div>
    )
};

export default EditRoutineActivity;