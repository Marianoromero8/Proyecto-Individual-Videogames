import React from 'react';
import style from './Home.module.css'
import Nav from '../Nav/Nav';
import Card from '../Card/Card';
import Filters from '../Filters/Filters';

const Home = ({videogames, onSearch}) => {

    const firstVideogames = Math.ceil(videogames.length / 3)
    const secondVideogames = firstVideogames * 2;

    //Abajo lo que hago es dividir en 3 filas de 5 los videogames que llamo
    const videogamesTop = videogames.slice(0, firstVideogames);
    const videogamesMiddle = videogames.slice(firstVideogames, secondVideogames);
    const videogamesBottom = videogames.slice(secondVideogames);
    
    return(
    <div className={style.container}>
        <Nav onSearch={onSearch}/>
        <Filters/>
        <div className={style.divCards}> {/*En este div para solucionar un problema de estetica cuando carga, si esta vacia la pantalla o no encuentra algo quedara .....*/}
        {videogames.length === 0 ? (
            <div className={style.noResults}>
                <p>...........</p>
            </div>
        ) : (
        <>
        <div className={style.divCardsTop}> {/*Luego aqui como en los de abajo, renderizo los juegos en cada una de las 3 posiciones (top, middle y bottom) */}
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
      </>
    )}
    </div>
  </div>
  )
}

export default Home;
