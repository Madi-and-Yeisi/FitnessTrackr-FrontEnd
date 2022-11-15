import React, {useEffect, useState} from "react";
import { useOutletContext, useLocation, Link } from "react-router-dom";


import RoutinePreview from "./RoutinePreview";

const FeaturedRoutines = () => {
    const { profileData } = useOutletContext();

    const [routines, setRoutines] = useState([]);

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
                setRoutines(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRoutines();
    }, []);


    return (
        <div>
            <h1>Routines featuring</h1>
            {
                routines.length ? routines.map((routine, idx) => {
                    return <RoutinePreview key={idx} routine={routine} />
                }) : <p>No routines to display</p>
            }
        </div>
    )
}

export default FeaturedRoutines;