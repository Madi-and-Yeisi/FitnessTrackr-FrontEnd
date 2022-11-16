import React, {useEffect, useState} from "react";
import { useOutletContext, Link } from "react-router-dom";

import ActivityPreview from "./ActivityPreview";

const Activities = () => {
    const [activities, setActivities] = useState([]);

    const { loggedIn } = useOutletContext();


    useEffect(() => {
        async function fetchActivities() {
            try {
                const response = await fetch(
                    'https://fitnesstrac-kr.herokuapp.com/api/activities',
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )
                const data = await response.json();
                // console.log("activity data: ", data);
                setActivities(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchActivities();
    }, []);


    return (
        <div>
            <div className="separated-horiz-container">
                <h1>Activities</h1>
                <div>
                {
                    loggedIn ? <button className="green button"><Link to={'/activities/add'} className="black no-line">Add New Activity</Link></button> : null
                }
                </div>
            </div>
            <div className="horiz-flex-container">
            {
                activities.length ? activities.map((activity, idx) => {
                    return <ActivityPreview key={idx} activity={activity} setActivities={setActivities} />
                }) : <p>No activities to display</p>
            }
            </div>
        </div>
    )
}

export default Activities;