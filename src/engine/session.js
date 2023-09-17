import {EventHandler} from '../utilities/eventHandler.js';
import {
  DELAY_FOR_LEVEL,
  MAX_LEVEL,
  SCORE_FOR_LINE,
} from '../constants/sessionConfig.js';

export {Session};

class Session {
  onLinesCleanedEvent = (event) => {
    this.updateScore(event.get('count'));
  };

  constructor(name) {
    this.name = name;

    this.sessionInfoChangedEventHandlers = new EventHandler(
        'sessionInfoChanged');

    this.resetScore();
  }

  fireSessionInfoChangedEvent() {
    this.sessionInfoChangedEventHandlers.fire({
      name: this.name,
      score: this.score,
      linesCleared: this.linesCleared,
      level: this.level,
    });
  }

  updateScore(linesCleaned) {
    this.linesCleared += linesCleaned;
    this.score += SCORE_FOR_LINE[linesCleaned] * (this.level + 1);
    const level = Math.floor(this.linesCleared / 10);
    if (level < MAX_LEVEL) {
      this.level = level;
    }
    this.fireSessionInfoChangedEvent();
  }

  resetScore() {
    this.level = 0;
    this.score = 0;
    this.linesCleared = 0;
    this.fireSessionInfoChangedEvent();
  }

  delay() {
    return DELAY_FOR_LEVEL[this.level];
  }
}