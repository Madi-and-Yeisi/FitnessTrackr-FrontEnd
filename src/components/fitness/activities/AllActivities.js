import React, {useEffect, useState} from "react";
import { useOutletContext, Link } from "react-router-dom";

import { MdAddCircle } from 'react-icons/md';

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
                    loggedIn ? <Link to={'/activities/add'} className="header-button"><MdAddCircle className="icon" />Add New</Link> : null
                }
                </div>
            </div>
            <div className="vert-flex-container">
            {
                activities && activities.length ? activities.map((activity, idx) => {
                    return <ActivityPreview key={idx} activity={activity} setActivities={setActivities} />
                }) : <p>No activities to display</p>
            }
            </div>
        </div>
    )
}

export default Activities;