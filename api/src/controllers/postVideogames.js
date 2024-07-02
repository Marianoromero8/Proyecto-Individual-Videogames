const {Videogames, Genres} = require('../db');
const { Op } = require('sequelize');

const postVideogames = async (req, res) => {
    const {name, description, platforms, image, released, rating, genres} = req.body; 

    if(!name || !description || platforms.length === 0 || !released || rating < 0 || rating > 5 || genres.length === 0){
       return res.statu(400).json({message: 'Check fields, something is wrong'})
    }
    try{
        const newVideogame = await Videogames.create({ // Creamos el videogame con los datos que estan abajo
          name,
          description,
          released,
          rating,
          platforms,
          image
        });
              
        const videogameGenres = await Genres.findAll({// Busco los genres en la DB que coincida con el 'name' de los genres 
            where: { name: { [Op.in]: genres }},
        });

        await newVideogame.addGenres(videogameGenres);  // Asocio el genero que encuentro al videogame
        await newVideogame.reload({ include: Genres }); //Recargo el videogame nuevo para incluir los generos en la respuesta

        const response = { //Objeto response con los detalles del videojuego
          id: newVideogame.id,
          name: newVideogame.name,
          description: newVideogame.description,
          platforms: newVideogame.platforms,
          image: newVideogame.image,
          released: newVideogame.released,
          rating: newVideogame.rating,
          genres: videogameGenres.map(genre => genre.name).join(', ') //mapeo ya que me aparecian caracteristicas del los genres que no necesitaba, ya que solo necesito el name
        };
        res.status(201).json(response);
      } catch (error) {
          res.status(500).send({message: "Something wrong with the new Videogame"});
        }
};

module.exports = { postVideogames };