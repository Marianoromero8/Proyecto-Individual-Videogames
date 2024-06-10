const router = require('express').Router();
const { getVideogames } = require('../controllers/getVideogames');
const { getId } = require('../controllers/getId');
const { getName } = require('../controllers/getName');
const { postVideogames } = require('../controllers/postVideogames')

router.get("/", getVideogames)
router.get("/:id", getId)
router.get("/videogame/:name", getName)
router.post("/post", postVideogames)

module.exports = router;