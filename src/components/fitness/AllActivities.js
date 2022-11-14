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
                    'http://fitnesstrac-kr.herokuapp.com/api/activities',
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
            <h1>Activities</h1>
            {
                loggedIn ? <button><Link to={'/activities/add'}>Add New Activity</Link></button> : null

            }
            {
                activities.length ? activities.map((activity, idx) => {
                    return <ActivityPreview key={idx} activity={activity} />
                }) : <p>No activities to display</p>
            }
        </div>
    )
}

export default Activities;