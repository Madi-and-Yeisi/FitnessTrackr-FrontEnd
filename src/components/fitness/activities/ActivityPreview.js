import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import EditActivity from './EditActivity';
import { AiOutlineEdit } from 'react-icons/ai';


const ActivityPreview = (props) => {
    const activityData = props.activity;
    // console.log(activityData)

    const tempImageData = ["https://blog.nasm.org/hubfs/power-pushups.jpg", "https://fitnessvolt.com/wp-content/uploads/2019/04/push-up.jpg", "https://www.silversneakers.com/wp-content/uploads/2019/08/SSBlog.Exercise_ModifiedPushUp.jpg", "https://www.rei.com/dam/van_dragt_092217_1030_kayaking_basics_lg.jpg", "https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/2fe5431f-8c51-4bf2-8093-0000bd673609/5-benefits-of-playing-basketball-according-to-experts.jpg", "", "", "https://post.healthline.com/wp-content/uploads/2020/08/1763-female_swim_exercise_732x549-thumb-732x549.jpg", "https://hips.hearstapps.com/hmg-prod/images/imagelibrary-115078-20190602-1620064971.jpg?crop=1.00xw:0.751xh;0,0.0878xh&resize=1200:*", "https://images.unsplash.com/photo-1629185752152-fe65698ddee4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhpa2luZ3xlbnwwfHwwfHw%3D&w=1000&q=80" ]
    const randomImage = tempImageData[Math.floor(Math.random() * tempImageData.length)];

    const [toggleEditActivityForm, setToggleEditActivityForm] = useState(false);

    function handleToggleEditActivityForm() {
        setToggleEditActivityForm(!toggleEditActivityForm);
    }


    return (
        <div>
            <div className='activity-page-card'>
                {
                    activityData.imageUrl ? <img className='activity-card-image' alt={activityData.name + " activity image"} src={activityData.imageUrl}></img> : null
                }
                <div className='activity-card-info-container'>
                    <Link to={`/routines/featured/${activityData.id}`} className="activity-tag">{activityData.name}</Link>
                    <div className='activity-card-description'>{activityData.description}</div>
                    <button onClick={handleToggleEditActivityForm} className="edit-activity"><AiOutlineEdit />Edit</button>
                </div>    
            </div>
            
            {
                    toggleEditActivityForm ? <EditActivity activityData={activityData} handleToggleEditActivityForm={handleToggleEditActivityForm} setActivities={props.setActivities} /> : null
            }

        </div>
    )
}

export default ActivityPreview;