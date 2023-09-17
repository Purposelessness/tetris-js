import {
  MOVEMENT_DIRECTION,
  ROTATION_DIRECTION,
} from '../constants/sessionConfig.js';
import {GameSession} from './gameSession.js';
import {safeCall as safeCallImpl} from '../utilities/utilities.js';
import {ViewManager} from './viewManager.js';

export {Engine};

class Engine {
  onSessionEndedEvent = () => {
    this.session = null;
    console.info('[Engine] Session finished');
  };

  static safeCall(obj, func, ...params) {
    safeCallImpl('Engine', obj, func, ...params);
  }

  constructor(document) {
    this.viewManager = new ViewManager(document);
    this.session = null;

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
    this.session = new GameSession();
    this.session.sessionEndedEventHandler.addListeners(
        this.onSessionEndedEvent);
    this.session.redrawEventHandler.addListeners(
        this.viewManager.onRedrawEvent);
    this.session.linesCleanedEventHandler.addListeners(
        this.viewManager.onLinesCleanedEvent);
    this.callNextTick();
  }

  tick() {
    if (this.session === null) return;
    this.onMovementEvent(MOVEMENT_DIRECTION.down, true);
    this.callNextTick();
  }

  callNextTick() {
    setTimeout(() => {
      this.tick();
    }, 500);
  }

  onMovementEvent(direction, isForced = false) {
    Engine.safeCall(this.session, GameSession.prototype.onMovementEvent,
        direction, isForced);
  }

  onRotationEvent(direction) {
    Engine.safeCall(this.session, GameSession.prototype.onRotationEvent, direction);
  }

  onKeydown(event) {
    if (event.key in this.keymap) {
      this.keymap[event.key].call(this);
    }
  }
}