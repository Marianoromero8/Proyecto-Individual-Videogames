import React from 'react';
import style from './Landing.module.css'
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    return(
        <div className={style.landing}>
            <h1>Welcome to RAWG Video Games Web Site</h1>
            <h2>If you want to find some Video Games or create a card about a new one, ENTER</h2>
            <button onClick={() => {navigate('/home')}} className={style.landingButton}>Enter</button>
        </div>
    )
}

export default Landing;
