import React, { useState, useEffect } from 'react';
import { Link, useOutletContext, useNavigate } from "react-router-dom";

const AddActivity = (props) => {

    // be able to add an activity to a routine via a small form which has a dropdown for all activities,
    // and inputs for count and duration

    console.log("props", props);

    const [activites, setActivities] = useState([]);

    const [count, setCount] = useState("");
    const [duration, setDuration] = useState("");


    const [errorMessage, setErrorMessage] = useState("");

    const { profileData } = useOutletContext();
    const navigate = useNavigate();

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
                        activityId: 57,
                        count: count,
                        duration: duration
                    })
                }
            )
            const data = await response.json();
            // console.log("ADD ACTIVITY TO ROUTINE DATA: ", data);

            if (data.id) {
                props.handleToggleAddActivityForm();
                navigate('/routines/my-routines');
            } else {
                setErrorMessage(data.error);
            }


        } catch(error) {
            console.log(error);
        }
    }

    
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


    return (
        <div>
            <h2>Adding Activity to Routine</h2>

            <form onSubmit={addActivityFormSubmitHandler} className="form">
                <label>Choose Activity</label>
                <p>how do i do a drop down</p>


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

export default AddActivity;