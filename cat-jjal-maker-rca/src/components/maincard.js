const MainCard = ({ img, addFarovirtes, increaseCounter, mainCat, favorites }) => {

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

export default MainCard;