import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";

import { userRoutinesFetch } from "../../../api/users";

import RoutinePreview from "./RoutinePreview";

const CreatorRoutines = () => {

    const [routines, setRoutines] = useState([]);
    const [ noRoutines, setNoRoutines ] = useState(false);

    const location = useLocation();
    const username = location.pathname.slice('/routines/user/'.length);


    useEffect(() => {
        async function getRoutines() {
            const userRoutinesFetchData = await userRoutinesFetch(username);
            if (userRoutinesFetchData.success) {
                setRoutines(userRoutinesFetchData.routines);
                if (userRoutinesFetchData.routines.length == 0) setNoRoutines(true);
            } else {
                console.log(userRoutinesFetchData.message);
            }
            
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
                }) : !noRoutines ? <div className="nothing-here">Fetching routines...<div className="spinner"></div></div> 
                : <p className="nothing-here">No routines to display.</p>
            }
            </div>
        </div>
    )
}

export default CreatorRoutines;