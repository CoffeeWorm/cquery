import ajax from './ajax';
let _ = {
  $(selector, node) {
    if (document.querySelector) {
      return (node || document).querySelector(selector);
    } else {
      //不兼容
      selector = selector.match(/^\.|#/) ? selector.slice(1) : selector;
      return (node || document).getElementsByTagName(selector)[0];
    }
  },
  extend(...items) {
    let tar = items[0];
    if (!this.isObject(tar)) {
      return {};
    }
    items.forEach(item => {
      if (item === tar) {
        return;
      }
      if (!this.isObject(item)) {
        throw new Error(tar + ' is not a Object');
      }
      Object.keys(item).forEach(it => {
        tar[it] = item[it];
      });
    });
    return tar;
  },
  isArray(arg) {
    return this.toString(arg) === '[object Array]';
  },
  isObject(arg) {
    return this.toString(arg) === '[object Object]';
  },
  isBoolean(arg) {
    return this.toString(arg) === '[object Boolean]';
  },
  isNumber(arg) {
    return this.toString(arg) === '[object Number]';
  },
  isString(arg) {
    return this.toString(arg) === '[object String]';
  },
  isNull(arg) {
    return this.toString(arg) === '[object Null]';
  },
  isUndefined(arg) {
    return this.toString(arg) === '[object Undefined]';
  },
  isFunction(arg) {
    return this.toString(arg) === '[object Function]';
  },
  toString: Function.prototype.call.bind(Object.prototype.toString),
  hasClass(node, className) {
    const pattern = new RegExp(className);
    return pattern.test(node.className);
  },
  addClass(node, className) {
    if (!this.hasClass(node, className)) {
      node.className += ' ' + className;
    }
    return this;
  },
  delClass(node, className) {
    if (this.hasClass(node, className)) {
      const tmpName = node.className.replace(className, '');
      node.className = tmpName.replace(/[ ]{2,}/g, ' ').trim();
    }
    return this;
  },
  toggleClass(node, className) {
    if (this.hasClass(node, className)) {
      this.delClass(node, className);
    } else {
      this.addClass(node, className);
    }
  },
  html2node(str) {
    str = str.trim().replace(/(\r)|(\n)/g, '');
    const el = document.createElement('div');
    el.innerHTML = str;
    return el.childNodes[0];
  },
  formatTime(timestamp = +new Date(), template = 'yyyy-MM-dd hh:mm:ss') {
    const timer = new Date(timestamp);
    const reg = {
      y: /y+/,
      M: /M+/,
      d: /d+/,
      h: /h+/,
      m: /m+/,
      s: /s+/
    };
    const time = {
      y: timer.getFullYear().toString(),
      M: (timer.getMonth() + 1).toString(),
      d: timer.getDate().toString(),
      h: timer.getHours().toString(),
      m: timer.getMinutes().toString(),
      s: timer.getSeconds().toString()
    };
    Object.keys(reg).forEach(item => {
      template = template.replace(reg[item], it => {
        let res;
        let tmp = it.length - time[item].length;
        if (tmp > 0) {
          res = new Array(tmp + 1).join('0') + time[item];
        } else {
          res = time[item].substr(-it.length);
        }
        return res;
      });
    });
    return template;
  },
  ajax
};

export default _;
