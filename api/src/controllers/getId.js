const axios = require('axios')
const {API_KEY} = process.env;
const {Videogames, Genres} = require('../db')

const getId = async (id) => {
    try{
    //creo una constante donde guardo la verificacion del ID del videojuego en la DB
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

    //Primero buscamos en la base de datos  
    if(isUUID){
    const gameFromDB = await Videogames.findByPk(id, {
        include: {
            model: Genres,
            through: 'videogames_genres'
        }
    })

    if(gameFromDB){
        return {
            id: gameFromDB.id,
            name: gameFromDB.name,
            image: gameFromDB.image,
            platform: gameFromDB.platforms.join(', '),
            description: gameFromDB.description.replace(/<\/?[^>]+(>|$)/g, ""),
            released: gameFromDB.released,
            rating: gameFromDB.rating,
            genres: gameFromDB.genres.map(genre => genre.name).join(', ')
        }
    }
    }else{  //Si no esta en DB buscan en la API
    const videogameIdApi = await axios (`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const {data} = videogameIdApi;

    return {
        id: data.id,
        name: data.name,
        image: data.background_image,
        platform: data.platforms.map(plat => plat.platform.name).join(', '),
        description: data.description.replace(/<\/?[^>]+(>|$)/g, ""),
        released: data.released,
        rating: data.rating,
        genres: data.genres.map(genre => genre.name).join(', ')
    }
    }
    }
    catch(error){
        throw new Error('Details Not Found')
    }
}

const getDetail = async (req, res) => {
    const {id} = req.params;
    try{
        const videogame = await getId(id);

        return res.status(200).json(videogame);
    }
    catch(error){
        res.status(400).send('Videogame Detail Not Found')
    }
}

module.exports = { getDetail };