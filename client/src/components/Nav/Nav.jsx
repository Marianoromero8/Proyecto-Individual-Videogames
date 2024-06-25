import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import {useNavigate} from 'react-router-dom';

const Nav = ({onSearch}) => {
    const navigate = useNavigate()
    return(
        <div>
            <SearchBar onSearch={onSearch}/>
            <button onClick={() => {navigate('/form')}}>Add new Video Game</button>
        </div>
    )
}

export default Nav;