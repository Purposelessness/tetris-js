import {BLOCK_SIZE, COLORS, HEIGHT, WIDTH} from '../constants/config.js';
import {
  MOVEMENT_DIRECTION,
  ROTATION_DIRECTION,
} from '../constants/sessionConfig.js';
import {Session} from './session.js';
import {safeCall as safeCallImpl} from '../utilities.js';

export {Engine};

class Engine {
  static safeCall(obj, func, ...params) {
    safeCallImpl('Engine', obj, func, ...params);
  }

  constructor(context) {
    this.session = null;
    this.ctx = context;

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

    this.configureContext();
  }

  configureContext() {
    this.ctx.canvas.width = WIDTH * BLOCK_SIZE;
    this.ctx.canvas.height = HEIGHT * BLOCK_SIZE;
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  run() {
    this.session = new Session();
    this.callNextTick();
  }

  tick() {
    this.onMovementEvent(MOVEMENT_DIRECTION.down, true);

    this.callNextTick();
  }

  callNextTick() {
    setTimeout(() => {
      this.tick();
    }, 500);
  }

  onMovementEvent(direction, isForced = false) {
    Engine.safeCall(this.session, Session.prototype.onMovementEvent,
        direction, isForced);
    this.redraw();
  }

  onRotationEvent(direction) {
    Engine.safeCall(this.session, Session.prototype.onRotationEvent, direction);
    this.redraw();
  }

  redraw() {
    if (this.session === null) {
      console.warn('[Engine] Cannot draw empty session');
      return;
    }

    let view = this.session.view();
    for (let j = 0; j < view.length; ++j) {
      for (let i = 0; i < view[j].length; ++i) {
        const colorIndex = view[j][i];
        this.ctx.fillStyle = COLORS[colorIndex];
        this.ctx.fillRect(i, j, 1, 1);
      }
    }
  }

  resetSession() {
    this.session = new Session();
  }

  onKeydown(event) {
    if (event.key in this.keymap) {
      this.keymap[event.key].call(this);
    }
  }
}