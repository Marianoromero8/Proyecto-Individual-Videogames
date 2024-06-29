import React from 'react';
import style from './Home.module.css'
import Nav from '../Nav/Nav';
import Card from '../Card/Card';
import Filters from '../Filters/Filters';

const Home = ({videogames, onSearch}) => {
    console.log(videogames)
    const firstVideogames = Math.ceil(videogames.length / 3)
    const secondVideogames = firstVideogames * 2;

    const videogamesTop = videogames.slice(0, firstVideogames)
    const videogamesMiddle = videogames.slice(firstVideogames, secondVideogames)
    const videogamesBottom = videogames.slice(secondVideogames)
    return(
    <div className={style.container}>
        <Nav onSearch={onSearch}/>
        <Filters/>
        <div className={style.divCards}>
        <div className={style.divCardsTop}>
        {videogamesTop
        .map((coun) => (
        <Card coun={coun} key={coun.id} />
        ))
        }
        </div>
        <div className={style.divCardsMiddle}>
        {videogamesMiddle
        .map((coun) => (
          <Card coun={coun} key={coun.id}/>
        ))}
        </div>
        <div className={style.divCardsBottom}>
        {videogamesBottom
        .map((coun) => (
        <Card coun={coun} key={coun.id} />
        ))
        }
        </div>
        </div>
    </div>
    )
}

export default Home;
