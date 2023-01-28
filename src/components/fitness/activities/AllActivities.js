import React, {useEffect, useState} from "react";
import { useOutletContext, Link } from "react-router-dom";

import { GrAddCircle } from 'react-icons/gr';

import ActivityPreview from "./ActivityPreview";
import { activitiesFetch } from "../../../api/activities";

const Activities = () => {
    const [activities, setActivities] = useState([]);

    const { loggedIn } = useOutletContext();


    useEffect(() => {
        async function fetchActivities() {
            const activitiesData = await activitiesFetch();
            activitiesData.success ? setActivities(activitiesData.activities) : console.log(activitiesData.message);
            console.log('activities', activities);
        }
        fetchActivities();
    }, []);




    return (
        <div className="page-container">
            <div className="separated-horiz-container sticky-sub-header sub-header">
                <div className="sub-title">Activities</div>
                <div>
                {
                    loggedIn ? <button className="new-activity-button"><GrAddCircle /><Link to={'/activities/add'} className="black no-line">Add New</Link></button> : null
                }
                </div>
            </div>
            <div className="vert-flex-container">
            {
                activities.length ? activities.map((activity, idx) => {
                    return <ActivityPreview key={idx} activity={activity} />
                }) : <p>No activities to display</p>
            }
            </div>
        </div>
    )
}

export default Activities;