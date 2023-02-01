import React, { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";
import { newRoutineFetch } from '../../../api/routines';

const NewRoutine = () => {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");

    const { profileData } = useOutletContext();
    const navigate = useNavigate();

    async function newRoutineFormSubmitHandler(event) {
        event.preventDefault();

        const newRoutineFetchData = await newRoutineFetch(name, goal, isPublic);

        if (newRoutineFetchData.success) {
            // TODO: update routines immediately

            navigate('/routines/my-routines');
        } else {
            setErrorMessage(newRoutineFetchData.message);
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