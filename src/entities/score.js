'use strict';

import { GET_WIDTH, GET_HEIGHT } from '../game';

class Score {
  constructor() {
    this.value = 0;
    this.div = document.createElement('div');
    this.setupDiv();
  }

  setupDiv() {
    this.div.style.fontSize = `${GET_HEIGHT() / 20}px`;
    this.div.innerHTML = this.value;
    this.div.style.top = `${GET_HEIGHT() / 20}px`;
    this.div.className = 'gui-item';
    this.center();
    document.body.appendChild(this.div);
  }

  incrementBy(x) {
    this.value += x;
    this.div.innerHTML = this.value;
  }

  center() {
    this.div.style.left = `${GET_WIDTH() / 2 - this.div.clientWidth / 2}px`
  }

  resize() {
    this.div.style.fontSize = `${GET_HEIGHT() / 20}px`;
    this.div.style.top = `${GET_HEIGHT() / 20}px`;
    this.center();
  }

  destroy() {
    document.body.removeChild(this.div);
  }
}

export default Score;
