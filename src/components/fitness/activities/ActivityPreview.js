import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import EditActivity from './EditActivity';
import { AiOutlineEdit, AiOutlineUpCircle } from 'react-icons/ai';


const ActivityPreview = ({ activity }) => {

    const { loggedIn } = useOutletContext();

    const [toggleEditActivityForm, setToggleEditActivityForm] = useState(false);


    function handleToggleEditActivityForm() {
        setToggleEditActivityForm(!toggleEditActivityForm);
    }


    return (
        <div>
            <div className='activity-preview'>
                {
                    activity.imageUrl ? <img alt={activity.name + " activity image"} src={activity.imageUrl}></img> : null
                }
                <div className='column'>
                    <div className='spread-row'>
                        <Link to={`/routines/featured/${activity.id}`} className="activity-tag">{activity.name}</Link>
                        {
                            loggedIn ? <button onClick={handleToggleEditActivityForm}>{ !toggleEditActivityForm ? <AiOutlineEdit /> : <AiOutlineUpCircle/>}</button> : null
                        }
                    </div>
                    <p>{activity.description}</p>
                </div>    
            </div>
            
            {
                    toggleEditActivityForm ? <EditActivity activityData={activity} handleToggleEditActivityForm={handleToggleEditActivityForm} setActivities={props.setActivities} /> : null
            }

        </div>
    )
}

export default ActivityPreview;