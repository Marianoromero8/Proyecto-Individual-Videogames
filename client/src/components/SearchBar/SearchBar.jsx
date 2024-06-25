import React, { useState } from 'react';
import style from './SearchBar.module.css';

const SearchBar = ({onSearch}) => {
    const [state, setState] = useState("");

  const handleChange = (event) => {
    const {value} = event.target

    setState(value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    onSearch(state) 

    setState("")
  }
    return(
      <>
        <form onSubmit={handleClick}>
            <input value={state} placeholder='Videogame' onChange={handleChange} className={style.input}/>
            <button type='submit' className={style.button}>Search</button>
        </form>
      </>
    )
}

export default SearchBar;