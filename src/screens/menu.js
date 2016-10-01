'use strict';

import { PerspectiveCamera, Scene } from 'three';
import { GET_WIDTH, GET_HEIGHT } from '../game';

const START_GAME = 0;
const HALL_OF_FAME = 1;
const ABOUT = 2;

class Menu {
  constructor(game) {
    this.game = game;
    this.camera = new PerspectiveCamera(70, GET_WIDTH() / GET_HEIGHT(), 1, 1000);
    this.camera.position.y = 100;
    this.camera.position.z = 400;

    this.startGame = document.createElement('div');
    document.body.appendChild(this.startGame);
    this.setupStartGame();

    this.hallOfFame = document.createElement('div');
    document.body.appendChild(this.hallOfFame);
    this.setupHighscore();

    this.about = document.createElement('div');
    document.body.appendChild(this.about);
    this.setupAbout();

    this.arrowSet = new Image();
    this.arrowSet.src = './textures/arrowset.png';
    this.arrowSet.onload = this.setupTutorial.bind(this);
    document.body.appendChild(this.arrowSet);

    this.spaceSet = new Image();
    this.spaceSet.src = './textures/spaceset.png';
    this.spaceSet.onload = this.setupTutorial.bind(this);
    document.body.appendChild(this.spaceSet);

    this.arrowExplanation = document.createElement('div');
    document.body.appendChild(this.arrowExplanation);

    this.spaceExplanation = document.createElement('div');
    document.body.appendChild(this.spaceExplanation);

    this.setupTutorial();

    this.selected = START_GAME;

    this.scene = new Scene();

    this.keyDownListener = this.keyDown.bind(this);
    document.addEventListener('keydown', this.keyDownListener);
  }

  setupTutorial() {
    this.arrowSet.className = 'gui-item';
    this.arrowSet.height = GET_HEIGHT() / 6;
    this.arrowSet.style.top = `${(GET_HEIGHT() / 6 * 1)}px`;
    this.arrowSet.style.left = `${(GET_WIDTH() / 20 * 2)}px`;

    this.spaceSet.className = 'gui-item';
    this.spaceSet.height = GET_HEIGHT() / 6;
    this.spaceSet.style.top = `${(GET_HEIGHT() / 6 * 1)}px`;
    this.spaceSet.style.left = `${(GET_WIDTH() / 20 * 8)}px`;

    this.arrowExplanation.style.fontSize = `${GET_HEIGHT() / 40}px`;
    this.arrowExplanation.innerHTML = 'USE THE ARROW KEYS TO CONTROL THE BOX';
    this.arrowExplanation.className = 'gui-item';
    this.arrowExplanation.style.top = `${(GET_HEIGHT() / 6 * 2.2)}px`;
    this.arrowExplanation.style.left = `${(GET_WIDTH() / 20 * 2) - (GET_WIDTH() / 30)}px`;
    this.arrowExplanation.style.width = `${this.arrowSet.width * 1.5}px`;
    this.arrowExplanation.style['text-align'] = 'center';

    this.spaceExplanation.style.fontSize = `${GET_HEIGHT() / 40}px`;
    this.spaceExplanation.innerHTML = 'HOLD SPACE + AN ARROW KEY TO MAKE THE BOX GROW OR SHRINK';
    this.spaceExplanation.className = 'gui-item';
    this.spaceExplanation.style.top = `${(GET_HEIGHT() / 6 * 2.2)}px`;
    this.spaceExplanation.style.left = `${(GET_WIDTH() / 20 * 8)}px`;
    this.spaceExplanation.style.width = `${this.spaceSet.width}px`;
    this.spaceExplanation.style['text-align'] = 'center';
  }

  setupStartGame() {
    this.startGame.style.fontSize = `${GET_HEIGHT() / 20}px`;
    this.startGame.innerHTML = 'START GAME';
    this.startGame.className = 'gui-item';
    this.startGame.style.top = `${(GET_HEIGHT() / 20 * 14)}px`;
    this.center(this.startGame);
  }

  setupHighscore() {
    this.hallOfFame.style.fontSize = `${GET_HEIGHT() / 20}px`;
    this.hallOfFame.innerHTML = 'HALL OF FAME';
    this.hallOfFame.className = 'gui-item';
    this.hallOfFame.style.top = `${(GET_HEIGHT() / 20 * 16)}px`;
    this.center(this.hallOfFame);
  }

  setupAbout() {
    this.about.style.fontSize = `${GET_HEIGHT() / 20}px`;
    this.about.innerHTML = 'ABOUT';
    this.about.className = 'gui-item';
    this.about.style.top = `${(GET_HEIGHT() / 20 * 18)}px`;
    this.center(this.about);
  }

  center(div) {
    div.style.left = `${GET_WIDTH() / 2 - div.clientWidth / 2}px`
  }

  keyDown({code}) {
    if (code === 'ArrowDown') {
      this.selected++;

      if (this.selected > ABOUT) {
        this.selected = START_GAME;
      }
    }

    if (code === 'ArrowUp') {
      this.selected--

      if (this.selected < START_GAME) {
        this.selected = ABOUT;
      }
    }

    if (code === 'Space' || code === 'Enter') {
      if (this.selected === START_GAME) {
        this.destroy();
        this.game.startGamePlay();
      }
    }
  }

  update() {
    this.startGame.style['text-decoration'] = 'none';
    this.hallOfFame.style['text-decoration'] = 'none';
    this.about.style['text-decoration'] = 'none';

    if (this.selected === START_GAME) {
      this.startGame.style['text-decoration'] = 'underline';
    } else if (this.selected === HALL_OF_FAME) {
      this.hallOfFame.style['text-decoration'] = 'underline';
    } else {
      this.about.style['text-decoration'] = 'underline';
    }
  }

  render(renderer) {
    renderer.render(this.scene, this.camera);
  }

  resize() {
    this.camera.aspect = GET_WIDTH() / GET_HEIGHT();
    this.camera.updateProjectionMatrix();

    this.setupStartGame();
    this.setupHighscore();
    this.setupAbout();
    this.setupTutorial();
  }

  destroy() {
    document.body.removeChild(this.startGame);
    document.body.removeChild(this.hallOfFame);
    document.body.removeChild(this.about);
    document.body.removeChild(this.arrowSet);
    document.body.removeChild(this.spaceSet);
    document.body.removeChild(this.arrowExplanation);
    document.body.removeChild(this.spaceExplanation);
    document.removeEventListener('keydown', this.keyDownListener);
  }
}

export default Menu;
