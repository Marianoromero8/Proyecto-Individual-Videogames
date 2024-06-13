const router = require('express').Router();
const { allVideogames } = require('../controllers/getVideogames');
const { getId } = require('../controllers/getId');
const { getName } = require('../controllers/getName');
const { postVideogames } = require('../controllers/postVideogames')

router.get("/", allVideogames)
router.get("/:id", getId)
router.get("/videogame/:name", getName)
router.post("/post", postVideogames)

module.exports = router;