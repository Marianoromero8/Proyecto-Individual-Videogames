const axios = require('axios')
const {API_KEY} = process.env;
const {Videogames, Genres} = require('../db')

const getId = async (id) => {
    try{
    //creo una constante donde guardo la verificacion del ID del videojuego en la DB para ver si es de tipo UUID
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

    if(isUUID){ //Si el id es de tipo UUID buscamos en la base de datos, ya que los ID de los creados son asi.
    const gameFromDB = await Videogames.findByPk(id, { //Buscamos en la base de dato por su clave primaria y a sus generos 
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
            description: gameFromDB.description.replace(/<\/?[^>]+(>|$)/g, ""), //En este caso hice el replace ya que en la description me aparecian etiquetas HTML
            released: gameFromDB.released,
            rating: gameFromDB.rating,
            genres: gameFromDB.genres.map(genre => genre.name).join(', ') //Aqui hago una cadena de texto con el array de los genres, separados por una coma ','
        }
    }
    }else{  //Si no esta en DB buscan en la API
    const videogameIdApi = await axios (`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const {data} = videogameIdApi;

    return { //retornamos lo mismo que en la DB
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
        const videogame = await getId(id); //Guardamos en una constante la obtencion de los detalles del videojuego para luego pasar en formato JSON

        return res.status(200).json(videogame); 
    }
    catch(error){
        res.status(400).send('Videogame Detail Not Found')
    }
}

module.exports = { getDetail };