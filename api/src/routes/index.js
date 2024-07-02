const router = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeVideogames = require('./videogames');
const routeGenres = require('./genres');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Configuramos las rutas, una la de videogames(id, name, videogames y post) y otra la de genres
router.use("/videogames", routeVideogames)
router.use("/genres", routeGenres)


module.exports = router;
