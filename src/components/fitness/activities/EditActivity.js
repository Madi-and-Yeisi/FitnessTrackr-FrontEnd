import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { activitiesFetch, editActivityFetch } from '../../../api/activities';

const EditActivity = (props) => {

    const [name, setName] = useState(props.activityData.name);
    const [description, setDescription] = useState(props.activityData.description);
    const [imageUrl, setImageUrl] = useState(props.activityData.imageUrl);

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();


    async function editActivityFormSubmitHandler(event) {
        event.preventDefault();

        const editActivityFetchData = await editActivityFetch(props.activityData.id, name, description, imageUrl);
        
        if (editActivityFetchData.success) {
            props.handleToggleEditActivityForm();
            const updatedActivitiesData = activitiesFetch();
            props.setActivities(updatedActivitiesData.activities);  // TODO: make this update automatically
            navigate('/activities');
        } else {
            setErrorMessage(editActivityFetchData.message);
        }
    }


    return (
        <div>
            <form onSubmit={editActivityFormSubmitHandler} className="activity-form">
                <label>Name:</label>
                <input type="text" className="name-input" value={name} onChange={(event) => setName(event.target.value)}></input>

                <br/>

                <label>Description:</label>
                <textarea type="text" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>

                <br/>

                <label>Image or Gif Reference Url:</label>
                <input type="text" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}></input>

                <br />

                <button type="submit">Update Activity</button>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }
        </div>
    )
};

export default EditActivity;