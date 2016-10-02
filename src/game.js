'use strict';

import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import Menu from './screens/menu';
import GameOver from './screens/gameover';
import GamePlay from './screens/gameplay';

class Game {
  constructor() {
    this.renderer = this.createRenderer();
    this.gotoMenu();
  }

  start() {
    document.body.appendChild(this.renderer.domElement);
    this.render();
  }

  createRenderer() {
    const renderer = new WebGLRenderer();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(GET_WIDTH(), GET_HEIGHT());

    return renderer;
  }

  resize() {
    this.screen.resize();
    this.renderer.setSize(GET_WIDTH(), GET_HEIGHT());
  }

  update() {
    this.screen.update();
  }

  render() {
    window.requestAnimationFrame(this.render.bind(this));
    this.update();
    this.screen.render(this.renderer);
  }

  startGamePlay() {
    this.screen = new GamePlay(this);
  }

  gotoMenu() {
    this.screen = new Menu(this);
  }

  gameOver(score) {
    this.screen = new GameOver(this, score.value);
  }
}

export const GET_WIDTH = () => window.innerWidth * .99;
export const GET_HEIGHT = () => window.innerHeight * .99;

export default Game;
