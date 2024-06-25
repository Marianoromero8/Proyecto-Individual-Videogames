import axios from 'axios';
export const FETCH_ERROR = "FETCH_ERROR";
export const ALL_VIDEOGAMES = "ALL_VIDEOGAMES";
export const ALL_GENRES = "ALL_GENRES";
export const GET_BY_NAME = "GET_BY_NAME";

export const getAllVideogames = () => {
    return async function(dispatch){
        try{
            const {data} = await axios.get('http://localhost:3001/api/videogames/')
            return dispatch ({
                type: ALL_VIDEOGAMES,
                payload: data
            })
        }
        catch(error){
            return dispatch({
                type: FETCH_ERROR,
                payload: error.message
            })
        }
    }
}

export const getAllGenres = () => {
    return async function(dispatch){
        try{
            const {data} = await axios.get('http://localhost:3001//api/genres')
            return dispatch ({
                type: ALL_GENRES,
                payload: data
            })
        }
        catch(error){
            return dispatch({
                type: FETCH_ERROR,
                payload: error.message
            })
        }
    }
}

export const getByName = (name) => {
    return async function(dispatch){
        try{
            const {data} = await axios.get(`http://localhost:3001/api/videogames/videogame/name/?name=${name}`)
            return dispatch({
                type: GET_BY_NAME,
                payload: data
            })
        }
        catch(error){
            return dispatch({
                type: FETCH_ERROR,
                payload: error.message
            })
        }
    }
}