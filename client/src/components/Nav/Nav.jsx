import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import {useNavigate} from 'react-router-dom';
import style from './Nav.module.css'

const Nav = ({onSearch}) => {
    const navigate = useNavigate();

    const handleRefresh = () => {
        window.location.reload()
    }

    return(
        <div className={style.container}>
            <button onClick={handleRefresh} className={style.button}>Refresh</button>
            <SearchBar onSearch={onSearch}/>
            <button onClick={() => {navigate('/post')}} className={style.button}>Add new Video Game</button>
        </div>
    )
}

export default Nav;