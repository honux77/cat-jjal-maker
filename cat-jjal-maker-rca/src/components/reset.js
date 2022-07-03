import {COUNT, EMPTY, MAIN_CAT, HELLO} from "../util";

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

export default Reset;