import React, { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";

import { deleteRoutineFetch, editRoutineFetch, fetchRoutines } from '../../../api/routines';
import { userRoutinesFetch } from '../../../api/users';

const EditRoutine = (props) => {
    const [name, setName] = useState(props.routineData.name);
    const [goal, setGoal] = useState(props.routineData.goal);
    const [isPublic, setIsPublic] = useState(props.routineData.isPublic);

    const [errorMessage, setErrorMessage] = useState("");

    const { profileData, setRoutines } = useOutletContext();
    const navigate = useNavigate();

    async function editRoutineFormSubmitHandler(event) {
        event.preventDefault();

        const editRoutineFetchData = await editRoutineFetch(props.routineData.id, name, goal, isPublic);

        if (editRoutineFetchData.success) {
            props.handleToggleEditRoutineForm();
            const myUpdatedRoutines = await userRoutinesFetch(profileData.username);    
            props.setRoutines(myUpdatedRoutines.routines);
            const updatedRoutines = await fetchRoutines();
            setRoutines(updatedRoutines.routines);
            navigate('/routines/my-routines');
        } else {
            setErrorMessage(editRoutineFetchData.message);
        }
    }


    async function deleteRoutineHandler(event) {
        event.preventDefault();

        const deleteRoutineFetchData = await deleteRoutineFetch(props.routineData.id);

        if (deleteRoutineFetchData.success) {
            props.handleToggleEditForm();
            const myUpdatedRoutines = await userRoutinesFetch(profileData.username);
            props.setRoutines(myUpdatedRoutines.routines);
            const updatedRoutines = await fetchRoutines();
            setRoutines(updatedRoutines.routines);
            navigate('/routines/my-routines');
        } else {
            setErrorMessage(deleteRoutineFetchData.message);
        }
    }


    // async function fetchMyRoutines() {
    //     try {
    //         const updatedMyRoutines = await fetch(
    //             `https://fitnesstrac-kr.herokuapp.com/api/users/${profileData.username}/routines`,
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //             }
    //         )
    //         const updatedMyRoutinesData = await updatedMyRoutines.json();
    //         console.log("FAST UPDATE my routines data: ", updatedMyRoutinesData);
    //         props.setRoutines(updatedMyRoutinesData);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    return (
        <div>
            <form onSubmit={editRoutineFormSubmitHandler} className="routine-form">
                <label>Name:</label>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>

                <br/>

                <label>Goal:</label>
                <textarea type="text" value={goal} onChange={(event) => setGoal(event.target.value)}></textarea>

                <br/>

                {/* <label>Public Routine? {"("}Check for yes{")"}</label>
                <input type="checkbox" value={isPublic} onChange={(event) => setIsPublic(event.target.checked)} ></input>

                <br/> */}

                <button onClick={deleteRoutineHandler} className='red small-button'>Delete Routine</button>
                <button type="submit" className='green small-button'>Update Routine</button>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }

        </div>
    )
};

export default EditRoutine;