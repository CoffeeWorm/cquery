import isUtils from './lib/isUtil';
import normalizeProperty from './lib/normalizeproperty';
import encodeQuery from './lib/encodequery';
import extend from './lib/extend';

const DEFAULT_CONTYPE_TYPE_NAME = 'Content-Type';

class Cache {
  /**
   * constructor
   * @param {Object} options                  - XHR配置
   * @param {String} options.method           - XHR请求方法，默认GET 
   * @param {Boolean} options.withCredentials - XHR配置cookie, cors适用,不设置不配置
   * @param {Object} options.headers          - XHR请求头，用法 { '<request header>': 'header content' }
   * @param {String} options.url              - XHR请求API, 比有
   * @param {Boolean} options.async           - XHR是否异步，默认true
   */

  constructor(options = {}) {
    if (!isUtils.isString(options.url) && options.url.length <= 0) {
      throw new Error('Request url in XMLHttpRequert configuration.');
    }
    extend(this, options);

    this.headers = this.headers || {};
    normalizeProperty(this.headers || {}, DEFAULT_CONTYPE_TYPE_NAME);
    this.xhr = new XMLHttpRequest();
    return new Promise((rel, rej) => {
      this.xhr.onreadystatechange = this.onreadystatechange(rel, rej);
      this.open()
        .setHeaders()
        .send();
    });
  }
  normalizeQuery() {
    let res = '';
    if ((this.method || 'get').toLowerCase() === 'get') {
      res = encodeQuery(this.query || {});
    }
    return res;
  }
  normalizeBody() {
    let result = '', data = this.data || '';
    let contentType =
      this.headers[DEFAULT_CONTYPE_TYPE_NAME] || 'application/json';
    switch (contentType) {
      case /application\/json/.test(contentType):
        result = JSON.stringify(data);
        break;
      case /application\/x-www-form-urlencoded/.test(contentType):
        result = encodeQuery(data);
        break;
      default:
        result = data;
        break;
    }

    return result;
  }
  onreadystatechange(rel, rej) {
    let xhr = this.xhr;
    return () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let str = '';
        switch ((this.dataType || 'json').toLowerCase()) {
          case 'json':
            str = JSON.parse(xhr.responseText);
            break;
          default:
            str = xhr.responseText;
            break;
        }
        rel && rel(str);
      }
      if (xhr.readyState === 4 && xhr.status !== 200) {
        rej && rej(xhr.status);
      }
    };
  }
  setHeaders() {
    if (!isUtils.isObject(this.headers)) {
      return this;
    }
    Object.keys(this.headers).forEach(item => {
      this.xhr.setRequestHeader(item, this.headers[item]);
    });
    this.withCredentials && (this.xhr.withCredentials = true);
    return this;
  }
  send() {
    this.xhr.send(this.normalizeBody());
    return this;
  }
  open() {
    this.xhr.open(
      this.method || 'get',
      this.url + this.normalizeQuery(this.query),
      this.async || true
    );
    return this;
  }
}

let ajax = options => {
  return new Cache(options);
};

['get', 'post'].forEach(it => {
  ajax[it] = (url = '/', options = {}) => {
    options.method = it;
    options.url = url;
    return new Cache(options);
  };
});
export default ajax;
