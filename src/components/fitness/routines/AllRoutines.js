import React from "react";
import { useOutletContext, Link } from "react-router-dom";

import { BsFillArrowRightCircleFill } from 'react-icons/bs';

import RoutinePreview from "./RoutinePreview";

const Routines = () => {

    const { loggedIn, routines } = useOutletContext();


    return (
        <div className="page-container">
            <div className="separated-horiz-container sticky-sub-header sub-header">
                <div className="sub-title">Routines</div>
                <div>
                {
                    // search 
                }
                </div>
                {
                    loggedIn ? <Link to='/routines/my-routines' className="header-button"><BsFillArrowRightCircleFill />My Routines</Link> : null
                }
                
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