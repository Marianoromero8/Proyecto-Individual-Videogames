const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const{Videogames, Genres} = require('../db')

const getVideogames = async (req, res) => {
    try{
        let allResults = []; //Hago esta variable let para ir guardando los llamados a la API, ya que hago 5 llamados
        let page = 1; //Esta variable es para arrancar en la pagina 1 dentro de la url (contador)

        while(page <= 5){ //si page es menor o igual que 5 entro al while. Hay mas paginas pero limite hasta 5
        const response = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`) //Hago una peticion a la api pasando el numero de pagina ademas de la API_KEY
        const {results, next} = response.data; //Obtengo results (datos del videjuego que luego mostrare en la carta) y next(proxima pagina)

        const resultGet =  results.map((videogame) => { // creo array con la info que necesito de la api
            const image = videogame.background_image;
            const rating = videogame.rating;
            const genres = videogame.genres.map(genre => genre.name).join(', ')

            return({
                id: videogame.id,
                name: videogame.name,
                image,
                rating,
                genres
            })
        })

        allResults = [...allResults, ...resultGet] //concateno en el array creado fuera el llamado de cada page

        if(next){ //Si dentro de la propiedad next hay otra pagina, entonces hago page ++ y asi paso a la pagina siguiente hasta 5
           page++;
        }

    }

    return allResults
    }
    catch(error){
        throw new Error(error.message)
    }
}

const getVideogamesFromDB = async (req, res) => { // Funcion donde llamo los juegos de la DB
    try{
        const vg = await Videogames.findAll({ // Obtengo los videogames con sus generos
            include: {
                model: Genres,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        return vg.map(game => ({ //Retorno un array mapeando cada videojuego
            id: game.id,
            name: game.name,
            image: game.image,
            rating: game.rating,
            genres: game.genres.map(gen => gen.name).join(', ')
        }))
    }
    catch(error){
        return({error: error.message})
    }
}

const allVideogames = async (req, res) => { // Esta funcion es la que luego uso para el llamado de los videogames en la ruta donde llamo a los juegos de la api y DB
    try{
        const apiVideogames = await getVideogames(); //Llamo a la funcion que hace la solicitud a la API
        const dbVideogames = await getVideogamesFromDB(); //Llamo a la funcion que hace la solicitud a la DB

        const callVideogames = [...apiVideogames, ...dbVideogames] //Concateno ambos llamados(api y DB) en una variable para luego enviarla como respuesta JSON
        res.status(200).json(callVideogames)
    }
    catch(error){
        res.status(400).json({error: "No hay nada para llamar"})
    }
}

module.exports = { allVideogames };