import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllVideogames, getByName } from './redux/actions';
import Landing from './components/Landing/Landing';
import Pagination from './components/Pagination/Pagination';
import Details from './components/Details/Details';
import Form from './components/Form/Form';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const onSearch = (name) => { //Creo la funcion que me ayudara a buscar por nombre
    dispatch(getByName(name)) //Aqui despacha la funcion de 'actions' que hara que busque por el nombre. Entra en juego Redux
  }

  useEffect(() => {
    dispatch(getAllVideogames()) //Obtengo todos los videogames a traves de la 'actions'
  }, [dispatch])

  return (
    <div className="App">

      <Routes>

        <Route path='/' element={<Landing/>}/>

        <Route path='/home' element={<Pagination onSearch={onSearch}/>}/>

        <Route path='/post' element={<Form/>}/>

        <Route path='/detail/:id' element={<Details/>}/>

      </Routes>

    </div>
  );
}

export default App;
