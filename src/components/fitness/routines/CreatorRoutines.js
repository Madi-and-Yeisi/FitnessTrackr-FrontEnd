import React, {useEffect, useState} from "react";
import { useOutletContext, useLocation, Link } from "react-router-dom";

import RoutinePreview from "./RoutinePreview";

const CreatorRoutines = () => {
    const { profileData } = useOutletContext();

    const [routines, setRoutines] = useState([]);

    const location = useLocation();
    const username = location.pathname.slice('/routines/'.length);


    useEffect(() => {
        async function fetchRoutines() {
            try {
                const response = await fetch(
                    `http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )
                const data = await response.json();
                // console.log("routine data: ", data);
                setRoutines(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRoutines();
    }, []);


    return (
        <div>
            <h1>@{username}'s routines</h1>
            {
                username === profileData.username ? <button><Link to={`/routines/${username}/add`}>Add New Routine</Link></button> : null
            }
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

export default CreatorRoutines;