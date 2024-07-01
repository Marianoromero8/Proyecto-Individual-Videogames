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

  const[errors, setErrors] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
  })

  const [details, setDetails] = useState({
    name: "",
    image:
      "https://st.depositphotos.com/1041273/3878/v/450/depositphotos_38783569-stock-illustration-video-game-icon.jpg",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
  });

  useEffect(() => {
    setErrors(validations(details))
  }, [details])

  const videogamesPlatforms = [
    "PC",
    "PlayStation5",
    "PlayStation4",
    "Xbox One",
    "Xbox 360",
    "Nintendo Switch",
    "Android",
  ];

  const handleFormChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value, 
    });
  };

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setDetails({
        ...details,
        platforms: [...details.platforms, e.target.name], //cambio su valor cada vez que toca la checkbox, luego solo me traigo los true al crear el videogame
      });
    } else {
      setDetails({
        ...details,
        platforms: details.platforms?.filter((platform) => platform !== e.target.name), //cambio su valor cada vez que toca la checkbox, luego solo me traigo los true al crear el videogame
      });
    }
  };

  const handleGenres = (e) => {
    e.preventDefault();
    const genre = e.target.value;
    if (!details.genres.includes(genre)) {
      setDetails({
        ...details,
        genres: [...details.genres, genre],
      });
    }
  };

  const handleCreateVideogame = async (e) => {
    e.preventDefault();
    try {
      dispatch(createVideogame(details));
      setDetails({
        name: "",
        image:
          "https://st.depositphotos.com/1041273/3878/v/450/depositphotos_38783569-stock-illustration-video-game-icon.jpg",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        genres: [],
      });
      alert ("Videogame Created Succesfully")
    } catch (error) {
      alert("Missing data, name, description, rating (min 0 max 5), platforms and genres are required");
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
          <input type="text" name="name" autoComplete="off" value={details.name} onChange={(e) => {return handleFormChange(e)}} />
          {errors.name && <p className={style.errors}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="description" className={style.label}>Description</label>
          <input type="text" name="description" autoComplete="off" value={details.description} onChange={(e) => handleFormChange(e)} required />
          {errors.description && <p className={style.errors}>{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="released" className={style.label}>Released date</label>
          <input type="date" name="released" autoComplete="off" value={details.released} onChange={(e) => handleFormChange(e)} />
          {errors.released && <p className={style.errors}>{errors.released}</p>}
        </div>

        <div>
          <label htmlFor="rating" className={style.label}>Rating</label>
          <input type="number" name="rating" autoComplete="off" value={details.rating} onChange={(e) => handleFormChange(e)}/>
          {errors.rating && <p className={style.errors}>{errors.rating}</p>}

        </div>

        <div>
          <label htmlFor="platforms" className={style.label}>Platforms</label>
          <div>
            {videogamesPlatforms.map((platform) => (
              <label htmlFor="accept" key={platform}>
                <input type="checkbox" name={platform} value={details.platforms} onChange={(e) => handleCheckbox(e)} />
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