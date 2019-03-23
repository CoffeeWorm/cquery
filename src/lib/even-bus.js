import extend from './extend';
import typeCheck from './isutil';
class Event {
  constructor(eventName) {
    this.eventName = eventName;
  }
}
class EventBus {
  constructor() {
    this.multiQueque = {};
  }
  on(name, cb) {
    this.__initQueque(name);
    if (typeCheck.isFunction(cb) && !this.__isHas(name, cb)) {
      this.multiQueque[name].push(cb);
    }
    return this;
  }
  emit(name, event = {}) {
    if (!typeCheck.isArray(this.multiQueque[name])) {
      return this;
    }
    let e = extend(new Event(name), event);

    this.multiQueque[name].forEach(item => {
      if (!typeCheck.isFunction(item)) {
        return;
      }
      item(e);
    });
    return this;
  }
  __initQueque(name) {
    if (!typeCheck.isArray(this.multiQueque[name])) {
      this.multiQueque[name] = [];
    }
    return this;
  }
  __isHas(name, cb) {
    this.__initQueque(name);
    return this.multiQueque[name].includes(cb);
  }
  once(name, cb) {
    let _this = this;
    this.__initQueque(name);
    if (typeCheck.isFunction(cb) && !this.__isHas(name, cb)) {
      let func = function(e) {
        cb.call(this, e);
        _this.del(name, func);
      };
      this.multiQueque[name].push(func);
    }
    return this;
  }
  del(name, cb) {
    let queque = this.multiQueque[name];
    if (!typeCheck.isArray(queque)) {
      return this;
    }
    let index = queque.indexOf(cb);
    queque.splice(index, 1);

    return this;
  }
}
export { EventBus };
export default new EventBus();
