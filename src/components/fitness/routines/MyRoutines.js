import {useEffect, useState} from "react";
import { Link } from "react-router-dom";

import { MdAddCircle } from 'react-icons/md';
import { ImSearch } from 'react-icons/im';

import { myRoutinesFetch } from "../../../api/users";

import RoutinePreview from "./RoutinePreview";

const MyRoutines = () => {
    const [routines, setRoutines] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState("");


    useEffect(() => {
        fetchRoutines();
    }, []);


    async function fetchRoutines() {
        const myRoutinesFetchData = await myRoutinesFetch();
        setRoutines(myRoutinesFetchData.routines);
    }


    function findMatch(routine, text) {
        if (routine.name.toLowerCase().includes(text.toLowerCase())) return true;
        else if (routine.goal.toLowerCase().includes(text.toLowerCase())) return true;
        else return false;
    }

    const filteredRoutines = routines.filter(routine => findMatch(routine, searchTerm));
    const routinesToDisplay = searchTerm.length ? filteredRoutines : routines;


    return (
        <div className="page-container">
            <header>
                <h1>My Routines</h1>
                <form>
                    <ImSearch />
                    <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}></input>
                </form>
                <Link to={'/routines/my-routines/add'} className="header-button"><MdAddCircle className="icon" />Add New</Link>
            </header>

            <div className="center-column">
            {
                routinesToDisplay.length ? routinesToDisplay.map((routine, idx) => {
                    return <RoutinePreview key={idx} routine={routine} setRoutines={setRoutines} />
                }) : <p>No routines to display</p>
            }
            </div>
        </div>
    )
}

export default MyRoutines;