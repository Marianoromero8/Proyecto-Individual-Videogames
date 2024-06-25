import {ALL_VIDEOGAMES, ALL_GENRES, FETCH_ERROR, GET_BY_NAME} from './actions'

const initialState = {
    inmutableVideogames: [],
    videogames: [],
    genres: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ALL_VIDEOGAMES:
        return{
            ...state,
            videogames: action.payload,
            inmutableVideogames: action.payload
            }
        case ALL_GENRES:
        return{
            ...state,
            genres: action.payload
        }
        case GET_BY_NAME:
        return{
            ...state,
            videogames: action.payload
        }
        case FETCH_ERROR:
            return{
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default reducer;