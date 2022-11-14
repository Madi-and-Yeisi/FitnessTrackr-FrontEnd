import React, { useState, useEffect } from 'react';
import { Link, useOutletContext, useNavigate } from "react-router-dom";


const Register = () => {

    const { setProfileData, setLoggedIn } = useOutletContext();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function registerFormSubmitHandler(event) {
        event.preventDefault();

        // TODO: provide feedback on the form if the user provides incorrect credentials, or bad usernames or passwords

        try {
            const response = await fetch(
                'http://fitnesstrac-kr.herokuapp.com/api/users/register',
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
            // console.log("register data:", data);

            if (data.user) {
                console.log(data.message);
                setLoggedIn(true);
                localStorage.setItem("token", data.token);
                setProfileData(data.user);
                navigate("/profile");
            } else {
                // problem registering
                setErrorMessage(data.error);
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div>
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

                <button type="submit">Register For New Account</button>
            </form>
            {
                errorMessage ? <p>{errorMessage}</p> : null
            }
        </div>
    )
}

export default Register;