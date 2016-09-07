'use strict';

import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import GamePlay from './screens/gameplay';

class Game {
  constructor() {
    this.screen = new GamePlay();
    this.renderer = this.createRenderer();
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
}

export const GET_WIDTH = () => window.innerWidth * .99;
export const GET_HEIGHT = () => window.innerHeight * .99;

export default Game;
