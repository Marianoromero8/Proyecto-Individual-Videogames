const axios = require('axios')
const {API_KEY} = process.env;

const getId = async (id) => {
    try{
    const videogameIdApi = await axios (`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

    const {data} = videogameIdApi;

    const dataById = {
        id: data.id,
        name: data.name,
        image: data.background_image,
        platform: data.platforms.map(plat => plat.platform.name),
        description: data.reddit_description,
        released: data.released,
        rating: data.rating,
        genres: data.genres.map(genre => genre.name)
    }

    return dataById;
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
        if(error.message){
            return res.status(400).send('Videogame Not Found')
        }
        res.status(error.statusCode || 500).json(`error interno - ${error.message}`)
    }
}

module.exports = { getDetail };