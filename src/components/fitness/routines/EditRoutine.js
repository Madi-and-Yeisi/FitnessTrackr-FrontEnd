import { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";

import { BsTrash } from 'react-icons/bs';

import { deleteRoutineFetch, editRoutineFetch, fetchRoutine, fetchRoutines } from '../../../api/routines';


const EditRoutine = (props) => {
    const [name, setName] = useState(props.routineData.name);
    const [goal, setGoal] = useState(props.routineData.goal);
    const [isPublic, setIsPublic] = useState(props.routineData.isPublic);

    const [errorMessage, setErrorMessage] = useState("");


    const { setRoutines } = useOutletContext();
    const navigate = useNavigate();

    async function editRoutineFormSubmitHandler(event) {
        event.preventDefault();

        const editRoutineFetchData = await editRoutineFetch(props.routineData.id, name, goal, isPublic);

        if (editRoutineFetchData.success) {
            props.handleToggleEditRoutineForm();

            const updatedRoutineFetchData = await fetchRoutine(props.routineData.id);
            if (updatedRoutineFetchData.success) props.setRoutineData(updatedRoutineFetchData.routine);

            const updatedRoutines = await fetchRoutines();
            setRoutines(updatedRoutines.routines);

            navigate(`/routines/${props.routineData.id}`);
        } else {
            setErrorMessage(editRoutineFetchData.message);
        }
    }


    async function deleteRoutineHandler(event) {
        event.preventDefault();

        const deleteRoutineFetchData = await deleteRoutineFetch(props.routineData.id);

        if (deleteRoutineFetchData.success) {
            props.handleToggleEditRoutineForm();

            const updatedRoutineFetchData = await fetchRoutine(props.routineData.id);
            if (updatedRoutineFetchData.success) props.setRoutineData(updatedRoutineFetchData.routine);

            const updatedRoutines = await fetchRoutines();
            setRoutines(updatedRoutines.routines);

            navigate(`/routines/my-routines`);
        } else {
            setErrorMessage(deleteRoutineFetchData.message);
        }
    }


    // TODO: FIX ISPUBLIC CHECKBOX


    return (
        <div>
            <form onSubmit={editRoutineFormSubmitHandler} className="routine-form">
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

                <div className='spread-row'>
                    <button onClick={deleteRoutineHandler} className='center-row'><BsTrash />Delete Routine</button>
                    <button type="submit">Update</button>
                </div>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }

        </div>
    )
};

export default EditRoutine;