'use strict';
import { createCard } from "./pokemon_card.js";

const cardsContainer = document.querySelector('#cardsContainer');
const loadCardsBtn = document.querySelector('#loadBtn');
let cardsLoader;

const clearContainer = () => cardsContainer.innerHTML = "";

const addPokemonCards = (pokemons) => {
    const promises = pokemons.map(url =>
        fetch(url).then(response => response.json())
    );

    Promise.all(promises)
        .then(results => {
            results.forEach(createCard);
        })
};

const showResults = (data) => {
    if(data.hasOwnProperty('height')){
        createCard(data);
        return;
    }

    if(data.hasOwnProperty('pokemon')){
        const pokemons = data.pokemon.map(({pokemon}) => pokemon.url)
        addPokemonCards(pokemons);
        return;
    }

    if(data.hasOwnProperty('results')){
        const pokemons = data.results.map(({url}) => url);
        addPokemonCards(pokemons);
        return;
    }

    return;
}

const errorMsg = () => {
    const errorMsgHtml = document.createElement('div');
    errorMsgHtml.innerHTML = `
        <i class="fa-regular fa-face-frown"></i>
        <p>No results for the search try with other parameters</p>
    `
    errorMsgHtml.classList.add('error');
    cardsContainer.appendChild(errorMsgHtml);
}

const disableBtn = () => loadCardsBtn.classList.add('disabled');
const enableBtn = () => loadCardsBtn.classList.remove('disabled');


export const cardsLoaderCreator = function(url = false){
    url = (url === false) ? "https://pokeapi.co/api/v2/pokemon?limit=24" : url;
    let nextPage = true;
    clearContainer();
    enableBtn();

    const updateUrl = (data) => {
        nextPage = (!data.hasOwnProperty('next') || data['next'] === null) ? false : true;
        if(nextPage === false) disableBtn();
        url = (nextPage) ? data['next'] : null;
    }

    cardsLoader = () => {
        if(nextPage){
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    updateUrl(data);
                    showResults(data);
                })
                .catch(error => {
                    nextPage = false;
                    errorMsg();
                    disableBtn();
                })
        }
    }
    cardsLoader();
}

loadCardsBtn.addEventListener('click', () => {
    cardsLoader();
});