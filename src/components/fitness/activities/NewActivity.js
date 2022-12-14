import React, { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";

const NewActivity = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const { profileData } = useOutletContext();
    const navigate = useNavigate();


    async function newActivityFormSubmitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                'https://fitnesstrac-kr.herokuapp.com/api/activities',
                {
                    method: "POST",
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
            // console.log("NEW ACTIVITY DATA: ", data);

            if (data.id) {
                navigate('/activities');
            } else {
                setErrorMessage(data.error);
            }

        } catch(error) {
            console.log(error);
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