import React, { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";

const EditRoutine = (props) => {
    const [name, setName] = useState(props.routineData.name);
    const [goal, setGoal] = useState(props.routineData.goal);

    const [errorMessage, setErrorMessage] = useState("");

    const { profileData, setRoutines } = useOutletContext();
    const navigate = useNavigate();

    async function editRoutineFormSubmitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                `http://fitnesstrac-kr.herokuapp.com/api/routines/${props.routineData.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        name: name,
                        goal: goal
                    })
                }
            )
            const data = await response.json();
            console.log("EDIT ROUTINE DATA: ", data);

            if (data.id) {
                await fetchRoutines();
                props.handleToggleEditRoutineForm();
                
                navigate('/routines/my-routines');
            } else {
                setErrorMessage(data.error);
            }

        } catch(error) {
            console.log(error);
        }
    }


    async function deleteRoutine() {
        try {
            const response = await fetch(
                `http://fitnesstrac-kr.herokuapp.com/api/routines/${props.routineData.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            const data = await response.json();
            console.log("DELETE ROUTINE DATA: ", data);

            if (data.success) {
                await fetchRoutines();
                props.handleToggleEditForm();
                
                navigate('/routines/my-routines');
            } else {
                setErrorMessage(data.error);
            }

        } catch(error) {
            console.log(error);
        }
    }


    async function fetchRoutines() {
        try {
            const updatedMyRoutines = await fetch(
                `http://fitnesstrac-kr.herokuapp.com/api/users/${profileData.username}/routines`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            const updatedMyRoutinesData = await updatedMyRoutines.json();
            console.log("FAST UPDATE my routines data: ", updatedMyRoutinesData);
            props.setRoutines(updatedMyRoutinesData);
        } catch (error) {
            console.log(error);
        }
        try {
            const updatedRoutines = await fetch(
                `http://fitnesstrac-kr.herokuapp.com/api/routines`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            const updatedRoutinesData = await updatedRoutines.json();
            console.log("FAST UPDATE routines data: ", updatedRoutinesData);
            setRoutines(updatedRoutinesData);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <h2>Editing Routine</h2>

            <form onSubmit={editRoutineFormSubmitHandler} className="form">
                <label>Name:</label>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)}></input>

                <br/>

                <label>Goal:</label>
                <textarea type="text" value={goal} onChange={(event) => setGoal(event.target.value)}></textarea>

                <br/>

                {/* <label>Public Routine? {"("}Check for yes{")"}</label>
                <input type="checkbox" value={isPublic} onChange={(event) => setIsPublic(event.target.checked)} ></input>

                <br/> */}

                <button onClick={deleteRoutine}>DELETE ROUTINE</button>
                <button type="submit">UPDATE ROUTINE</button>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }

        </div>
    )
};

export default EditRoutine;