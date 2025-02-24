import {ALL_VIDEOGAMES, ALL_GENRES, FETCH_ERROR, GET_BY_NAME, FILTER_GENRES, ORDER_AZ, ORDER_ZA, ORDER_RATINGASC, ORDER_RATINGDESC, CREATE_VIDEOGAME,VIDEOGAME_DETAIL, FILTER_ORIGIN} from './actions'

const initialState = {
    inmutableVideogames: [],
    videogames: [],
    genres: [],
    videogameDetail: []
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
        case VIDEOGAME_DETAIL:
            return{
                ...state,
                videogameDetail: action.payload
            }
        case GET_BY_NAME:
        return{
            ...state,
            videogames: action.payload,
            error: null
        }
        case CREATE_VIDEOGAME:
        return{
            ...state,
            videogames: [...state.videogames, action.payload]
        }
        case FILTER_GENRES:
            if(action.payload === "All Genres"){
                return{
                    ...state,
                    videogames: [...state.inmutableVideogames]
                }
            }
            const filtGenres = state.inmutableVideogames.filter(gen => {
                const lowerCasePayload = action.payload.toLowerCase();

    if (Array.isArray(gen.genres)) {
        return gen.genres.some(g => g.toLowerCase() === lowerCasePayload);
    } 
    
    if (typeof gen.genres === 'string') {
        const genresArray = gen.genres.split(', ').map(g => g.trim().toLowerCase());
        return genresArray.includes(lowerCasePayload);
    }

    return false;
            });
            return{
                ...state,
                videogames: filtGenres
            }
        case FILTER_ORIGIN:    
            let filtOrigin
            if(action.payload === "API"){
                filtOrigin =  state.inmutableVideogames.filter(vg => typeof vg.id === "number")
            } else if (action.payload === "DB"){
                filtOrigin =  state.inmutableVideogames.filter(vg => typeof vg.id === "string")
            } else{
                filtOrigin = state.inmutableVideogames
            }
            return {
                ...state,
                videogames: filtOrigin 
            }
        case ORDER_AZ:
            const orderAZ = [...state.videogames].sort((a, b) => a.name.localeCompare(b.name))
            return{
                ...state,
                videogames: orderAZ
            }
        case ORDER_ZA:
            const orderZA = [...state.videogames].sort((a, b) => b.name.localeCompare(a.name))
            return{
                ...state,
                videogames: orderZA
            }
        case ORDER_RATINGASC:
            const orderAsc = [...state.videogames].sort((a, b) => {
                return a.rating - b.rating
            })
            return{
                ...state,
                videogames: orderAsc
            }
        case ORDER_RATINGDESC:
            const orderDesc= [...state.videogames].sort((a, b) => {
                return b.rating - a.rating
            })
            return{
                ...state,
                videogames: orderDesc
            }
        case FETCH_ERROR:
            return{
                ...state,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;