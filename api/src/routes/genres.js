const router = require('express').Router();
const { getGenres } = require('../controllers/getGenres')

router.get("/", getGenres)

module.exports = router;