import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";

import { MdAddCircle } from 'react-icons/md';
import { ImSearch } from 'react-icons/im';

import ActivityPreview from "./ActivityPreview";
import { activitiesFetch } from "../../../api/activities";

const Activities = () => {
    const [ activities, setActivities ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState("");

    const { loggedIn } = useOutletContext();


    useEffect(() => {
        async function fetchActivities() {
            const activitiesData = await activitiesFetch();
            activitiesData.success ? setActivities(activitiesData.activities) : console.log(activitiesData.message);
        }
        fetchActivities();
    }, []);


    function findMatch(activity, text) {
        if (activity.name.toLowerCase().includes(text.toLowerCase())) return true;
        else if (activity.description.toLowerCase().includes(text.toLowerCase())) return true;
        else return false;
    }

    const filteredActivities = activities.filter(activity => findMatch(activity, searchTerm));
    const activitiesToDisplay = searchTerm.length ? filteredActivities : activities;

    return (
        <div className="page-container">
            <header>
                <h1>Activities</h1>
                <form>
                    <ImSearch />
                    <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}></input>
                </form>
                {
                    loggedIn ? <Link to={'/activities/add'} className="header-button"><MdAddCircle className="icon" />Add New</Link> : null
                }
            </header>
            {
                activitiesToDisplay.length ? activitiesToDisplay.map((activity, idx) => {
                    return <ActivityPreview key={idx} activity={activity} setActivities={setActivities} />
                }) : <div className="nothing-here">Fetching activities...<div className="spinner"></div></div>
            }
        </div>
    )
}

export default Activities;