import {ALL_VIDEOGAMES, ALL_GENRES, FETCH_ERROR, GET_BY_NAME, FILTER_GENRES, ORDER_AZ, ORDER_ZA, ORDER_RATINGASC, ORDER_RATINGDESC, CREATE_VIDEOGAME,VIDEOGAME_DETAIL} from './actions'

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
            videogames: action.payload
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
                if (Array.isArray(gen.genres)) {
                    const lowerCasePayload = action.payload.toLowerCase();
                    return gen.genres.some(g => g.toLowerCase() === lowerCasePayload);
                } else if (typeof gen.genres === 'string') {
                    const genresArray = gen.genres.split(', ').map(g => g.trim().toLowerCase());
                    return genresArray.includes(action.payload.toLowerCase());
                }
                return false;
            });
            // const videogamesByGenres = state.inmutableVideogames.filter((videogame) => videogame.genres.includes(action.payload));
            return{
                ...state,
                videogames: filtGenres
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
                error: action.payload
            }
        default:
            return state;
    }
}

export default reducer;