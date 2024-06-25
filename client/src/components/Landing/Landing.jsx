import React from 'react';
import style from './Landing.module.css'
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    return(
        <div className={style.landing}>
            <h1>Welcome to my website about Video Games!</h1>
            <h2>If you want to search some games o create a car about a new one, click enter</h2>
            <button onClick={() => {navigate('/home')}} className={style.landingButton}>Enter</button>
        </div>
    )
}

export default Landing;
