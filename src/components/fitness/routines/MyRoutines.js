import React, {useEffect, useState} from "react";
import { useOutletContext, useLocation, Link } from "react-router-dom";


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
            <h1>My Routines</h1>
            <p>@{profileData.username}</p>
            <button><Link to={'/routines/my-routines/add'}>Add New Routine</Link></button>
            {
                routines.length ? routines.map((routine, idx) => {
                    return <RoutinePreview key={idx} routine={routine} setRoutines={setRoutines} />
                }) : <p>No routines to display</p>
            }
        </div>
    )
}

export default MyRoutines;