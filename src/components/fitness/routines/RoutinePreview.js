import React, { useState } from 'react';
import { Link, useOutletContext } from "react-router-dom";

import { AiFillDownCircle, AiFillUpCircle, AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai';
import { MdPublic, MdOutlinePublicOff, MdAddCircle } from 'react-icons/md';

import EditRoutine from './EditRoutine';
import AddRoutineActivity from '../routineActivities/AddRoutineActivity';
import RoutineActivityPreview from '../routineActivities/RoutineActivityPreview';

const RoutinePreview = (props) => {
    const routineData = props.routine;

    const [ toggleActivitiesDisplay, setToggleActivitiesDisplay ] = useState(false);


    function handleToggleActivitiesDisplay() {
        setToggleActivitiesDisplay(!toggleActivitiesDisplay);
    }


    const sliderLeft = () => {
        const slider = document.getElementById('slider' + routineData.id)
        slider.scrollLeft = slider.scrollLeft - 416
    }

    const sliderRight = () => {
        const slider = document.getElementById('slider' + routineData.id)
        slider.scrollLeft = slider.scrollLeft + 416
    }


    return (
        <div className='routine-card'>
            <header className='routine-card-header'>
                <Link to={"/routines/" + routineData.id} className='routine-title'>
                    {routineData.name}
                    {
                        !routineData.creatorName ? routineData.isPublic ? <MdPublic /> : <MdOutlinePublicOff /> : null
                    }
                </Link>
                {
                    routineData.creatorName ? <Link to={`/routines/${routineData.creatorName}`} className="creator-tag">@{routineData.creatorName}</Link> : null
                }
                
            </header>
            <p><strong>Goal: </strong>{routineData.goal}</p>
            <h4>Activities {`(${routineData.activities.length})`}
                {
                    toggleActivitiesDisplay ? <AiFillUpCircle className='show-activities-icon' onClick={handleToggleActivitiesDisplay} /> : <AiFillDownCircle className='show-activities-icon' onClick={handleToggleActivitiesDisplay} /> 
                }
            </h4>
            {
                toggleActivitiesDisplay ? 
                <div className='activities-container'>
                    <div className='slider-nav' onClick={sliderLeft}><AiFillCaretLeft /></div>

                    <div className='slider' id={'slider' + routineData.id}>
                    {
                        routineData.activities.length ? routineData.activities.map((activity, idx) => {
                            return (
                                <RoutineActivityPreview activity={activity} key={idx} setRoutines={props.setRoutines}/>
                            )
                        }) : <div className='empty activity-card'>No activities to display</div>
                    }
                    </div>

                    <div className='slider-nav' onClick={sliderRight}><AiFillCaretRight /></div>
                </div>
                : null
            }

        </div>
    )
}

export default RoutinePreview;