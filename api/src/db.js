require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const VideogameModel = require("./models/Videogame")
const GenreModel = require("./models/Genres")

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

sequelize.authenticate()
  .then(() => console.log('Conexión exitosa a Neon'))
  .catch((error) => console.error('Error al conectar con Neon:', error));

sequelize.sync({ alter: true })
  .then(() => console.log('Modelos sincronizados'))
  .catch((error) => console.error('Error sincronizando modelos:', error));


const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

VideogameModel(sequelize);
GenreModel(sequelize);

//Gurdamos en constantes los modelos
const Videogames = sequelize.models.videogames;
const Genres = sequelize.models.genres;

// En sequelize.models están todos los modelos importados como propiedades
// Hacemos la relacion de varios a varios (belongToMany)
Videogames.belongsToMany(Genres, {through:"videogames_genres"})
Genres.belongsToMany(Videogames, {through:"videogames_genres"})

module.exports = {
  Videogames, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  Genres,
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
