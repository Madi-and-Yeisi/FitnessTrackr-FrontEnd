import React, { useState } from 'react';
import { Link, useOutletContext, useNavigate, useLocation } from "react-router-dom";

const EditRoutineActivity = (props) => {
    const [count, setCount] = useState(props.activityData.count);
    const [duration, setDuration] = useState(props.activityData.duration);

    const [activities, setActivities] = useState([]);

    console.log("edit activity props", props);

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
            <h2>Editing Activity</h2>

            <form onSubmit={editActivityFormSubmitHandler} className="form">
                <label>Count:</label>
                <input type="number" value={count} onChange={(event) => setCount(event.target.value)}></input>

                <br/>

                <label>Duration:</label>
                <input type="number" value={duration} onChange={(event) => setDuration(event.target.value)}></input>

                <br/>

                <button onClick={deleteActivity}>REMOVE ACTIVITY</button>
                <button type="submit">UPDATE Activity</button>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }

        </div>
    )
};

export default EditRoutineActivity;