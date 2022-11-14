import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import EditActivity from './EditActivity';

const ActivityPreview = (props) => {

    const { loggedIn } = useOutletContext();
    const activityData = props.activity;

    const [toggleEditForm, setToggleEditForm] = useState(false);


    function handleToggleEditForm() {
        setToggleEditForm(!toggleEditForm);
    }

    return (
        <div className='card'>
            <Link to={`/routines/featured/${activityData.id}`}>{activityData.name}</Link>
            <p>{activityData.description}</p>
            {
                loggedIn ? <button onClick={handleToggleEditForm}>Edit Activity</button>  : null
            }
            {
                toggleEditForm ? <EditActivity activityData={activityData} handleToggleEditForm={handleToggleEditForm} /> : null
            }
            
        </div>
    )
}

export default ActivityPreview;