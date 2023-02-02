import React, { useState, useEffect } from 'react';
import { Link, useOutletContext, useNavigate } from "react-router-dom";

import { BiUser, BiLockAlt, BiErrorCircle } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { registerFetch, meFetch } from '../../api/users';


const Register = () => {

    const { setProfileData, setLoggedIn } = useOutletContext();

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ passwordsMatch, setPasswordsMatch] = useState(true);

    const [ passwordVisibility, setPasswordVisibility ] = useState(false);
    const [ confirmPasswordVisibility, setConfirmPasswordVisibility ] = useState(false);

    const [ errorMessage, setErrorMessage ] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        checkPasswordsMatch();
    }, [confirmPassword])


    function checkPasswordsMatch() {
        if (confirmPassword !== password) {
            setPasswordsMatch(false);
            setErrorMessage("Confirmed password does not match password");
        } else {
            setPasswordsMatch(true);
            setErrorMessage("");
        }
    }


    async function registerFormSubmitHandler(event) {
        event.preventDefault();

        if (!passwordsMatch) {
            setErrorMessage("Confirmed password DOES NOT MATCH password");
            return;
        }

        const registerFetchData = await registerFetch(username, password);
        
        if (registerFetchData.success) {
            console.log(registerFetchData.message);
            setLoggedIn(true);
            localStorage.setItem("token", registerFetchData.token);
            const userFetchData = meFetch();
            setProfileData(userFetchData.user);
            navigate("/profile");
        } else {
            setErrorMessage(registerFetchData.message);
        }
    }


    return (
        <div className='page-container'>
            <form className="user-form" onSubmit={registerFormSubmitHandler}>
                <label>Enter Username:</label>
                <div className='input-container'>
                    <BiUser />
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                </div>

                <br/>

                <label>Enter Password:</label>
                <div className='input-container'>
                    <BiLockAlt />
                    <input type={ !passwordVisibility ? 'password' : 'text'} value={password} onChange={(event) => setPassword(event.target.value)}></input>
                    {
                        !passwordVisibility ? <AiOutlineEye onClick={() => setPasswordVisibility(!passwordVisibility)} className='clickable icon'/> : <AiOutlineEyeInvisible onClick={() => setPasswordVisibility(!passwordVisibility)} className='clickable icon'/>
                    }
                </div>

                <br/>

                <label>Confirm Password:</label>
                <div className={ passwordsMatch ? 'input-container' : 'input-error input-container'}>
                    <BiLockAlt />
                    <input type={ !confirmPasswordVisibility ? 'password' : 'text'} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}></input>
                    {
                        !confirmPasswordVisibility ? <AiOutlineEye onClick={()=> setConfirmPasswordVisibility(!confirmPasswordVisibility)} className='clickable icon'/> : <AiOutlineEyeInvisible onClick={()=> setConfirmPasswordVisibility(!confirmPasswordVisibility)} className='clickable icon'/>
                    }
                </div>

                <br />

                <button type="submit">Register For New Account</button>
            </form>
            {
                errorMessage ? <p className='error'><BiErrorCircle />{errorMessage}</p> : null
            }
        </div>
    )
}

export default Register;