const axios = require('axios');
const { Genres } = require('../db');
const {API_KEY} = process.env;


const getGenres = async (req, res) => {
    try{
        //Obtener generos de la base de datos
        let genresDB = await Genres.findAll();

        if(genresDB.length == 0){
        const response = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);

        const {results} = response.data;

        const genresToDB = results.map(genre => ({
            id: genre.id,
            name: genre.name
        }))

        genresDB = await Genres.bulkCreate(genresToDB)

    } 
        res.status(200).json(genresDB)

    }
    catch(error){
        res.status(400).json({message: "Something happen with genres"})
    }
}


module.exports = { getGenres };