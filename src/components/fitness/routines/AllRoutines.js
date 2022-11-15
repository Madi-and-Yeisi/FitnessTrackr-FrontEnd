import React, {useEffect, useState} from "react";
import { useOutletContext, Link } from "react-router-dom";


import RoutinePreview from "./RoutinePreview";

const Routines = () => {

    const { routines } = useOutletContext();


    return (
        <div>
            <h1>Routines</h1>
            {
                routines.length ? routines.map((routine, idx) => {
                    return <RoutinePreview key={idx} routine={routine} />
                }) : <p>No routines to display</p>
            }
        </div>
    )
}

export default Routines;