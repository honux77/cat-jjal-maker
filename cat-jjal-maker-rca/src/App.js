import React from 'react';
import './App.css';

const OPEN_API_DOMAIN = "https://cataas.com";
    const COUNT = 1;
    const HELLO = "Hello, React Cat!";
    const MAIN_CAT = "60b73094e04e18001194a309";
    const EMPTY = [];       
    
    const fetchCat = async () => {
      const response = await fetch(`${OPEN_API_DOMAIN}/cat?json=true`);
      const responseJson = await response.json();
      return responseJson.url.split("/")[2];
    };

    const Title = ({ children }) => (<h1>{children}</h1>);

    const Reset = ({ setCounter, setFavorites, setMessage, setMainCat }) => {
      const reset = () => {
        localStorage.clear();
        setCounter(COUNT);
        setFavorites(EMPTY);
        setMainCat(MAIN_CAT)
        setMessage(HELLO);
      }

      return (
        <div id="reset">
          <button onClick={reset}> 데이터 초기화하기</button>
        </div>);
    };

    const CatItem = ({ img }) => (
      <li>
        <img alt="various cute cat images" src={img} style={{ width: "200px", border: "1px solid red" }} />
      </li>
    );

    const MainCard = ({img, addFarovirtes, increaseCounter, mainCat, favorites}) => {
      
      const handleHeartButton = (e) => {
        increaseCounter();
        addFarovirtes();        
      }
      
      let includeFavorite = false;      
      favorites.forEach(f => {
          if (f.includes(mainCat)) includeFavorite = true;
      });

      const heart = includeFavorite ? "💖" : "🤍";

      return (
        <div className="main-card">
          <img
            src={img}
            alt="랜덤하게 바뀌는 고양이 이미지"
            width="400"  
          /> <button onClick={handleHeartButton}>{heart}</button>
        </div>
      );
    };

    const Favorites = ({ favorites }) => {      
      const cid = _ => (parseInt(Math.random() * Number.MAX_SAFE_INTEGER + 1));
      if (favorites.length === 0) return (<div>하트를 눌러 고양이 이미지를 추가해 보세요.</div>)

      return (
        <ul className="favorites">
          {favorites.map(cat => (
             <CatItem img={cat} key={cid()} />
           ))}
        </ul>
      );
    };

    const Form = ({ increaseCounter, updateMessage, nextCat }) => {
      const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
      const [errorMessage, setErrorMessage] = React.useState("");

      const handleInputChange = (e) => {
        const message = e.target.value;
        setErrorMessage("");
        if (includesHangul(message)) {
          setErrorMessage("한글은 입력할 수 없습니다.");
        }
      };

      const handleFormSubmit = (e) => {
        e.preventDefault();
        const message = document.querySelector('#catMessage');
        if (message.value === "") {
          setErrorMessage("빈 값을 추가할 수 없습니다.");
          return;
        }

        if (includesHangul(message.value)) {
          setErrorMessage("한글은 입력할 수 없습니다.");
          message.value = "";
          return;
        }
        updateMessage(message.value);
        message.value = "";
      };

      const changeCat = async (e) => {
        console.log("changeCat");
        await nextCat();
      }

      return (
        <form onSubmit={handleFormSubmit}>
          <input
            id="catMessage"
            type="text"
            name="name"
            placeholder="영어 대사를 입력해주세요"
            onChange={handleInputChange}
          /> <button type="submit">대사 입력</button> <button type="button" onClick={changeCat}>고양이 바꾸기</button>          
          <p style={{ color: "red" }}>{errorMessage}</p>
        </form>

      );
    };    

    const jsonLocalStorage = {
      setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
      },
      getItem: (key) => {
        return JSON.parse(localStorage.getItem(key));
      },
    };

    const catUrl = (cat, message) => (`https://cataas.com/cat/${cat}/says/${message}`);  

    const App = () => {                       

      const [mainCat, setMainCat] = React.useState(MAIN_CAT);
      const [message, setMessage] = React.useState(HELLO);
      
      const [counter, setCounter] = React.useState(()=>{
        return jsonLocalStorage.getItem("counter") || COUNT;
      });     
      
      const [favorites, setFavorites] = React.useState(()=>{        
        return jsonLocalStorage.getItem("favorites") || EMPTY;
      });      

      const nextCat = async (text) => {
        const catId = await fetchCat();
        setMainCat(catId);
      };

      const increaseCounter = () => {
        setCounter((prev)=> {
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
