import { cardsLoaderCreator } from "./cards_loader.js";

const searchInput = document.querySelector('#searchBar');
let types = {};
let lastSearch = "";
let currentSearh;

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

searchInput.addEventListener('input', () => {
    const input = searchInput.value.trim().toLowerCase();

    if(isNewSearch(input)){
        clearTimeout(currentSearh);
        if (input === ""){
            currentSearh = setTimeout(() => {
                cardsLoaderCreator();
            }, 600);
        } else if (types.hasOwnProperty(input)){
            currentSearh = setTimeout(() => {
                cardsLoaderCreator(types[input]);
            }, 600);
        } else {
            currentSearh = setTimeout(() => {
                cardsLoaderCreator("https://pokeapi.co/api/v2/pokemon/" + input);
            }, 600);
        }
    }
})