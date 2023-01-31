import React, { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";
import { newActivityFetch, activitiesFetch } from '../../../api/activities';

const NewActivity = () => {

    const { profileData } = useOutletContext();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [errorMessage, setErrorMessage] = useState("");


    async function newActivityFormSubmitHandler(event) {
        event.preventDefault();

        const newActivityFetchData = await newActivityFetch(name, description, imageUrl);
        if (newActivityFetchData.success) {
            const updatedActivitiesData = await activitiesFetch();
            // setActivities(updatedActivitiesData.activities);
            navigate('/activities');
        } else {
            setErrorMessage(newActivityFetchData.message);
        }
    }


    return (
        <div className='vert-flex-container'>
            <h2>Adding New Activity</h2>
            <p>@{profileData.username}</p>

            <form onSubmit={newActivityFormSubmitHandler} className="new-form">
                <label>Name:</label>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>

                <br/>

                <label>Description:</label>
                <textarea type="text" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>

                <br/>

                <button type="submit" className='green button'>Add Activity</button>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }

        </div>
    )
};

export default NewActivity;