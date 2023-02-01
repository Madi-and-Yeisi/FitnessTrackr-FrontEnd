import React, {useEffect, useState} from "react";
import { useOutletContext, Link } from "react-router-dom";
import { myRoutinesFetch } from "../../../api/users";

import { MdAddCircle } from 'react-icons/md';

import RoutinePreview from "./RoutinePreview";

const MyRoutines = () => {
    const { profileData } = useOutletContext();
    console.log("profile Data ", profileData)

    const [routines, setRoutines] = useState([]);


    useEffect(() => {
        fetchRoutines();
    }, []);


    async function fetchRoutines() {
        const myRoutinesFetchData = await myRoutinesFetch();
        setRoutines(myRoutinesFetchData.routines);
    }


    return (
        <div className="page-container">
            <div className="separated-horiz-container sticky-sub-header sub-header">
                <div className="sub-title">My Routines</div>
                {
                    // search 
                }
                <Link to={'/routines/my-routines/add'} className="header-button"><MdAddCircle className="icon" />Add New</Link>
            </div>

            <div className="vert-flex-container">
            {
                routines && routines.length ? routines.map((routine, idx) => {
                    return <RoutinePreview key={idx} routine={routine} setRoutines={setRoutines} />
                }) : <p>No routines to display</p>
            }
            </div>
        </div>
    )
}

export default MyRoutines;