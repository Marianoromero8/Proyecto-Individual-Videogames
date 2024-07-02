import React, { useEffect, useState } from "react";
import { createVideogame, getAllGenres } from "../../redux/actions";
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import style from './Form.module.css';
import validations from "./validations";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const allGenres = useSelector(state => state.genres);

  const handleRefresh = () => {
    window.location.reload()
  }

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  const[errors, setErrors] = useState({ //Almaceno los errores de la validacion del formulario
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
  })

  const [details, setDetails] = useState({ //Detalles del videgame que se esta ingresando en el form
    name: "",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuIgqTtIwHMemY0SbKCDuc0ElKssTJVfpDrg&s",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
  });

  useEffect(() => {
    setErrors(validations(details))
  }, [details])

  const videogamesPlatforms = [ //plataformas de videojuegos 
    "PC",
    "PlayStation5",
    "PlayStation4",
    "Xbox One",
    "Xbox 360",
    "Nintendo Switch",
    "Android",
  ];

  const handleFormChange = (e) => { //Actualiza el estado details cuando se cambian los valores de los campos del form
    setDetails({
      ...details,
      [e.target.name]: e.target.value, 
    });
  };

  const handleCheckbox = (e) => { //Maneja los cambios de las casillas de las plataformas
    if (e.target.checked) {
      setDetails({
        ...details,
        platforms: [...details.platforms, e.target.name], 
      });
    } else {
      setDetails({
        ...details,
        platforms: details.platforms?.filter((platform) => platform !== e.target.name), 
      });
    }
  };

  const handleGenres = (e) => { //Manejo de seleccion de genres 
    e.preventDefault();
    const genre = e.target.value;
    if (!details.genres.includes(genre)) {
      setDetails({
        ...details,
        genres: [...details.genres, genre],
      });
    }
  };

  const handleCreateVideogame = async (e) => { //Maneja la creacion de un nuevo videogame cuando se envia el form
    e.preventDefault();
    if (Object.values(errors).some(error => error !== "")) { //los valores del obj errors se convierten en un arreglo, contienen mensajes de error o vacios si no los hay
      alert("Please fill out all required fields.");
      return;
    }
    try {
      dispatch(createVideogame(details));
      setDetails({
        name: "",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuIgqTtIwHMemY0SbKCDuc0ElKssTJVfpDrg&s",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        genres: [],
      });
      alert ("Videogame Created Succesfully")
    } catch (error) {
      alert("Error! Try again");
    }
  };

  const handleRemoveGenre = (e) => {
    e.preventDefault();
    const genreToRemove = e.target.name;
    setDetails({
      ...details,
      genres: details.genres.filter((genre) => genre !== genreToRemove),
    });
  };

  return (
    <div className={style.container}>
      <Link to="/home" onClick={handleRefresh}>
        <button onClick={() => {navigate('/home')}} className={style.button}>Go back</button>
      </Link>

      <h1>Create videogame</h1>

      <form onSubmit={(e) => handleCreateVideogame(e)} className={style.form}>
        <div>
          <label htmlFor="name" className={style.label}>Name</label>
          <input type="text" name="name" autoComplete="off" value={details.name} onChange={(e) => {return handleFormChange(e)}} className={style.input}/>
          {errors.name && <p className={style.errors}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="description" className={style.label}>Description</label>
          <input type="text" name="description" autoComplete="off" value={details.description} onChange={(e) => handleFormChange(e)} className={style.input} required />
          {errors.description && <p className={style.errors}>{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="released" className={style.label}>Released date</label>
          <input type="date" name="released" autoComplete="off" value={details.released} onChange={(e) => handleFormChange(e)} className={style.input}/>
          {errors.released && <p className={style.errors}>{errors.released}</p>}
        </div>

        <div>
          <label htmlFor="rating" className={style.label}>Rating</label>
          <input type="number" name="rating" autoComplete="off" value={details.rating} onChange={(e) => handleFormChange(e)} className={style.input}/>
          {errors.rating && <p className={style.errors}>{errors.rating}</p>}

        </div>

        <div>
          <label htmlFor="platforms" className={style.label}>Platforms</label>
          <div>
            {videogamesPlatforms.map((platform) => (
              <label htmlFor="accept" key={platform}>
                <input type="checkbox" name={platform} value={details.platforms} onChange={(e) => handleCheckbox(e)} className={style.input}/>
                {platform}
              </label>
            ))}
          {errors.platforms && <p className={style.errors}>{errors.platforms}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="genres" className={style.label}>Genres</label>
          <select onChange={(e) => handleGenres(e)} value={details.genres}>
            <option disabled>Genres</option>
            {allGenres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
            {errors.genres && <p className={style.errors}>{errors.genres}</p>}
          <ul>
            {details.genres?.map((genre, i) => (
              <li key={i}>
                <button name={genre} onClick={(e) => handleRemoveGenre(e)}>
                  {genre}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className={style.button}>Create</button>
      </form>
    </div>
  )
}

export default Form;