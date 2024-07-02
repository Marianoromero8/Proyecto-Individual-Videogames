const axios = require('axios');
const { Genres } = require('../db');
const {API_KEY} = process.env;


const getGenres = async (req, res) => {
    try{
        //Obtener generos de la base de datos
        let genresDB = await Genres.findAll();

        if(genresDB.length == 0){ //Compruebo si hay genres en la DB, si no hay nada dentro de la DB entro al if y hago el llamado a la API
        const response = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`); //Llamado a la API

        const {results} = response.data;

        const genresToDB = results.map(genre => ({ //Mapeo la info de la api para crear un array con objetos que contienen las propiedades id y name
            id: genre.id,
            name: genre.name
        }))

        genresDB = await Genres.bulkCreate(genresToDB) //Aqui inserto los generos mapeados en la DB. 

    } 
        res.status(200).json(genresDB)

    }
    catch(error){
        res.status(400).json({message: "Something happen with genres"})
    }
}


module.exports = { getGenres };