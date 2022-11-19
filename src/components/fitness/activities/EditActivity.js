import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const EditActivity = (props) => {
    const [name, setName] = useState(props.activityData.name);
    const [description, setDescription] = useState(props.activityData.description);

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();


    async function editActivityFormSubmitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                `http://fitnesstrac-kr.herokuapp.com/api/activities/${props.activityData.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        name: name,
                        description: description
                    })
                }
            )
            const data = await response.json();
            console.log("EDIT ACTIVITY DATA: ", data);

            if (data.id) {
                props.handleToggleEditActivityForm();
                // TODO: make it updated when it returns to activites page
                await fetchActivities();
                navigate('/activities');
            } else {
                setErrorMessage(data.error);
            }


        } catch(error) {
            console.log(error);
        }
    }

    async function fetchActivities() {
        try {
            const updatedActivities = await fetch(
                'http://fitnesstrac-kr.herokuapp.com/api/activities',
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            const updatedActivitiesData = await updatedActivities.json();
            console.log("FAST UPDATE activities data: ", updatedActivitiesData);
            props.setActivities(updatedActivitiesData);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <form onSubmit={editActivityFormSubmitHandler} className="activity-form">
                <label>Name:</label>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>

                <br/>

                <label>Description:</label>
                <textarea type="text" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>

                <br/>

                <button type="submit" className='green small-button'>Update Activity</button>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }
        </div>
    )
};

export default EditActivity;