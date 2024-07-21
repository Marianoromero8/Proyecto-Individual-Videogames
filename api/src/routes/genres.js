const router = require('express').Router();
const { getGenres } = require('../controllers/getGenres')
const { createGenre } = require('../controllers/createGenre')
//En esta ruta obtenemos todos los genres que hay en la app

router.get("/", getGenres)
router.post("/create", createGenre)

module.exports = router;