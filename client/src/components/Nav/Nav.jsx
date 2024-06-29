import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import {useNavigate} from 'react-router-dom';

const Nav = ({onSearch}) => {
    const navigate = useNavigate();

    const handleRefresh = () => {
        window.location.reload()
    }

    return(
        <div>
            <button onClick={handleRefresh}>Refresh</button>
            <SearchBar onSearch={onSearch}/>
            <button onClick={() => {navigate('/post')}}>Add new Video Game</button>
        </div>
    )
}

export default Nav;