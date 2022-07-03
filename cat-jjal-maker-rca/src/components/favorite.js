const CatItem = ({ img }) => (
    <li>
        <img alt="various cute cat images" src={img} style={{ width: "200px", border: "1px solid red" }} />
    </li>
);

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

export default Favorites;