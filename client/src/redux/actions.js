import axios from 'axios';
export const FETCH_ERROR = "FETCH_ERROR";
export const ALL_VIDEOGAMES = "ALL_VIDEOGAMES";
export const ALL_GENRES = "ALL_GENRES";
export const GET_BY_NAME = "GET_BY_NAME";
export const FILTER_GENRES = "FILTER_GENRES";
export const ORDER_AZ = "ORDER_AZ";
export const ORDER_ZA = "ORDER_ZA";
export const ORDER_RATINGASC = "ORDER_RATINGASC";
export const ORDER_RATINGDESC = "ORDER_RATINGDESC";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const VIDEOGAME_DETAIL = "VIDEOGAME_DETAIL";



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
            const {data} = await axios.get('http://localhost:3001/api/genres/')
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

export const createVideogame = (payload) => {
    return async function(dispatch){
        try{
            const create = await axios.post('http://localhost:3001/api/videogames/post', payload)
            dispatch({
                type: CREATE_VIDEOGAME,
                payload: create.data
            })
            return create
        }
        catch(error){
            dispatch({
                type: FETCH_ERROR,
                payload: error.response.data
            })
            throw error;
        }
    }
}

export const videogameDetail = (id) => {
    return async function(dispatch){
        try{
            const {data} = await axios.get(`http://localhost:3001/api/videogames/${id}`)
            return dispatch({
                type: VIDEOGAME_DETAIL,
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

export const filterGenres = (filter) => {
    return{
        type: FILTER_GENRES,
        payload: filter
    }
}

export const orderAZ = () => {
    return{
        type: ORDER_AZ
    }
}

export const orderZA = () => {
    return{
        type: ORDER_ZA
    }
}

export const orderAsc = () => {
    return{
        type: ORDER_RATINGASC
    }
}

export const orderDesc = () => {
    return{
        type: ORDER_RATINGDESC
    }
}