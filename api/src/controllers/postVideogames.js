const {Videogames, Genres} = require('../db');
const { Op } = require('sequelize');

const postVideogames = async (req, res) => {
    const {name, description, platforms, released, rating, genres} = req.body;

    if(!name || !description || platforms.length === 0 || !released || rating < 0 || rating > 5 || genres.length === 0){
       return res.statu(400).json({message: 'Check fields, something is wrong'})
    }

    try{
              // Creemos el videogame:
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
              console.error('Error creating videogame:', error);
              res.status(500).send({message: "Something wrong with the new Videogame"});
            }
          };

// const postVideogames = async (req, res) => {
//     try {
//       let { name, description, released, rating, platforms, image, genres } = req.body;
//       if (!name || !description || platforms.length === 0 || genres.length === 0 || !rating || rating < 0 || rating > 5)
//         throw new Error("Check data: name, description, rating(0-5), platforms and genres are required");
//       // Creemos el videogame:
//       const newVideogame = await Videogames.create({
//         name,
//         description,
//         released,
//         rating,
//         platforms,
//         image,
//       });
//       // Ya tengo todos los genres en mi DB al usar getGenres() ESTO SE EJECUTO SOLO MAS ARRIBA,
//       //  ahora solo falta buscar el genre que me pasan por body y vincularlo con el videogame,
//       //  recordemos que "getGenres()" devuelve un array:
//       // Busco los genres que me pasaron, en mi DB de genres y los genres válidos los guardo en videogameGenres
//       const videogameGenres = await Genres.findAll({
//         where: { id: { [Op.in]: genres }},
//       });
//       // Recorro los genres válidos y se los agrego al newVideogame
//         newVideogame.addGenres(videogameGenres);
      
//       //newVideogame.addGenre(videogameGenres); //metodo add de sequelize
//       //res.status(201).send("Videogame created successfully");
  
//       res.status(201).json(newVideogame);
//     } catch (error) {
//       res.status(404).send(error.message);
//     }
//   };

module.exports = { postVideogames };