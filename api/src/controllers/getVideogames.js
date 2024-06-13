const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const{Videogames, Genres} = require('../db')

const getVideogames = async (req, res) => {
    try{
        const response = await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)

        const {results} = response.data;

        return results.map((videogame) => {
            const image = videogame.background_image;
            const description = videogame.reviews_text_count;
            const platforms = videogame.platforms;
            const released = videogame.released;
            const rating = videogame.rating;

            return({
                id: videogame.id,
                name: videogame.name,
                image,
                description,
                platforms,
                released,
                rating
            })
        })
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
            return(vg)
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