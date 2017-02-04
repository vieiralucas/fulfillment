'use strict';

import { PerspectiveCamera, Scene } from 'three';
import { GET_WIDTH, GET_HEIGHT } from '../game';
import HighscoreService from '../highscore-service';

class HallOfFame {
  constructor(game) {
    this.highscoreService = new HighscoreService();
    this.game = game;

    this.camera = new PerspectiveCamera(70, GET_WIDTH() / GET_HEIGHT(), 1, 1000);
    this.camera.position.y = 100;
    this.camera.position.z = 400;

    this.scene = new Scene();

    this.container = document.createElement('div');
    document.body.appendChild(this.container);

    this.highscoreService.list()
      .then(highscores => {
        this.highscores = highscores;
        this.setupHighscores();
      });

    this.keyDownListener = this.keyDown.bind(this);
    document.addEventListener('keydown', this.keyDownListener);
  }

  setupHighscores() {
    this.container.innerHTML = '';
    this.container.className = 'gui-item';
    this.container.style.width = `${GET_WIDTH() / 1.5}px`;
    this.container.style.top = `${(GET_HEIGHT() / 12 * 1)}px`;
    this.container.style.left = `${GET_WIDTH() / 6}px`;
    this.container.style.fontSize = `${GET_HEIGHT() / 20}px`;

    this.highscores.forEach(highscore => {
      const nick = highscore[0];
      const score = highscore[1];

      const highscoreContainer = document.createElement('div');
      highscoreContainer.style.clear = 'both';

      const nickP = document.createElement('p');
      nickP.style.marginTop = '0px';
      nickP.style.marginBottom = `${GET_HEIGHT() / 24}px`;
      nickP.style.width = '50%';
      nickP.style.float = 'left';
      nickP.innerHTML = nick;

      const scoreP = document.createElement('p');
      scoreP.style.marginTop = nickP.style.marginTop;
      scoreP.style.marginBottom = nickP.style.marginBottom;
      scoreP.style.width = '50%';
      scoreP.style.float = 'left';
      scoreP.style.textAlign = 'right';
      scoreP.innerHTML = score;

      highscoreContainer.appendChild(nickP);
      highscoreContainer.appendChild(scoreP);

      this.container.appendChild(highscoreContainer);
    });
  }

  keyDown({ code }) {
    if (code === 'ArrowDown') {
    }

    if (code === 'ArrowUp') {
    }

    if (code === 'Space' || code === 'Enter') {
    }
  }

  update() {
  }

  render(renderer) {
    renderer.render(this.scene, this.camera);
  }

  resize() {
    this.camera.aspect = GET_WIDTH() / GET_HEIGHT();
    this.camera.updateProjectionMatrix();
    this.setupHighscores();
  }

  destroy() {
    document.removeEventListener('keydown', this.keyDownListener);
  }
}

export default HallOfFame;
