import React, { useState, useEffect } from 'react';
import { Link, useOutletContext, useNavigate } from "react-router-dom";



const Login = () => {

    const { setProfileData, loggedIn, setLoggedIn } = useOutletContext();
    const navigate = useNavigate();


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    async function loginFormSubmitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                'http://fitnesstrac-kr.herokuapp.com/api/users/login',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }
            )
            const data = await response.json();
            // console.log("This is our translated data: ", data);
            if (data.user) {
                setLoggedIn(true);
                localStorage.setItem("token", data.token);
                fetchUserInfo();
            } else {
                // username or password is incorrect
                setErrorMessage(data.error);
            }
        } catch(error) {
            console.log(error);
        }
    }

    async function fetchUserInfo(event) {    
        try {
            const response = await fetch(
                'http://fitnesstrac-kr.herokuapp.com/api/users/me',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                })
                
            const data = await response.json();
            // console.log("User profile data: ", data);
            setProfileData(data);
            navigate('/profile');
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={loginFormSubmitHandler} className="form">
                <label>Enter Username Here</label>
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}></input>

                <br/>

                <label>Enter Password Here</label>
                <input type="text" value={password} onChange={(event) => setPassword(event.target.value)}></input>

                <br/>

                <button type="submit">Login</button>
            </form>
            <Link to="/profile/register">Don't have an account? Click here to sign up</Link>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }
        </div>
    )
}

export default Login;