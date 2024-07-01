const {Videogames, Genres} = require('../db');
const { Op } = require('sequelize');

const postVideogames = async (req, res) => {
    const {name, description, platforms, released, rating, genres} = req.body;

    if(!name || !description || platforms.length === 0 || !released || rating < 0 || rating > 5 || genres.length === 0){
       return res.statu(400).json({message: 'Check fields, something is wrong'})
    }
    try{
      // Creamos el videogame:
        const newVideogame = await Videogames.create({
          name,
          description,
          released,
          rating,
          platforms,
        });
              
      // Busco los genres que me pasaron, en mi DB de genres y los genres válidos los guardo en videogameGenres
        const videogameGenres = await Genres.findAll({
            where: { name: { [Op.in]: genres }},
        });

      // Añado genero al videojuego nuevo
        await newVideogame.addGenres(videogameGenres);
        await newVideogame.reload({ include: Genres });

        const response = {
          id: newVideogame.id,
          name: newVideogame.name,
          description: newVideogame.description,
          platforms: newVideogame.platforms,
          image: newVideogame.image,
          released: newVideogame.released,
          rating: newVideogame.rating,
          genres: videogameGenres.map(genre => genre.name).join(', ')
        };
        res.status(201).json(response);
      } catch (error) {
          res.status(500).send({message: "Something wrong with the new Videogame"});
        }
};

module.exports = { postVideogames };