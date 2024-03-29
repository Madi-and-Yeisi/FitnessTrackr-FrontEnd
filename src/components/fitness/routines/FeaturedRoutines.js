import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";

import { fetchRoutinesByActivityId } from "../../../api/activities";

import RoutinePreview from "./RoutinePreview";

const FeaturedRoutines = () => {

    const [ routines, setRoutines ] = useState([]);
    const [ featuredTag, setFeaturedTag ] = useState("");
    const [ noRoutines, setNoRoutines ] = useState(false);

    const location = useLocation();
    const id = location.pathname.slice('/routines/featured/'.length);


    useEffect(() => {
        async function getRoutines() {
            const routinesFetchData = await fetchRoutinesByActivityId(id);

            if (routinesFetchData.success) {
                determineFeaturedTag(routinesFetchData.routines[0]);
                setRoutines(routinesFetchData.routines);
            } else {
                // console.log(routinesFetchData.message);
                setNoRoutines(true);
            }
        }
        getRoutines();
    }, []);


    function determineFeaturedTag(routine) {
        routine.activities.forEach(activity => {
            if (activity.id == id) setFeaturedTag(activity.name);
        })
    }


    return (
        <div className="page-container">
            <header>
                {
                    noRoutines ? null : <h1>Routines with <div className="creator-page-tag">{featuredTag}</div></h1>
                }
            </header>
            {
                routines.length ? routines.map((routine, idx) => {
                    return <RoutinePreview key={idx} routine={routine} />
                }) :  !noRoutines ? <div className="nothing-here">Fetching routines...<div className="spinner"></div></div> 
                        : <p className="nothing-here">No routines use this activity...</p>
            }
        </div>
    )
}

export default FeaturedRoutines;