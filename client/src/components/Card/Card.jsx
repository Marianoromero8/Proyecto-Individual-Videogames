import React from "react";
import style from './Card.module.css';
import { useNavigate } from "react-router-dom";

const Card = ({coun}) => {
    const navigate = useNavigate();

    const handleClick = () => { //Esta funcion hace que cuando clickeo la carta me redirija al detail de la misma, a traves del ID de cada juego
        navigate(`/detail/${coun.id}`);
    }

    const genresArray = Array.isArray(coun.genres) ? coun.genres.join(', ') : coun.genres; //Si los genres son un array entonces los uno con coma en una cadena, sino devuelvo el genre

    return(
        <div className={style.card} onClick={handleClick}>
            <img src={coun.image} alt={coun.image} className={style.image}/>
            <h1 className={style.h1}>Title: {coun.name}</h1>
            <h2 className={style.h2}>Genres:{genresArray}</h2>
            <h2 className={style.h2}>Rating: {coun.rating}</h2>
        </div>
    )
}

export default Card;