import React, { useEffect } from "react";
import style from "./Details.module.css"
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { videogameDetail } from "../../redux/actions";

const Details = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const gameId = useSelector(state => state.videogameDetail) //Obtengo el estado desde Redux

  useEffect(() => {
    dispatch(videogameDetail(id)) //ejecuto la funcion que me trae el detalle de la carta 
  }, [dispatch, id])

  return gameId ? (
    <>
    <div>
    <div>
        <img src={gameId.image} alt={gameId.name} className={style.image}/>
    </div>

    <div>
        <h1 className={style.name}>{gameId.name}</h1>
        <h2 className={style.h2}>#{gameId.id}</h2>
        <h2 className={style.h2}>Platforms: {gameId.platform}</h2>
        <h2 className={style.description}>Description: {gameId.description}</h2>
        <h2 className={style.h2}>Released date: {gameId.released}</h2>
        <h2 className={style.h2}>Rating: {gameId.rating}</h2>
        <h2 className={style.h2}>Genres: {gameId.genres}</h2>
    </div>

    <button onClick={() => {navigate('/home')}}>Back</button> {/*Creo un boton para volver al home desde el details*/}

    </div>
    </>
  ) : <h1 className={style.loading}> LOADING...</h1>
}

export default Details;