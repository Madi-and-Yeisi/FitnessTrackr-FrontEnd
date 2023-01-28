import React, { useState, useEffect } from 'react';
import { Link, useOutletContext, useNavigate } from "react-router-dom";

import { registerFetch, userFetch } from '../../api/users';


const Register = () => {

    const { setProfileData, setLoggedIn } = useOutletContext();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function registerFormSubmitHandler(event) {
        event.preventDefault();

        // TODO: provide feedback on the form if the user provides incorrect credentials, or bad usernames or passwords

        const registerFetchData = await registerFetch(username, password);
        
        if (registerFetchData.success) {
            console.log(registerFetchData.message);
            setLoggedIn(true);
            localStorage.setItem("token", registerFetchData.token);
            const userFetchData = userFetch();
            setProfileData(userFetchData.user);
            navigate("/profile");
        } else {
            // problem registering
            setErrorMessage(registerFetchData.message);
        }
    }


    return (
        <div className='vert-flex-container'>
            <form className="form" onSubmit={registerFormSubmitHandler}>
                <label>Enter New Username Here</label>
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}></input>

                <br/>

                <label>Enter New Password Here</label>
                <input type="text" value={password} onChange={(event) => setPassword(event.target.value)}></input>

                <br/>

                {/* TODO:  */}
                {/* <label>Confirm Password</label>
                <input type="text" value={password} onChange={updatePasswordState}></input>

                <br/> */}

                <button type="submit" className='green button'>Register For New Account</button>
            </form>
            {
                errorMessage ? <p className='error'>{errorMessage}</p> : null
            }
        </div>
    )
}

export default Register;