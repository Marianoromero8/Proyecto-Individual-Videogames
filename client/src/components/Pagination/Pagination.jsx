import React, {useEffect, useState} from 'react';
import style from './Pagination.module.css';
import {useSelector} from 'react-redux'
import Home from '../Home/Home';

const Pagination = ({onSearch}) => {
    const allVideogames = useSelector(state => state.videogames)

    const[pagina, setPagina] = useState(1);
    const[porPag, setPorPag] = useState(15);
    const [input, setInput] = useState(1);

    const startIndex = (pagina - 1) * porPag;
    const endIndex = Math.min(startIndex + porPag, allVideogames.length);
    const showVideogames = allVideogames.slice(startIndex, endIndex)
    
    const max = Math.ceil(allVideogames.length / porPag);

    useEffect(() => {
        setPagina(1);
        setInput(1)
    }, [allVideogames])
    
    const nextPage = () => {
        setInput(pagina + 1);
        setPagina(pagina + 1);
    }

    const backPage = () => {
        setInput(pagina - 1);
        setPagina(pagina - 1);
    }
    
    const onInput = (e) => {
        const val = (e.target.value)  
        if ( val < 1 || val > Math.ceil(max) || isNaN(val)){
            setPagina(1);
            setInput(1)
        } else{
            setPagina((val))
        }
    }
    
    const onChange = (e) => {
        setInput(e.target.value)
    }

    return (
        <>
      <Home videogames={showVideogames} onSearch={onSearch}/>
      <div className={style.div}>
      <button disabled={pagina === 1 || pagina < 1} onClick={backPage} className={style.button}>Back</button>
      <input type='number' min="1" max={max} disabled onChange={event => onChange(event)} onClick={event => onInput(event)}  name='page' value={input} autoComplete='off' readOnly className={style.input}/>
      <button disabled={pagina === Math.ceil(max) || pagina > max} onClick={nextPage} className={style.button}>Next</button>
      <p className={style.p}>de {max}</p>
      </div>
    </>
  )

}

export default Pagination;