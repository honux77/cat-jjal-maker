export const COUNT = 1;
export const HELLO = "Hello, React Cat!";
export const MAIN_CAT = "60b73094e04e18001194a309";
export const EMPTY = [];

const OPEN_API_DOMAIN = "https://cataas.com";

export const fetchCat = async () => {
    const response = await fetch(`${OPEN_API_DOMAIN}/cat?json=true`);
    const responseJson = await response.json();
    return responseJson.url.split("/")[2];
};


export const jsonLocalStorage = {
    setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
        return JSON.parse(localStorage.getItem(key));
    },
};