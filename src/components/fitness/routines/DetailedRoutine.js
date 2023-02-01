import React, { useState, useEffect } from 'react';
import { useOutletContext, useLocation, Link } from "react-router-dom";

import { AiOutlineEdit, AiOutlineUpCircle } from 'react-icons/ai';
import { MdPublic, MdOutlinePublicOff, MdAddCircle } from 'react-icons/md';

import EditRoutine from './EditRoutine';
import AddRoutineActivity from '../routineActivities/AddRoutineActivity';
import DetailedRoutineActivity from '../routineActivities/DetailedRoutineActivity';

import { fetchRoutine } from '../../../api/routines';


const DetailedRoutine = () => {

    const { profileData } = useOutletContext();

    const location = useLocation();
    const routineId = location.pathname.slice('/routines/'.length);

    const [ routineData, setRoutineData ] = useState();
    const [ myRoutine, setMyRoutine ] = useState(false);

    const [toggleEditRoutineForm, setToggleEditRoutineForm] = useState(false);
    const [toggleAddActivityForm, setToggleAddActivityForm] = useState(false);


    useEffect(() => {
        getRoutine();
    }, []);


    async function getRoutine() {
        const routineFetchData = await fetchRoutine(routineId);
        routineFetchData.success ? setRoutineData(routineFetchData.routine) : console.log(routineFetchData.message);
        if ( profileData.id == routineFetchData.routine.creatorId ) setMyRoutine(true);
    }


    function handleToggleEditRoutineForm() {
        setToggleEditRoutineForm(!toggleEditRoutineForm);
    }


    function handleToggleAddActivityForm() {
        setToggleAddActivityForm(!toggleAddActivityForm);
    }


    return (
        <div className='page-container'>
            {
                myRoutine ? !toggleEditRoutineForm ? <button onClick={handleToggleEditRoutineForm} className="edit-routine-button"><AiOutlineEdit />Edit Your Routine</button> : <button onClick={handleToggleEditRoutineForm} className="edit-routine-button"><AiOutlineUpCircle />Nevermind</button> : null
            }
            {
                toggleEditRoutineForm ? <EditRoutine routineData={routineData} handleToggleEditRoutineForm={handleToggleEditRoutineForm} setRoutineData={setRoutineData} /> : null
            }
            
            {
                routineData ? 
                    <div className='routine-card'>
                        <div className='routine-card-header'>
                            <h2 className='routine-title'>
                                {routineData.name}
                                {
                                    myRoutine ? routineData.isPublic ? <MdPublic /> : <MdOutlinePublicOff /> : null
                                }
                            </h2>
                            <Link to={`/routines/${routineData.creatorName}`} className="creator-tag">@{routineData.creatorName}</Link>
                        </div>
                        <p className='routine-goal'><strong>Goal: </strong>{routineData.goal}</p>
                        <div className='vert-flex-container'>
                            <h4 className='routine-activities'>Activities {`(${routineData.activities.length})`}<button onClick={handleToggleAddActivityForm} className="add-routine-activity-button"><MdAddCircle className="icon" />Add</button></h4>
                            {
                                toggleAddActivityForm ? <AddRoutineActivity routineData={routineData} handleToggleAddActivityForm={handleToggleAddActivityForm} setRoutineData={setRoutineData} /> : null
                            }
                        {
                            routineData.activities.length ? routineData.activities.map((activity, idx) => {
                                return (
                                    <DetailedRoutineActivity activity={activity} key={idx} setRoutineData={setRoutineData}/>
                                )
                            }) : <div className='empty activity-card'>No activities to display</div>
                        }
                        </div>            
                    </div>

                : <p>no routine data</p>
            }
        </div>
    )
}

export default DetailedRoutine;