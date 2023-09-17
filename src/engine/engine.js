import {
  MOVEMENT_DIRECTION,
  ROTATION_DIRECTION,
} from '../constants/sessionConfig.js';
import {GameSession} from './gameSession.js';
import {safeCall as safeCallImpl} from '../utilities/utilities.js';
import {ViewManager} from './viewManager.js';
import {Session} from './session.js';

export {Engine};

class Engine {
  onSessionEndedEvent = () => {
    this.gameSession = null;
    console.info('[Engine] Session finished');
  };

  static safeCall(obj, func, ...params) {
    safeCallImpl('Engine', obj, func, ...params);
  }

  constructor(document) {
    const name = localStorage.getItem('name');
    this.session = new Session(name);
    this.viewManager = new ViewManager(document);
    this.session.sessionInfoChangedEventHandlers.addListeners(
        this.viewManager.onSessionInfoChanged);
    this.gameSession = null;

    this.keymap = {
      'ArrowLeft': () => {
        this.onMovementEvent(MOVEMENT_DIRECTION.left);
      }, 'ArrowRight': () => {
        this.onMovementEvent(MOVEMENT_DIRECTION.right);
      }, 'ArrowDown': () => {
        this.onMovementEvent(MOVEMENT_DIRECTION.down);
      },
      'x': () => {
        this.onRotationEvent(ROTATION_DIRECTION.clockwise);
      },
      'z': () => {
        this.onRotationEvent(ROTATION_DIRECTION.counterclockwise);
      },
    };
  }

  run() {
    clearTimeout(this.timeoutId);

    this.gameSession = new GameSession();
    this.gameSession.sessionEndedEventHandler.addListeners(
        this.onSessionEndedEvent);
    this.gameSession.redrawEventHandler.addListeners(
        this.viewManager.onRedrawEvent);
    this.gameSession.nextTetrominoGeneratedEventHandler.addListeners(
        this.viewManager.onNextTetrominoGenerated);
    this.gameSession.linesCleanedEventHandler.addListeners(
        this.session.onLinesCleanedEvent);

    this.session.resetScore();
    this.gameSession.setTetromino();
    this.callNextTick();
  }

  tick() {
    if (this.gameSession === null) return;
    this.onMovementEvent(MOVEMENT_DIRECTION.down, true);
    this.callNextTick();
  }

  callNextTick() {
    this.timeoutId = setTimeout(() => {
      this.tick();
    }, this.session.delay());
  }

  onMovementEvent(direction, isForced = false) {
    Engine.safeCall(this.gameSession, GameSession.prototype.onMovementEvent,
        direction, isForced);
  }

  onRotationEvent(direction) {
    Engine.safeCall(this.gameSession, GameSession.prototype.onRotationEvent,
        direction);
  }

  onKeydown(event) {
    if (event.key in this.keymap) {
      this.keymap[event.key].call(this);
    }
  }
}