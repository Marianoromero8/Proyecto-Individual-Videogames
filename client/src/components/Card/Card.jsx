import React from "react";
import style from './Card.module.css';
import { useNavigate } from "react-router-dom";


const Card = ({coun}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/detail/${coun.id}`);
    }

    return(
        <div className={style.card} onClick={handleClick}>
            <img src={coun.image} alt={coun.image} className={style.image}/>
            <h1 className={style.h1}>Title: {coun.name}</h1>
            <h2 className={style.h2}>Genres: {coun.genres}</h2>
            <h2 className={style.h2}>Rating: {coun.rating}</h2>
            <h2 className={style.h2}>Rating: #{coun.id}</h2>
            
        </div>
    )
}

export default Card;