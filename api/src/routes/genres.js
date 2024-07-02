const router = require('express').Router();
const { getGenres } = require('../controllers/getGenres')

//En esta ruta obtenemos todos los genres que hay en la app
router.get("/", getGenres)

module.exports = router;