import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { AiFillDownCircle, AiFillUpCircle, AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai';
import { MdPublic, MdOutlinePublicOff } from 'react-icons/md';

import RoutineActivityPreview from '../routineActivities/RoutineActivityPreview';

const RoutinePreview = ({ routine, setRoutines }) => {

    const [ toggleActivitiesDisplay, setToggleActivitiesDisplay ] = useState(false);


    function handleToggleActivitiesDisplay() {
        setToggleActivitiesDisplay(!toggleActivitiesDisplay);
    }


    const sliderLeft = () => {
        const slider = document.getElementById('slider' + routine.id)
        slider.scrollLeft = slider.scrollLeft - 416
    }

    const sliderRight = () => {
        const slider = document.getElementById('slider' + routine.id)
        slider.scrollLeft = slider.scrollLeft + 416
    }


    return (
        <div className='routine-card'>
            <header className='routine-card-header'>
                <Link to={"/routines/" + routine.id} className='routine-title'>
                    {routine.name}
                    {
                        !routine.creatorName ? routine.isPublic ? <MdPublic /> : <MdOutlinePublicOff /> : null
                    }
                </Link>
                {
                    routine.creatorName ? <Link to={`/routines/user/${routine.creatorName}`} className="creator-tag">@{routine.creatorName}</Link> : null
                }
                
            </header>
            <p><strong>Goal: </strong>{routine.goal}</p>
            <h4>Activities {`(${routine.activities.length})`}
                {
                    toggleActivitiesDisplay ? <AiFillUpCircle className='show-activities-icon' onClick={handleToggleActivitiesDisplay} /> : <AiFillDownCircle className='show-activities-icon' onClick={handleToggleActivitiesDisplay} /> 
                }
            </h4>
            {
                toggleActivitiesDisplay ? 
                <div className='activities-container'>
                    <div className='slider-nav' onClick={sliderLeft}><AiFillCaretLeft /></div>

                    <div className='slider' id={'slider' + routine.id}>
                    {
                        routine.activities.length ? routine.activities.map((activity, idx) => {
                            return (
                                <RoutineActivityPreview activity={activity} key={idx} setRoutines={setRoutines}/>
                            )
                        }) : <div className='empty routine-activity-container'>No activities to display</div>
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