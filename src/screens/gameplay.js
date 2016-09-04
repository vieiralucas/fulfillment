'use strict';

import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

import { GET_WIDTH, GET_HEIGHT } from '../game';
import Player from '../entities/player';
import Floor from '../entities/floor';
import Wall from '../entities/wall';

class GamePlay {
  constructor() {
    this.camera = new PerspectiveCamera(70, GET_WIDTH() / GET_HEIGHT(), 1, 1000);
    this.camera.position.y = 100;
    this.camera.position.z = 400;

    this.scene = new Scene();

    this.player = new Player(this.scene, 10, 0, 200);
    this.floor = new Floor(this.scene, 0, -20, -400);
    this.wall = new Wall(this.scene, 0, 0, -300);
  }

  update() {
    this.player.update();
    this.floor.update();
    this.wall.update();
  }

  render(renderer) {
    renderer.render(this.scene, this.camera);
  }

  resize() {
    this.camera.aspect = GET_WIDTH() / GET_HEIGHT();
    this.camera.updateProjectionMatrix();
  }
}

export default GamePlay;
