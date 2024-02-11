const cardsContainer = document.querySelector('#cardsContainer');

export const createCard = ({id, name, types, sprites, stats, abilities, height, weight}) => {

    types = types.map(({type}) => type.name);
    stats = stats.reduce((acc, {base_stat, stat}) => {
        acc[stat.name] = base_stat;
        return acc;
    }, {});

    const card = document.createElement('div');
    card.classList.add('card', types[0]);
    card.innerHTML = `
        <div class="card__title">
            <h2>${name}</h2>
            <h3>#${id}</h3>
        </div>

        <img src="${(sprites.other['official-artwork'].front_default) ?? (sprites.front_default)}" class="card__img">
        <img src="${(sprites.other['official-artwork'].front_default) ?? (sprites.front_default)}" class="card__img_bg">

        <div class="card__info">
            <div class="card__types">
                ${types.map(type => `<p class="${type}">${type}</p>`).join('')}
            </div>

            <div class="card__divisor">
                <img src="assets/imgs/pokeball.png" alt="pokeball">
            </div>

            <div class="card__stats">
                <p>
                    <i class="fa-solid fa-heart"></i>
                    <span>HP:</span> ${stats.hp}
                </p>
                <p>
                    <i class="fa-solid fa-hand-fist"></i>
                    <span>Attack:</span> ${stats.attack}
                <p>
                    <i class="fa-solid fa-shield"></i>
                    <span>Defense:</span> ${stats.defense}
                </p>
                <p>
                    <i class="fa-solid fa-bolt"></i>
                    <span>Speed:</span> ${stats.speed}
                </p>
            </div>

            <div class="card__attributes">
                <div class="attribute">
                    <i class="fa-solid fa-ruler"></i>
                    <p><span>Height:</span><br>${(height * 0.1).toFixed(1)}m</p>
                    </div>
                    <div class="attribute">
                    <i class="fa-solid fa-weight-scale"></i>
                    <p><span>Weight:</span><br>${(weight * 0.1).toFixed(1)}kg</p>
                </div>
                <div class="attribute">
                    <i class="fa-solid fa-fire"></i>
                    <p><span>Ability:</span><br>${abilities[0].ability.name}</p>
                </div>
            </div>

        </div>
    `;
    cardsContainer.appendChild(card);
};