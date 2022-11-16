import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";

import RoutinePreview from "./RoutinePreview";

const FeaturedRoutines = () => {

    const [ routines, setRoutines ] = useState([]);
    const [ featuredTag, setFeaturedTag ] = useState("");

    const location = useLocation();
    const id = location.pathname.slice('/routines/featured/'.length);


    useEffect(() => {
        async function fetchRoutines() {
            try {
                const response = await fetch(
                    `http://fitnesstrac-kr.herokuapp.com/api/activities/${id}/routines`,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )
                const data = await response.json();
                // console.log("routine data: ", data);
                determineFeaturedTag(data[0]);
                setRoutines(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRoutines();
    }, []);


    async function determineFeaturedTag(routine) {
        routine.activities.forEach(activity => {
            if (activity.id == id) setFeaturedTag(activity.name);
        })
    }


    return (
        <div>
            <h1>Routines featuring {featuredTag}</h1>
            <div className="horiz-flex-container">
            {
                routines.length ? routines.map((routine, idx) => {
                    return <RoutinePreview key={idx} routine={routine} />
                }) : <p>No routines to display</p>
            }
            </div>

        </div>
    )
}

export default FeaturedRoutines;