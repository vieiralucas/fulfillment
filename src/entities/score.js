'use strict';

import { GET_WIDTH, GET_HEIGHT } from '../game';

class Score {
  constructor() {
    this.value = 0;
    this.div = document.querySelector('.score');
    this.setupDiv();
  }

  setupDiv() {
    this.div.style.fontSize = `${GET_HEIGHT() / 20}px`;
    this.div.innerHTML = this.value;
    this.div.style.top = `${GET_HEIGHT() / 20}px`;
    this.center();
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
}

export default Score;
