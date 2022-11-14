import React, { useState } from 'react';
import { Link, useOutletContext, useNavigate, useLocation } from "react-router-dom";

const EditActivity = (props) => {
    const [name, setName] = useState(props.activityData.name);
    const [description, setDescription] = useState(props.activityData.description);

    console.log("soy props", props);

    const [errorMessage, setErrorMessage] = useState("");

    const { profileData, setRoutines } = useOutletContext();
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
                props.handleToggleEditForm();
                // TODO: make it updated when it returns to activites page
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
            const updatedRoutines = await fetch(
                'http://fitnesstrac-kr.herokuapp.com/api/routines',
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            const updatedRoutinesData = await updatedRoutines.json();
            console.log("updated routines data: ", updatedRoutinesData);
            setRoutines(updatedRoutinesData);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <h2>Editing Routine</h2>

            <form onSubmit={editActivityFormSubmitHandler} className="form">
                <label>Name:</label>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>

                <br/>

                <label>Description:</label>
                <textarea type="text" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>

                <br/>

                <button type="submit">UPDATE Activity</button>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }

        </div>
    )
};

export default EditActivity;