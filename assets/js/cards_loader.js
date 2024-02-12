'use strict';
import { createCard } from "./pokemon_card.js";

const cardsContainer = document.querySelector('#cardsContainer');
const goTopBtn = document.querySelector('#go_top');
const loadingElement = document.querySelector('#loading');
let cardsLoader;
let makingLoad = false;

const loadingAnimation = (className) => {
    loadingElement.style.display = (className === "hide") ? "none" : "flex";
};

const clearContainer = () => cardsContainer.innerHTML = "";

const addPokemonCards = (pokemons) => {
    const promises = pokemons.map(url =>
        fetch(url).then(response => response.json())
    );
    Promise.all(promises)
    .then(results => {
            loadingAnimation("hide");
            results.forEach(createCard);
        })
};

const showResults = (data) => {
    if(data.hasOwnProperty('height')){
        createCard(data);
        loadingAnimation("hide");
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
        enableScrollLoading();
        return;
    }

    return;
}

const scrollHandler = () => {
    let coords = cardsContainer.getBoundingClientRect();
    if ((!makingLoad) && coords.bottom < 1200) {
        makingLoad = true;
        cardsLoader();
        setTimeout(() => {makingLoad = false}, 1000);
    }
};

const enableScrollLoading = () => {
    console.log("Habilitando Scroll");
    window.addEventListener('scroll', scrollHandler);
};

const disableScrollLoading = () => {
    console.log("Deshabilitando Scroll");
    window.removeEventListener('scroll', scrollHandler);
};

const errorMsg = () => {
    const errorMsgHtml = document.createElement('div');
    errorMsgHtml.innerHTML = `
        <i class="fa-regular fa-face-frown"></i>
        <p>No results for the search try with other parameters</p>
    `
    errorMsgHtml.classList.add('error');
    cardsContainer.appendChild(errorMsgHtml);
}

export const cardsLoaderCreator = function(url = false){
    disableScrollLoading();
    url = (url === false) ? "https://pokeapi.co/api/v2/pokemon?limit=24" : url;
    let nextPage = true;
    clearContainer();

    const updateUrl = (data) => {
        nextPage = (!data.hasOwnProperty('next') || data['next'] === null) ? false : true;
        url = (nextPage) ? data['next'] : null;
    }

    cardsLoader = () => {
        if(nextPage){
            loadingAnimation("show");
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    updateUrl(data);
                    showResults(data);
                })
                .catch(error => {
                    nextPage = false;
                    errorMsg();
                    loadingAnimation("hide");
                })
        }
    }

    cardsLoader();
};

goTopBtn.addEventListener('click', () => {
    window.scrollTo(0, 0);
});