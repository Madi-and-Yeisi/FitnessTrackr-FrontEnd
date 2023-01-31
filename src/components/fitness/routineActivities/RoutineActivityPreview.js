import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// import EditActivity from './EditActivity';
// import EditRoutineActivity from './EditRoutineActivity';

const RoutineActivityPreview = (props) => {
    const activityData = props.activity;
    console.log(activityData)

    const tempImageData = ["https://blog.nasm.org/hubfs/power-pushups.jpg", "https://fitnessvolt.com/wp-content/uploads/2019/04/push-up.jpg", "https://www.silversneakers.com/wp-content/uploads/2019/08/SSBlog.Exercise_ModifiedPushUp.jpg", "https://www.rei.com/dam/van_dragt_092217_1030_kayaking_basics_lg.jpg", "https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/2fe5431f-8c51-4bf2-8093-0000bd673609/5-benefits-of-playing-basketball-according-to-experts.jpg", "", "", "https://post.healthline.com/wp-content/uploads/2020/08/1763-female_swim_exercise_732x549-thumb-732x549.jpg", "https://hips.hearstapps.com/hmg-prod/images/imagelibrary-115078-20190602-1620064971.jpg?crop=1.00xw:0.751xh;0,0.0878xh&resize=1200:*", "https://images.unsplash.com/photo-1629185752152-fe65698ddee4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhpa2luZ3xlbnwwfHwwfHw%3D&w=1000&q=80" ]
    const randomImage = tempImageData[Math.floor(Math.random() * tempImageData.length)];


    const location = useLocation();
    const myRoutinesPage = location.pathname.slice('/routines/'.length) === 'my-routines';
    const activitiesPage = location.pathname === '/activities';

    const [toggleEditActivityForm, setToggleEditActivityForm] = useState(false);
    const [toggleEditRoutineActivityForm, setToggleEditRoutineActivityForm] = useState(false);

    function handleToggleEditActivityForm() {
        setToggleEditActivityForm(!toggleEditActivityForm);
    }

    function handleToggleEditRoutineActivityForm() {
        setToggleEditRoutineActivityForm(!toggleEditRoutineActivityForm);
    }


    return (
        <div className='activity-card'>
            <div className='activity-card-contents'>
                {
                    activityData.imageUrl ? <img className='activity-card-image' src={activityData.imageUrl}></img> : null
                }
                <div className='activity-card-info-container'>
                    <Link to={`/routines/featured/${activityData.id}`} className="activity-tag">{activityData.name}</Link>
                    <div className='activity-card-description scroll-box'>{activityData.description}</div>
                    {
                        activityData.count ? 
                            <div className='activity-card-stats-container'>
                                <div className='activity-card-stats'><strong>Count: </strong><div className='activity-stat'>{activityData.count}</div></div>
                                <div className='activity-card-stats'><strong>Duration: </strong><div className='activity-stat'>{activityData.duration}</div></div>
                            </div>
                        : null
                    }
                    {
                        myRoutinesPage ? <button onClick={handleToggleEditRoutineActivityForm}  className="purple small-button">Edit Activity</button>  
                        : activitiesPage ? <button onClick={handleToggleEditActivityForm}  className="yellow small-button">Edit Activity</button> : null
                    }
                </div>    
            </div>
        </div>

        // {
        //         toggleEditActivityForm ? <EditActivity activityData={activityData} handleToggleEditActivityForm={handleToggleEditActivityForm} setActivities={props.setActivities} /> : null
        // }
        // {
        //     toggleEditRoutineActivityForm ? <EditRoutineActivity activityData={activityData} handleToggleEditRoutineActivityForm={handleToggleEditRoutineActivityForm} setRoutines={props.setRoutines} /> : null
        // }

    )
}

export default RoutineActivityPreview;