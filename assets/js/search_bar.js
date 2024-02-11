import { cardsLoaderCreator } from "./cards_loader.js";

const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchButton');
let types = {};
let lastSearch = "";

export const updateTypes = () => {
    fetch("https://pokeapi.co/api/v2/type/")
        .then(response => response.json())
        .then(data => {
            data.results.forEach(({name, url}) => types[name] = url);
        })
}

const isNewSearch = (input) => {
    const isNew = input !== lastSearch;
    lastSearch = (isNew) ? input : lastSearch;
    return isNew;
}

searchBtn.addEventListener('click', () => {
    const input = searchInput.value.trim().toLowerCase();

    if(isNewSearch(input)){
        if (input === "") return cardsLoaderCreator();

        if (types.hasOwnProperty(input)){
            return cardsLoaderCreator(types[input]);
        };

        cardsLoaderCreator("https://pokeapi.co/api/v2/pokemon/" + input);
    }
})