import React from "react";
import style from './Card.module.css'
const Card = ({coun}) => {

    return(
        <div className={style.card}>
            <img src={coun.image} alt={coun.image} className={style.image}/>
            <h1 className={style.h1}>Title: {coun.name}</h1>
            <h2 className={style.h2}>Genres: {coun.genres}</h2>
        </div>
    )
}

export default Card;