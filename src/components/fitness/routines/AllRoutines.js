import React from "react";
import { useOutletContext } from "react-router-dom";

import RoutinePreview from "./RoutinePreview";

const Routines = () => {

    const { routines } = useOutletContext();


    return (
        <div className="page-container">
            <div className="separated-horiz-container sticky-sub-header sub-header">
                <div className="sub-title">Routines</div>
                <div>
                {
                    // search 
                }
                </div>
            </div>
            <div className="vert-flex-container">
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