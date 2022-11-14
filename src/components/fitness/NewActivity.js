import React, { useState } from 'react';
import { Link, useOutletContext, useNavigate } from "react-router-dom";

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
                'http://fitnesstrac-kr.herokuapp.com/api/activities',
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
        <div>
            <h2>Adding New Activity</h2>
            <p>@{profileData.username}</p>

            <form onSubmit={newActivityFormSubmitHandler} className="form">
                <label>Name:</label>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>

                <br/>

                <label>Description:</label>
                <textarea type="text" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>

                <br/>

                <button type="submit">ADD ACTIVITY</button>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }

        </div>
    )
};

export default NewActivity;