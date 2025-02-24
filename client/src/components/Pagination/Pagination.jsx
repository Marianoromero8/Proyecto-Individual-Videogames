import React, { useEffect, useState } from 'react';
import style from './Pagination.module.css';
import { useSelector } from 'react-redux'
import Home from '../Home/Home';

const Pagination = ({ onSearch }) => {
    const allVideogames = useSelector(state => state.videogames) //Obtengo el estado desde redux (reducer)

    const [pagina, setPagina] = useState(1); //estado de la pagina
    const [porPag, setPorPag] = useState(15); //videojuegos por pagina
    const [input, setInput] = useState(1); // estado del input donde figura el numero de la pagina

    const startIndex = (pagina - 1) * porPag; //indice inicial de los videogames
    const endIndex = Math.min(startIndex + porPag, allVideogames.length); //indice final de los videogames en la paginna que se encuentra
    const showVideogames = allVideogames.slice(startIndex, endIndex)

    const max = Math.ceil(allVideogames.length / porPag); //Numero maximo de paginas

    useEffect(() => { //Reinicia la pag e input en 1 cada vez que allVideogames cambia (sirve para los filtros)
        setPagina(1);
        setInput(1)
    }, [allVideogames])

    const nextPage = () => { //cambio de pag para adelante, por lo que suma
        setInput(pagina + 1);
        setPagina(pagina + 1);
    }

    const backPage = () => { //cambio de pag para atras, por lo que resta
        setInput(pagina - 1);
        setPagina(pagina - 1);
    }

    const onInput = (e) => { //Se asegura que el valor del input este dentro del rango y actualiza pagina e input
        const val = (e.target.value)
        if (val < 1 || val > Math.ceil(max) || isNaN(val)) {
            setPagina(1);
            setInput(1)
        } else {
            setPagina((val))
        }
    }

    const onChange = (e) => { //actualiza el valor del input
        setInput(e.target.value)
    }

    return (
        <>
            <Home videogames={showVideogames} onSearch={onSearch} />
            <div className={style.div}>
                <button disabled={pagina === 1 || pagina < 1} onClick={backPage} className={style.button}>Back</button>
                <input type='number' min="1" max={max} disabled onChange={event => onChange(event)} onClick={event => onInput(event)} name='page' value={input} autoComplete='off' readOnly className={style.input} />
                <p className={style.p}>de {max}</p>
                <button disabled={pagina === Math.ceil(max) || pagina > max} onClick={nextPage} className={style.button}>Next</button>
            </div>
        </>
    )

}

export default Pagination;