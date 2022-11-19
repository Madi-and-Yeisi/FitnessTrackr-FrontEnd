import React from "react";
import { useOutletContext } from "react-router-dom";

import RoutinePreview from "./RoutinePreview";

const Routines = () => {

    const { routines } = useOutletContext();


    return (
        <div>
            <h1>Routines</h1>
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

export default Routines;