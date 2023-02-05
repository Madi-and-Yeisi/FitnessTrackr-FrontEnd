import React from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";

const Home = () => {
    const { loggedIn, profileData } = useOutletContext();

    const navigate = useNavigate();

    const messages = ["You don't need to be extreme, just consistent!", "Work out because you love your body, not because you hate it", "Sore today, strong tomorrow", "The body achieves what the mind believes", "This can be the beginning of anything you want", "Keep listening to your body", "We are what we repeatedly do. Excellence then is not an act, but a habit", "You're so strong!", "Don't wish for it, work for it!", "The groundwork for all happiness is good health", "Strive for progress, not perfection", "If you work, it will work", "It's your workout, your time, your body - own it.", "Your body can do it, it's time to convince your mind", "Sore today, strong tomorrow.", "The only person you are destined to become is the person you decide to be", "All progress takes place outside the comfort zone", "Whether you think you can, or you think you can't, you're right", "Discipline is the bridge between goals and accomplishment", "The pain you feel today will be the strength you feel tomorrow", "Action is the foundational key to all success", "No pain, no gain.", "You miss 100% of the shots you don't take", "Nothing will work unless you do", "Strength does not come from physical capacity. It comes from an indomitable will", "All great achievements require time" ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];


    return (
        <div>
            <div className='home-container'>
                <img src="https://media.self.com/photos/5b7c4e71ecbb7f4c41c77335/4:3/w_2240%2Cc_limit/triangle-pose-beginner-yoga.jpg" alt="action shot"></img>
                <div className='home-info' onClick={() => navigate('/routines')}>Hey{ loggedIn ? ` ${profileData.username}!` : '!'} Welcome{ loggedIn ? ' back' : ''} to <div id='home-title'>Fitness Trackr</div>! Good luck with your <strong><u>routines</u></strong> today!</div>
                <div className='home-message'>{randomMessage}</div>
            </div>
        </div>
    )
}

export default Home;