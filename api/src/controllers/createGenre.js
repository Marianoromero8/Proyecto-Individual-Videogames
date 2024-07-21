const { Genres } = require ('../db');

const createGenre = async (req, res) => {
  const {name} = req.body;
  try{
    const newGenre = await Genres.create({
        name
    })

    const response = {
        id: newGenre.id,
        name: newGenre.name
    }

    res.status(201).json(response)
  }
  catch(error){
    res.status(500).json({error: error.message})
  }
}

module.exports = { createGenre }
