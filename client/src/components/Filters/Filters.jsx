import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { filterGenres, getAllGenres, orderAZ, orderAsc, orderDesc, orderZA } from "../../redux/actions";

const Filters = () => {
    const dispatch = useDispatch();

    const allVideogames = useSelector(state => state.videogames)
    const allGenres = useSelector(state => state.genres);

    useEffect(() => {
        dispatch(getAllGenres())
    }, [])

    const handleGenres = (event) => {
        dispatch(filterGenres(event.target.value))
    }

    const handleOrderAlphabetic = (event) => {
        if(event.target.value === "AZ"){
            dispatch(orderAZ(allVideogames))
        } else{
            dispatch(orderZA(allVideogames))
        }
    }

    const handleOrderRating = (event) => {
        if(event.target.value === "ASCENDENTE"){
            dispatch(orderAsc(allVideogames))
        } else{
            dispatch(orderDesc(allVideogames))
        }
    }


    return(
        <div>
        <section>
            //FILTRO DE API O DATA BASE
            <select name="" id="">
                <option value="API">API</option>
                <option value="DATA BASE">DATA BASE</option>
            </select>
            //FILTRO DE GENRES
            <select name="" id="" onChange={handleGenres}>
                <option value="All Genres">All Genres</option>
                {allGenres.map((gen, i) => (
                    <option value={gen.name} key={i} >{gen.name}</option>
                ))}
            </select>
            //FILTRO DE ORDEN ALFABETICO
            <select name="" id="" onChange={handleOrderAlphabetic}>
                <option value="AZ">A-Z</option>
                <option value="ZA">Z-A</option>
            </select>
            /FILTRO DE ORDEN POR RATING ASCENDENTE O DESCENDENTE
            <select name="" id="" onChange={handleOrderRating}>
            <option value="ASCENDENTE">Rating Ascendente</option>
            <option value="DESCENDENTE">Rating Descendente</option>
            </select>
            </section>
        </div>
    )
}

export default Filters;