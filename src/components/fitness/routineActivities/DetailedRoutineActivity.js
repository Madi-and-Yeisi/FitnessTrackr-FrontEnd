import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AiOutlineUpCircle, AiOutlineEdit } from 'react-icons/ai';

import EditRoutineActivity from './EditRoutineActivity';

const DetailedRoutineActivity = ({ activity, setRoutineData, myRoutine}) => {

    const [toggleEditRoutineActivityForm, setToggleEditRoutineActivityForm] = useState(false);


    function handleToggleEditRoutineActivityForm() {
        setToggleEditRoutineActivityForm(!toggleEditRoutineActivityForm);
    }


    return (
        <div className='center-column'>
            <div className='detailed-routine-activity'>
                {
                    activity.imageUrl ? <img className='activity-card-image' src={activity.imageUrl}></img> : null
                }
                <div className='detailed-routine-activity-info-container'>
                    <div className='spread-row'>
                        <Link to={`/routines/featured/${activity.id}`} className="activity-tag">{activity.name}</Link>
                        {
                            myRoutine ? <button onClick={handleToggleEditRoutineActivityForm}>{ !toggleEditRoutineActivityForm ? <AiOutlineEdit /> : <AiOutlineUpCircle/>}</button> : null
                        }
                    </div>
                    <p>{activity.description}</p>
                    {
                        activity.count ? 
                            <div className='spread-row'>
                                <div className='routine-activity-preview-stat'><strong>Count: </strong><div className='value'>{activity.count}</div></div>
                                <div className='routine-activity-preview-stat'><strong>Duration: </strong><div className='value'>{activity.duration}</div></div>
                            </div>
                        : null
                    }
                </div>
            </div>
            {
                toggleEditRoutineActivityForm ? <EditRoutineActivity activityData={activity} handleToggleEditRoutineActivityForm={handleToggleEditRoutineActivityForm} setRoutineData={setRoutineData} /> : null
            }
        </div>
    )
}

export default DetailedRoutineActivity;