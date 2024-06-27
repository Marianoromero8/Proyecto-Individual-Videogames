const axios = require('axios')
const {API_KEY} = process.env;
const {Videogames, Genres} = require("../db")

// const getName = async (name) => {
//     try{
//         const videogameFromApi = await axios (`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)

//         const {results} = videogameFromApi.data;
        
//         if(results && results.length > 0){
//         const result = results.find(game => game.name.toLowerCase() === name.toLowerCase());

//         if(result){
//         return {
//             id: result.id,
//             name: result.name,
//             image: result.background_image,
//             genres: result.genres.map((genre) => genre.name)
//         }
//     };
// }
        
//         const videogameFromDB = await Videogames.findAll({
//             where: { name },
//             include: {
//                 model: Genres,
//                 through: 'videogames_genres'
//             }
//         });

//         if(videogameFromDB && videogameFromDB.length > 0){
//             return videogameFromDB
//         } else{
//             throw new Error('We can not found a videogame')
//         }
//     }
//     catch(error){
//         throw new Error("VideoGame by Name not Found")
//     }
// }

// const getByName = async (req, res) => {
//     const { name } = req.query;

//     try{
//         const videogameName = await getName(name);

//         res.status(200).json(videogameName);
//     }
//     catch(error){
//         res.status(400).json({error: "Something is wrong, check the name of the videogame"})
//     }
// }
const getName = async (name) => {
    try {
        const videogameFromApi = await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
        const { results } = videogameFromApi.data;

        const apiResults = results && results.length > 0 ? results.map(result => ({
            id: result.id,
            name: result.name,
            rating: result.rating,
            image: result.background_image,
            genres: result.genres.map((genre) => genre.name)
        })) : [];

        const videogameFromDB = await Videogames.findAll({
            where: { name },
            include: {
                model: Genres,
                through: 'videogames_genres'
            }
        });

        const dbResults = videogameFromDB && videogameFromDB.length > 0 ? videogameFromDB.map(game => ({
            id: game.id,
            name: game.name,
            rating: game.rating,
            image: game.image,
            genres: game.genres.map(genre => genre.name)
        })) : [];

        return [...apiResults, ...dbResults];
    } catch (error) {
        throw new Error("VideoGame by Name not Found");
    }
};

const getByName = async (req, res) => {
    const { name } = req.query;

    try {
        const videogameName = await getName(name);
        res.status(200).json(videogameName);
    } catch (error) {
        res.status(400).json({ error: "Something is wrong, check the name of the videogame" });
    }
};

module.exports = { getByName };