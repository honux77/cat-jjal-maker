import React from 'react';

import { COUNT, HELLO, MAIN_CAT, EMPTY, fetchCat, jsonLocalStorage } from './util';

import Title from './components/title';
import Reset from './components/reset';
import Favorites from './components/favorite';
import Form from './components/form';
import MainCard from './components/maincard';

import './App.css';

const catUrl = (cat, message) => (`https://cataas.com/cat/${cat}/says/${message}`);

const App = () => {

  const [mainCat, setMainCat] = React.useState(MAIN_CAT);
  const [message, setMessage] = React.useState(HELLO);

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter") || COUNT;
  });

  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || EMPTY;
  });

  const nextCat = async (text) => {
    const catId = await fetchCat();
    setMainCat(catId);
  };

  const increaseCounter = () => {
    setCounter((prev) => {
      const next = prev + 1;
      jsonLocalStorage.setItem("counter", next);
      return next;
    });
  };

  const addFarovirtes = () => {
    setFavorites([...favorites, catUrl(mainCat, message)]);
    jsonLocalStorage.setItem("favorites", favorites);

  }

  const updateMessage = (msg) => {
    setMessage(msg);
    jsonLocalStorage.setItem("message", msg);
  }

  let titleCount = counter === 1 ? null : counter + "번째";

  return (
    <div className='main-app'>
      <Title>{titleCount} 고양이 가라사대</Title>
      <Form updateMessage={updateMessage} nextCat={nextCat} />
      <MainCard img={catUrl(mainCat, message)} addFarovirtes={addFarovirtes} increaseCounter={increaseCounter}
        mainCat={mainCat} favorites={favorites} />
      <Favorites favorites={favorites} />
      <Reset setCounter={setCounter} setFavorites={setFavorites} setMessage={setMessage} setMainCat={setMainCat} />
    </div>
  );
}

export default App;
