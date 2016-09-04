'use strict';

import Game from './game';

const game = new Game();

game.start();

window.addEventListener('resize', game.resize.bind(game), false);

