import React, {useEffect, useState} from "react";
import { useOutletContext, useLocation, Link } from "react-router-dom";

import { userRoutinesFetch } from "../../../api/users";

import RoutinePreview from "./RoutinePreview";

const CreatorRoutines = () => {
    const { profileData } = useOutletContext();
    console.log("HELLO CREATOR ROUTINES")

    const [routines, setRoutines] = useState([]);

    const location = useLocation();
    const username = location.pathname.slice('/routines/user/'.length);


    useEffect(() => {
        async function getRoutines() {
            console.log("getting routines")
            const userRoutinesFetchData = await userRoutinesFetch(username);
            console.log("userRoutinesFetchData: ", userRoutinesFetchData)
            // userRoutinesFetchData.success ? setRoutines(userRoutinesFetchData.routines) : console.log(userRoutinesFetchData.message);
        }
        getRoutines();
    }, []);


    return (
        <div className="page-container">
            <header>
                <h1><div className="creator-page-tag">{username}'s</div> Public Routines</h1>
            </header>
            <div>
            {
                routines.length ? routines.map((routine, idx) => {
                    return <RoutinePreview key={idx} routine={routine} />
                }) : <div className="nothing-here">No routines to display...<div className="spinner"></div></div>
            }
            </div>
        </div>
    )
}

export default CreatorRoutines;