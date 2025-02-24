import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { filterGenres, filterOrigin, getAllGenres, orderAZ, orderAsc, orderDesc, orderZA } from "../../redux/actions";
import style from './Filters.module.css'

const Filters = () => {
    const dispatch = useDispatch();

    const allVideogames = useSelector(state => state.videogames)
    const allGenres = useSelector(state => state.genres);

    useEffect(() => {
        dispatch(getAllGenres())
    }, [dispatch])

    const handleGenres = (event) => {
        dispatch(filterGenres(event.target.value))
    }

    const handleOrderAlphabetic = (event) => {
        if (event.target.value === "AZ") {
            dispatch(orderAZ(allVideogames))
        } else {
            dispatch(orderZA(allVideogames))
        }
    }

    const handleOrderRating = (event) => {
        if (event.target.value === "ASCENDENTE") {
            dispatch(orderAsc(allVideogames))
        } else {
            dispatch(orderDesc(allVideogames))
        }
    }

    const handleOrigin = (event) => {
        dispatch(filterOrigin(event.target.value))
    }


    return (
        <div>
            <section className={style.section}>
                <select name="" id="" onChange={handleOrigin}>
                    <option value="API">API</option>
                    <option value="DB">DATA BASE</option>
                </select>

                <select name="" id="" onChange={handleGenres}>
                    <option value="All Genres">All Genres</option>
                    {Array.isArray(allGenres) && allGenres.map((gen, i) => (
                        <option value={gen.name} key={i} >{gen.name}</option>
                    ))}
                </select>

                <select name="" id="" onChange={handleOrderAlphabetic}>
                    <option value="AZ">A-Z</option>
                    <option value="ZA">Z-A</option>
                </select>

                <select name="" id="" onChange={handleOrderRating}>
                    <option value="ASCENDENTE">Rating Ascendente</option>
                    <option value="DESCENDENTE">Rating Descendente</option>
                </select>
            </section>
        </div>
    )
}

export default Filters;