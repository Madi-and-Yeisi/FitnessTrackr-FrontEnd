import React, { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";

const NewRoutine = () => {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");

    const { profileData } = useOutletContext();
    const navigate = useNavigate();

    async function newRoutineFormSubmitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                'https://fitnesstrac-kr.herokuapp.com/api/routines',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        name: name,
                        goal: goal,
                        isPublic: isPublic
                    })
                }
            )
            const data = await response.json();
            // console.log("NEW ROUTINE DATA: ", data);

            if (data.id) {
                navigate('/routines/my-routines');
            } else {
                // TODO: translate error to something user friendly
                setErrorMessage(data.error);
            }
        } catch(error) {
            console.log(error);
        }
    }


    return (
        <div className='vert-flex-container'>
            <h2>New Routine</h2>
            <p>by @{profileData.username}</p>

            <form onSubmit={newRoutineFormSubmitHandler} className="form">
                <label>Name:</label>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>

                <br/>

                <label>Goal:</label>
                <textarea type="text" value={goal} onChange={(event) => setGoal(event.target.value)}></textarea>

                <br/>

                <label>Public Routine? {"("}Check for yes{")"}</label>
                <input type="checkbox" value={isPublic} onChange={(event) => setIsPublic(event.target.checked)} defaultChecked ></input>

                <br/>

                <button type="submit" className='green button'>Add Routine</button>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }
        </div>
    )
};

export default NewRoutine;