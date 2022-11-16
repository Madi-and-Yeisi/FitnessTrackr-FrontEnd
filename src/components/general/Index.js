import React from 'react';
import { useOutletContext } from "react-router-dom";

const Index = () => {
    const { loggedIn, profileData } = useOutletContext();

    return (
        <div className='centered'>
            <h1>Welcome to</h1>
            <div className='purple title'>FitnessTrackr</div>
            {
                loggedIn ? <h2>{profileData.username} !</h2> : null
            }
        </div>
    )
}

export default Index;