import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { newActivityFetch } from '../../../api/activities';

import { BiErrorCircle } from 'react-icons/bi';


const NewActivity = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [errorMessage, setErrorMessage] = useState("");


    async function newActivityFormSubmitHandler(event) {
        event.preventDefault();

        const newActivityFetchData = await newActivityFetch(name, description, imageUrl);
        newActivityFetchData.success ? navigate('/activities') : setErrorMessage(newActivityFetchData.message);
    }


    return (
        <div className='page-container new-activity'>
            <h2>New Activity</h2>

            <form onSubmit={newActivityFormSubmitHandler}>
                <label>Name:</label>
                <input type="text" className='name-input' value={name} onChange={(event) => setName(event.target.value)}></input>

                <br/>

                <label>Description:</label>
                <textarea type="text" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>

                <br/>

                <label>Image or Gif Reference Url:</label>
                <input type="text" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}></input>

                <br />

                <button type="submit">Add Activity</button>
            </form>
            {
                errorMessage ? <p className='error'><BiErrorCircle />{errorMessage}</p> : null
            }
        </div>
    )
};

export default NewActivity;