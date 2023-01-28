import React, { useState } from 'react';
import { Link, useOutletContext } from "react-router-dom";

import { AiOutlineDownCircle, AiOutlineUpCircle} from 'react-icons/ai';

import EditRoutine from './EditRoutine';
import AddRoutineActivity from '../routineActivities/AddRoutineActivity';
import RoutineActivityPreview from '../routineActivities/RoutineActivityPreview';

const RoutinePreview = (props) => {
    const routineData = props.routine;

    const { profileData } = useOutletContext();

    const [toggleEditRoutineForm, setToggleEditRoutineForm] = useState(false);
    const [toggleAddActivityForm, setToggleAddActivityForm] = useState(false);

    const [ toggleActivitiesDisplay, setToggleActivitiesDisplay ] = useState(false);

    let myPost = routineData.creatorName === profileData.username;


    function handleToggleEditRoutineForm() {
        setToggleEditRoutineForm(!toggleEditRoutineForm);
    }


    function handleToggleAddActivityForm() {
        setToggleAddActivityForm(!toggleAddActivityForm);
    }

    
    function handleToggleActivitiesDisplay() {
        console.log("toggle activities")
        setToggleActivitiesDisplay(!toggleActivitiesDisplay);

    }

    const sliderLeft = () => {
        const slider = document.getElementById('slider' + routineData.id)
        slider.scrollLeft = slider.scrollLeft - 415
    }

    const sliderRight = () => {
        const slider = document.getElementById('slider' + routineData.id)
        slider.scrollLeft = slider.scrollLeft + 415
    }


    return (
        <div className='routine-card'>
            <div className='routine-card-header'>
                <h2 className='routine-title'>{routineData.name}</h2>
                {
                    myPost ? <button onClick={handleToggleEditRoutineForm} className="purple small-button">Edit Routine</button> 
                    : <div className=''><Link to={`/routines/${routineData.creatorName}`} className="creator-tag">@{routineData.creatorName}</Link></div>
                }
            </div>
            <p className='routine-goal'><strong>Goal: </strong>{routineData.goal}</p>
            <div className='horiz-flex-container'>
                <h4 className='routine-activities'>Activities {`(${routineData.activities.length})`}</h4>
                {
                    toggleActivitiesDisplay ? <AiOutlineUpCircle className='show-activities-icon' onClick={handleToggleActivitiesDisplay} /> : <AiOutlineDownCircle className='show-activities-icon' onClick={handleToggleActivitiesDisplay} /> 
                }
            </div>
            {
                toggleEditRoutineForm ? <EditRoutine routineData={routineData} handleToggleEditRoutineForm={handleToggleEditRoutineForm} setRoutines={props.setRoutines} /> : null
            }



            {
                toggleAddActivityForm ? <AddRoutineActivity routineData={routineData} handleToggleAddActivityForm={handleToggleAddActivityForm} setRoutines={props.setRoutines} /> : null
            }

            {
                toggleActivitiesDisplay ? 
                <div className='activities-container'>
                    <div className='slider-nav' onClick={sliderLeft}>{'<'}</div>

                    <div className='slider' id={'slider' + routineData.id}>
                    {
                        routineData.activities.length ? routineData.activities.map((activity, idx) => {
                            return (
                                <RoutineActivityPreview activity={activity} key={idx} setRoutines={props.setRoutines}/>
                            )
                        }) : <div className='empty activity-card'>No activities to display</div>
                    }
                    </div>

                    <div className='slider-nav' onClick={sliderRight}>{'>'}</div>
                </div>
                : null
            }


            <div className='separated-horiz-container'>

                {
                    myPost ? <button onClick={handleToggleAddActivityForm} className="purple small-button">Add Activity</button> : null
                }
            </div>
        </div>
    )
}

export default RoutinePreview;