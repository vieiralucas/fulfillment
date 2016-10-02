'use strict';

import { PerspectiveCamera, Scene } from 'three';
import { GET_WIDTH, GET_HEIGHT } from '../game';

class GameOver {
  constructor(game, score) {
    this.game = game;
    console.log(score);
    this.score = score;

    this.camera = new PerspectiveCamera(70, GET_WIDTH() / GET_HEIGHT(), 1, 1000);
    this.camera.position.y = 100;
    this.camera.position.z = 400;

    this.gameOver = document.createElement('div');
    document.body.appendChild(this.gameOver);
    this.setupGameOver();

    this.scoreDiv = document.createElement('div');
    document.body.appendChild(this.scoreDiv);
    this.setupScore();

    this.putYourName = document.createElement('div');
    document.body.appendChild(this.putYourName);
    this.setupPutYourName();

    this.nameInput = document.createElement('input');
    document.body.appendChild(this.nameInput);
    this.setupNameInput();

    this.pressEnter = document.createElement('div');
    document.body.appendChild(this.pressEnter);
    this.setupPressEnter();

    this.scene = new Scene();

    this.keyDownListener = this.keyDown.bind(this);
    document.addEventListener('keydown', this.keyDownListener);
  }

  setupGameOver() {
    this.gameOver.style.fontSize = `${GET_HEIGHT() / 10}px`;
    this.gameOver.innerHTML = 'GAME OVER';
    this.gameOver.className = 'gui-item';
    this.gameOver.style.top = `${(GET_HEIGHT() / 20 * 2)}px`;
    this.center(this.gameOver);
  }

  setupScore() {
    this.scoreDiv.style.fontSize = `${GET_HEIGHT() / 20}px`;
    this.scoreDiv.innerHTML = `YOUR SCORE: ${this.score}`;
    this.scoreDiv.className = 'gui-item';
    this.scoreDiv.style.top = `${(GET_HEIGHT() / 20 * 6)}px`;
    this.center(this.scoreDiv);
  }

  setupPutYourName() {
    this.putYourName.style.fontSize = `${GET_HEIGHT() / 20}px`;
    this.putYourName.innerHTML = 'TYPE A NICKNAME BELOW';
    this.putYourName.className = 'gui-item';
    this.putYourName.style.top = `${(GET_HEIGHT() / 20 * 9)}px`;
    this.center(this.putYourName);
  }

  setupNameInput() {
    this.nameInput.style.fontSize = `${GET_HEIGHT() / 20}px`;
    this.nameInput.className = 'gui-item name-input';
    this.nameInput.style.top = `${(GET_HEIGHT() / 20 * 12)}px`;
    this.nameInput.maxLength = 10;
    this.center(this.nameInput);
  }

  setupPressEnter() {
    this.pressEnter.style.fontSize = `${GET_HEIGHT() / 20}px`;
    this.pressEnter.innerHTML = 'PRESS ENTER TO GO BACK TO MENU';
    this.pressEnter.className = 'gui-item';
    this.pressEnter.style.top = `${(GET_HEIGHT() / 20 * 18)}px`;
    this.center(this.pressEnter);
  }

  center(div) {
    div.style.left = `${GET_WIDTH() / 2 - div.clientWidth / 2}px`
  }

  keyDown({code}) {
    if (code === 'Enter') {
      this.destroy();
      this.game.gotoMenu();
    }
  }

  update() {
    this.nameInput.focus();
  }

  render(renderer) {
    renderer.render(this.scene, this.camera);
  }

  resize() {
    this.camera.aspect = GET_WIDTH() / GET_HEIGHT();
    this.camera.updateProjectionMatrix();

    this.setupGameOver();
    this.setupScore();
    this.setupPutYourName();
    this.setupNameInput();
    this.setupPressEnter();
  }

  destroy() {
    document.body.removeChild(this.gameOver);
    document.body.removeChild(this.scoreDiv);
    document.body.removeChild(this.putYourName);
    document.body.removeChild(this.nameInput);
    document.body.removeChild(this.pressEnter);
    document.removeEventListener('keydown', this.keyDownListener);
  }
}

export default GameOver;
