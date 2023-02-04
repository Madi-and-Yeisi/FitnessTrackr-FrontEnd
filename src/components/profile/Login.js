import { useState } from 'react';
import { Link, useOutletContext, useNavigate } from "react-router-dom";

import { BiUser, BiLockAlt, BiErrorCircle } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { loginFetch, meFetch } from '../../api/users';

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
            const userFetchData = await meFetch();
            setProfileData(userFetchData);
            navigate('/');
        } else {
            setErrorMessage(loginFetchData.message);
        }
    }


    return (
        <div className='page-container'>
            <form onSubmit={loginFormSubmitHandler} className="user-form">
                <label>Enter Username:</label> 
                <div className='input-container'>
                    <BiUser className='icon' />
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                </div>

                <br/>

                <label>Enter Password:</label>
                <div className='input-container'>
                    <BiLockAlt className='icon'/>
                    <input type={ !passwordVisibility ? 'password' : 'text'} value={password} onChange={(event) => setPassword(event.target.value)}></input>
                    {
                        passwordVisibility ? <AiOutlineEye onClick={() => setPasswordVisibility(!passwordVisibility)} className='clickable icon'/> : <AiOutlineEyeInvisible onClick={() => setPasswordVisibility(!passwordVisibility)} className='clickable icon'/>
                    }
                </div>

                <br/>

                <button type="submit" className='green button'>Login</button>
            </form>

            <Link to="/profile/register" className='register-link'>Don't have an account? Click here to sign up.</Link>

            {
                errorMessage ? <p className='error'><BiErrorCircle />{errorMessage}</p> : null
            }
        </div>
    )
}

export default Login;