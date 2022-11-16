import React, { useState } from 'react';
import { Link, useOutletContext, useNavigate } from "react-router-dom";

const Login = () => {

    const { setProfileData, setLoggedIn } = useOutletContext();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);
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

    function handleTogglePasswordVisibility(event) {
        setPasswordVisibility(event.target.checked);
        let passwordType = document.getElementById("passwordVisibilityInput");
        if (passwordType.type === "password") {
            passwordType.type = "text";
        } else {
            passwordType.type = "password";
        }
    }

    return (
        <div className='vert-flex-container'>
            <form onSubmit={loginFormSubmitHandler} className="purple form">
                <label>Enter Username Here</label>
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}></input>

                <br/>

                <label>Enter Password Here</label>
                <input type="password" value={password} id="passwordVisibilityInput" onChange={(event) => setPassword(event.target.value)}></input>
                <div  className='centered'>
                    <label>Show Password?</label>
                    <input type="checkbox" value={passwordVisibility} onChange={handleTogglePasswordVisibility}></input>
                </div>

                <br/>

                <button type="submit" className='green button'>Login</button>
            </form>

            <Link to="/profile/register">Don't have an account? Click here to sign up</Link>

            {
                errorMessage ? <p className='error'>{errorMessage}</p> : null
            }
        </div>
    )
}

export default Login;