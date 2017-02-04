'use strict';

class HighscoreService {
  constructor() {
    this.host = '//evening-tundra-78969.herokuapp.com';
  }

  list() {
    console.log(this.host);
    return fetch(`${this.host}/highscores`)
      .then(res => res.json());
  }

  post(nick, score) {
    const highscore = {
      nick,
      score
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(highscore)
    };

    return fetch(`${this.host}/highscore`, fetchOptions)
      .then(res => res.json());
  }
}

export default HighscoreService;
