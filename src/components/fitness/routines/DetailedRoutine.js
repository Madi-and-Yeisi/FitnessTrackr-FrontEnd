import { useState, useEffect } from 'react';
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
                myRoutine ? !toggleEditRoutineForm ? <button onClick={handleToggleEditRoutineForm} className="edit-routine-button"><AiOutlineEdit />Edit Routine</button> : <button onClick={handleToggleEditRoutineForm} className="edit-routine-button"><AiOutlineUpCircle />Nevermind</button> : null
            }
            {
                toggleEditRoutineForm ? <EditRoutine routineData={routineData} handleToggleEditRoutineForm={handleToggleEditRoutineForm} setRoutineData={setRoutineData} /> : null
            }
            
            {
                routineData ? 
                    <div className='routine-card'>
                        <header>
                            <h2 className='routine-title'>
                                {routineData.name}
                                {
                                    myRoutine ? routineData.isPublic ? <MdPublic /> : <MdOutlinePublicOff /> : null
                                }
                            </h2>
                            <Link to={`/routines/user/${routineData.creatorName}`} className="creator-tag">@{routineData.creatorName}</Link>
                        </header>
                        <p><strong>Goal: </strong>{routineData.goal}</p>
                        <h4 className='routine-activities'>Activities {`(${routineData.activities.length})`} { myRoutine ? <button onClick={handleToggleAddActivityForm} className="add-routine-activity-button">{ !toggleAddActivityForm ? <div className="center-row"><MdAddCircle className="icon" />Add</div> : <div className='center-row'><AiOutlineUpCircle className="icon" />Nevermind</div> }</button> : null } </h4>
                        {
                            toggleAddActivityForm ? <AddRoutineActivity routineData={routineData} handleToggleAddActivityForm={handleToggleAddActivityForm} setRoutineData={setRoutineData} /> : null
                        }
                        {
                            routineData.activities.length ? routineData.activities.map((activity, idx) => {
                                return (
                                    <DetailedRoutineActivity key={idx} activity={activity} setRoutineData={setRoutineData} myRoutine={myRoutine} />
                                )
                            }) : null
                        }
                    </div>

                : <div className="nothing-here">Nothing to display...<div className="spinner"></div></div>
            }
        </div>
    )
}

export default DetailedRoutine;