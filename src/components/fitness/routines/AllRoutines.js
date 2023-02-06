import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";

import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';

import RoutinePreview from "./RoutinePreview";

const Routines = () => {

    const [ searchTerm, setSearchTerm ] = useState("");

    const { loggedIn, routines } = useOutletContext();


    function findMatch(routine, text) {
        if (routine.name.toLowerCase().includes(text.toLowerCase())) return true;
        else if (routine.goal.toLowerCase().includes(text.toLowerCase())) return true;
        else if (routine.creatorName.toLowerCase().includes(text.toLowerCase())) return true;
        else return false;
    }

    const filteredRoutines = routines.filter(routine => findMatch(routine, searchTerm));
    const routinesToDisplay = searchTerm.length ? filteredRoutines : routines;

    return (
        <div className="page-container">
        <header>
            <h1>Routines</h1>
            <form>
                <ImSearch />
                <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}></input>
            </form>
            {
                loggedIn ? <Link to={'/routines/my-routines'} className="header-button"><BsFillArrowRightCircleFill />My Routines</Link> : null
            }
        </header>
        {
            routinesToDisplay.length ? routinesToDisplay.map((routine, idx) => {
                return <RoutinePreview key={idx} routine={routine} />
            }) : <div className="nothing-here">Getting routines...<div className="spinner"></div></div>
        }
    </div>
    )
}

export default Routines;