const router = require('express').Router();
const { allVideogames } = require('../controllers/getVideogames');
const { getDetail } = require('../controllers/getId');
const { getByName } = require('../controllers/getName');
const { postVideogames } = require('../controllers/postVideogames')

router.get("/", allVideogames) //Traemos toda la info (que seleccionamos) de los videogames
router.get("/:id", getDetail) //Hacemos traer info por ID (para el details)
router.get("/videogame/:name", getByName) //Hacemos la ruta con la funcion para buscar por nombre
router.post("/post", postVideogames) //La ruta con la funcion para crear una carta nueva

module.exports = router;