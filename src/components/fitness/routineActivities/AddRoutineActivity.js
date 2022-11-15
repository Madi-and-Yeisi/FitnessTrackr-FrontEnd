import React, { useState, useEffect } from 'react';
import { Link, useOutletContext, useNavigate } from "react-router-dom";

const AddRoutineActivity = (props) => {

    // be able to add an activity to a routine via a small form which has a dropdown for all activities,
    // and inputs for count and duration

    console.log("add activity to routine", props);

    const [activites, setActivities] = useState([]);
    const [chosenActivity, setChosenActivity] = useState({});
    const [defaultChosenActivity, setDefaultChosenActivity] = useState({});

    const [count, setCount] = useState("");
    const [duration, setDuration] = useState("");


    const [errorMessage, setErrorMessage] = useState("");

    const { profileData, setRoutines } = useOutletContext();
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchActivities() {
            try {
                const response = await fetch(
                    'http://fitnesstrac-kr.herokuapp.com/api/activities',
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )
                const data = await response.json();
                // console.log("activity data: ", data);
                setActivities(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchActivities();
    }, []);


    async function addActivityFormSubmitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                `http://fitnesstrac-kr.herokuapp.com/api/routines/${props.routineData.id}/activities`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        activityId: chosenActivity.id,
                        count: count,
                        duration: duration
                    })
                }
            )
            const data = await response.json();
            // console.log("ADD ACTIVITY TO ROUTINE DATA: ", data);

            if (data.id) {
                await fetchRoutines();
                props.handleToggleAddActivityForm();
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

    function handleSetChosenActivity(activityName) {
        const activityObj = activites.find(activity => activity.name === activityName);
        console.log("activityObj", activityObj);
        setChosenActivity(activityObj);
    }

    // TODO: fix default select activity

    return (
        <div>
            <h2>Adding Activity to Routine</h2>

            <form onSubmit={addActivityFormSubmitHandler} className="form">
                <label>Choose Activity</label>
                <select value={chosenActivity.name} defaultValue={defaultChosenActivity.name} onChange={(event) => handleSetChosenActivity(event.target.value)}>
                        {
                        activites.map((activity, idx) => {
                            return <option key={idx} value={activity.name}>{activity.name}</option>
                        })
                        }
                </select>



                <label>Count:</label>
                <input type="number" value={count} onChange={(event) => setCount(event.target.value)}></input>

                <br/>

                <label>Duration:</label>
                <input type="number" value={duration} onChange={(event) => setDuration(event.target.value)}></input>

                <br/>

                <button type="submit">ADD ACTIVITY</button>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }

        </div>
    )
};

export default AddRoutineActivity;