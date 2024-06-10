const router = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeVideogames = require('./videogames');
const routeGenres = require('./genres');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", routeVideogames)
router.use("/genres", routeGenres)


module.exports = router;
