import React, {useEffect, useState} from "react";
import { useOutletContext, Link } from "react-router-dom";
import { userRoutinesFetch } from "../../../api/users";

import RoutinePreview from "./RoutinePreview";

const MyRoutines = () => {
    const { profileData } = useOutletContext();

    const [routines, setRoutines] = useState([]);


    useEffect(() => {
        fetchRoutines();
    }, []);


    async function fetchRoutines() {
        const myRoutinesFetchData = await userRoutinesFetch(profileData.username);
        setRoutines(myRoutinesFetchData.routines);
    }


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