const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const{Videogames, Genres} = require('../db')

const getVideogames = async (req, res) => {
    try{
        let allResults = [];
        let page = 1;

        while(page <= 5){
        const response = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`)
        const {results, next} = response.data;

        const resultGet =  results.map((videogame) => {
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

        allResults = [...allResults, ...resultGet]

        if(next){
           page++;
        }

    }

    return allResults
    }
    catch(error){
        throw new Error(error.message)
    }
}

const getVideogamesFromDB = async (req, res) => {
    try{
        const vg = await Videogames.findAll({
            include: {
                model: Genres,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        return vg.map(game => ({
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

const allVideogames = async (req, res) => {
    try{
        const apiVideogames = await getVideogames();
        const dbVideogames = await getVideogamesFromDB();

        const callVideogames = [...apiVideogames, ...dbVideogames]
        res.status(200).json(callVideogames)
    }
    catch(error){
        res.status(400).json({error: "No hay nada para llamar"})
    }
}

module.exports = { allVideogames };