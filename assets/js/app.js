'use strict';

import { cardsLoaderCreator } from './cards_loader.js';
import { updateTypes } from './search_bar.js';

document.addEventListener('DOMContentLoaded', () => {
    cardsLoaderCreator();
    updateTypes();
});