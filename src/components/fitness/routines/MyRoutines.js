import React, {useEffect, useState} from "react";
import { useOutletContext, Link } from "react-router-dom";

import RoutinePreview from "./RoutinePreview";

const MyRoutines = () => {
    const { profileData } = useOutletContext();

    const [routines, setRoutines] = useState([]);


    useEffect(() => {
        async function fetchRoutines() {
            try {
                const response = await fetch(
                    `http://fitnesstrac-kr.herokuapp.com/api/users/${profileData.username}/routines`,
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
            <div className="separated-horiz-container">
                <h1>@{profileData.username}'s routines</h1>
                <button className="green button"><Link to={'/routines/my-routines/add'} className="black no-line">Add New Routine</Link></button>
            </div>

            <div className="horiz-flex-container">
            {
                routines.length ? routines.map((routine, idx) => {
                    return <RoutinePreview key={idx} routine={routine} setRoutines={setRoutines} />
                }) : <p>No routines to display</p>
            }
            </div>
        </div>
    )
}

export default MyRoutines;