import React from 'react';
import { Link } from "react-router-dom"; 

import { BiHomeAlt, BiDumbbell, BiUser } from 'react-icons/bi';
import Header from './Header';


const Error = () => {
    return (
        <div className='center-column'>
            <Header />
            <div className='page-container' id='error-page'>
                <h3 className='error'>Sorry, there's nothing here...</h3>
            </div>
        </div>

    )
};

export default Error; 