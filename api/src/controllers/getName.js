const axios = require('axios')
const {API_KEY} = process.env;
const {Videogames, Genres} = require("../db");
const { Op } = require('sequelize');

const getName = async (name) => {
    try {
        const videogameFromApi = await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
        const { results } = videogameFromApi.data;

        //Debido a que en la busqueda me aparecen todos excepto el creado por mi, dividi en busqueda exacta para luego concatenar primero las exactas y luego el resto para completar las 15 por busqueda
        //Con el filter lo que hago es que busque exactamente lo que ingreso y luego buscara los titulos que contengan lo que escribo en el input
        const exactApiResults = results.filter(result => result.name.toLowerCase() === name.toLowerCase()).map(res => ({ 
            id: res.id,
            name: res.name,
            rating: res.rating,
            image: res.background_image,
            genres: res.genres.map((genre) => genre.name)
        }))

        //Aqui hago que aparezca el nombre aunque no sea exactamente igual 
        const restApiResults = results.filter(result => result.name.toLowerCase() !== name.toLowerCase()).map(res => ({
            id: res.id,
            name: res.name,
            rating: res.rating,
            image: res.background_image,
            genres: res.genres.map((genre) => genre.name)
        }))

        const videogameFromDB = await Videogames.findAll({
            where: { name: { [Op.iLike] : `%${name}%`} }, // Esta linea hace que buque valores que coincidan con lo que busque, sin importar mayuscula y minuscula y el name encerrado quiere decir que buscar cualquier carta que contenga 'name'
            include: {
                model: Genres,
                through: 'videogames_genres'
            },
        });

        //Aca hago lo mismo que hago en el llamado a la api pero con la base de datos
        const exactDBResults = videogameFromDB.filter(game => game.name.toLowerCase() === name.toLowerCase()).map(game => ({
            id: game.id,
            name: game.name,
            rating: game.rating,
            image: game.image,
            genres: game.genres.map(genre => genre.name)
        }));

        const restDBResults = videogameFromDB.filter(game => game.name.toLowerCase() !== name.toLowerCase()).map(game => ({
            id: game.id,
            name: game.name,
            rating: game.rating,
            image: game.image,
            genres: game.genres.map(genre => genre.name)
        }));

        const allResults = [...exactApiResults, ...exactDBResults, ...restApiResults , ...restDBResults] //Aqui hago que figueren primero las busquedas exactas y luego el resto de titulos similares
        const fifteenByName = allResults.slice(0, 15); // Corto la busqueda a 15

        if(fifteenByName.length === 0){
            throw new Error("Videogame not found")
        }

        return fifteenByName;
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