import React, { useState } from 'react';
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { loginFetch, userFetch } from '../../api/users';

const Login = () => {

    const { setProfileData, setLoggedIn } = useOutletContext();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    async function loginFormSubmitHandler(event) {
        event.preventDefault();

        const loginFetchData = await loginFetch(username, password);

        if (loginFetchData.success) {
            setLoggedIn(true);
            localStorage.setItem("token", loginFetchData.token);
            const userFetchData = await userFetch();
            setProfileData(userFetchData);
            navigate('/');
        } else {
            setErrorMessage(loginFetchData.message);
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