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
        <div className='page-container'>
            <header>
                <h1>New Routine</h1>
                <div className="me-tag">by @{profileData.username}</div>
            </header>


            <form onSubmit={newRoutineFormSubmitHandler} className="routine-form">
                <label>Name:</label>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>

                <br/>

                <label>Goal:</label>
                <textarea type="text" value={goal} onChange={(event) => setGoal(event.target.value)}></textarea>

                <br/>

                <label>Visible to public?</label>
                <div className='publicity-container'>
                    <div>No</div>
                    <div className='checkbox'>
                        <input type="checkbox" value={isPublic} onChange={(event) => setIsPublic(event.target.checked)} id='edit-routine-publicity' checked={isPublic}></input>
                        <label htmlFor='edit-routine-publicity'></label>
                    </div>
                    <div>Yes</div>
                </div>
                
                <br/>

                <button type="submit">Add Routine</button>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }
        </div>
    )
};

export default NewRoutine;