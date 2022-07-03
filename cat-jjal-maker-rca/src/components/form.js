import React from 'react';

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

export default Form;