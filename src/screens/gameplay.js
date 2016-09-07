'use strict';

import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

import { GET_WIDTH, GET_HEIGHT } from '../game';
import Player from '../entities/player';
import Floor from '../entities/floor';
import Wall from '../entities/wall';
import Score from '../entities/score';

class GamePlay {
  constructor() {
    this.camera = new PerspectiveCamera(70, GET_WIDTH() / GET_HEIGHT(), 1, 1000);
    this.camera.position.y = 100;
    this.camera.position.z = 400;

    this.scene = new Scene();

    this.player = new Player(this.scene, 10, 0, 200);
    this.floor = new Floor(this.scene, 0, -20, -400);
    this.wall = new Wall(this.scene, 0, 0, -300, this);
    this.score = new Score(this.scene);
  }

  update() {
    this.player.update();
    this.floor.update();
    this.wall.update();

    this.checkCollision();
  }

  checkCollision() {
    const playerDepth = this.player.getDepth();
    const wallDepth = this.wall.getDepth();

    const wallTopZ = this.wall.getZ() - wallDepth / 2;
    const wallBottomZ = this.wall.getZ() + wallDepth / 2;

    const playerTopZ = this.player.getZ() - wallDepth / 2;
    const playerBottomZ = this.player.getZ() + wallDepth / 2;

    const canCollide = wallBottomZ > playerTopZ && wallTopZ < playerBottomZ;

    // since z remains the same across all pieces
    // we dont need to iterate pieces to check against it
    if (!canCollide) {
      return;
    }

    const wallPieces = this.wall.pieces;
    const playerPieces = this.player.pieces;
    let failures = [];
    let success = [];

    for (let p = 0; p < playerPieces.length; p++) {
      for (let w = 0; w < wallPieces.length; w++) {
        const pPosition = playerPieces[p].position;
        const wPosition = wallPieces[w].position;

        const xDistance = Math.abs(pPosition.x - wPosition.x);
        const yDistance = Math.abs(pPosition.y - wPosition.y);

        if (xDistance < (playerDepth + wallDepth) / 2 && yDistance < (playerDepth + wallDepth) / 2) {
          if (wallPieces[w].material.visible) {
            failures.push(wallPieces[w]);
          } else {
            success.push(playerPieces[p]);
          }
        }
      }
    }

    if (failures.length > 0) {
      this.wall.hit = true;
      wallPieces.forEach(w => w.material.color.setHex(0xff0000));
      return;
    }

    success.forEach(s => s.setHex(0x00ff00));
    this.wall.filled = success.length;
  }

  wallRestart() {
    this.player.restartColor();

    if (!this.wall.hit) {
      if (this.wall.holes <= this.wall.filled) {
        this.player.combo += 1;
      } else {
        this.player.combo = 1;
      }

      const scoreMade = Math.ceil(Math.pow(2, this.wall.filled) * this.wall.speed * this.player.combo);
      this.score.incrementBy(scoreMade);
    } else {
      this.player.combo = 1;
    }
  }

  render(renderer) {
    renderer.render(this.scene, this.camera);
  }

  resize() {
    this.camera.aspect = GET_WIDTH() / GET_HEIGHT();
    this.camera.updateProjectionMatrix();
    this.score.resize();
  }
}

export default GamePlay;
