export {EventHandler};

class Event {
  constructor(name, args) {
    this.name = name;
    this.args = args;
  }

  get(key) {
    return this.args[key];
  }
}

class EventHandler {
  constructor(name) {
    this.name = name;
    this.subscribers = new Map();
  }

  addListeners(...listeners) {
    for (let i = 0; i < listeners.length; ++i) {
      this.subscribers.set(listeners[i], listeners[i]);
    }
  }

  removeListener(listener) {
    this.subscribers.delete(listener);
  }

  call(args = {}) {
    for (let [key, value] of this.subscribers) {
      value(new Event(this.name, args));
    }
  }

}