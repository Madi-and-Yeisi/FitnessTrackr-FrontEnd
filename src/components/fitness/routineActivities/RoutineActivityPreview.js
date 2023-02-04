import { Link } from 'react-router-dom';


const RoutineActivityPreview = ({ activity }) => {


    return (
        <div className='routine-activity-container'>
            <div className='routine-activity-preview'>
                {
                    activity.imageUrl ? <img src={activity.imageUrl}></img> : null
                }
                <div className='routine-activity-preview-info-container'>
                    <Link to={`/routines/featured/${activity.id}`} className="routine-activity-tag">{activity.name}</Link>
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
        </div>
    )
}

export default RoutineActivityPreview;