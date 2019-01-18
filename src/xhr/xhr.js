import isUtil from '../lib/isutil';
import normalizeProperty from '../lib/normalizeproperty';
import encodeQuery from '../lib/encodequery';
import extend from '../lib/extend';
import DEFAULT_CONTYPE_TYPE_NAME from './default_configration';
import defaultConfig from './default_configration';
import MIME from './default_configration';

class XHR {
  /**
   * constructor
   * @param {Object} config                  - XHR配置
   * @param {String} config.method           - XHR请求方法，默认GET
   * @param {Boolean} config.withCredentials - XHR配置cookie, cors适用,不设置不配置
   * @param {Object} config.headers          - XHR请求头，用法 { '<request header>': 'header content' }
   * @param {String} config.url              - XHR请求API, 必须有
   * @param {Boolean} config.async           - XHR是否异步，默认true
   */

  constructor(config = {}) {
    if (!isUtil.isString(config.url) && config.url.length < 1) {
      throw new Error('Request url in XMLHttpRequert configuration.');
    }
    extend(this, defaultConfig, config);

    normalizeProperty(this.headers || {}, DEFAULT_CONTYPE_TYPE_NAME);
    this.xhr = new XMLHttpRequest();
    return new Promise((rel, rej) => {
      this.xhr.onreadystatechange = this.onreadystatechange(rel);
      this.xhr.onerror = () => {
        rej(new Error('Network Error!'));
      };
      this.xhr.ontimeout = () => {
        rej(new Error('Time Out!'));
      };
      this.setConfig()
        .open()
        .setHeaders()
        .send();
    });
  }
  normalizeQuery() {
    let res = '';
    let reg = /^(\S+?)(\?\S*)?$/;
    let urlInfo = reg.exec(this.url);
    let path = urlInfo[1];
    let query = urlInfo[2];

    if (this.method.toLowerCase() === 'get') {
      res = encodeQuery(this.query);
    }
    res = query && query.length > 1 ? query + '&' + res : '?' + res;
    return path + res;
  }
  normalizeBody() {
    let result = '',
      data = this.data;
    let contentType = this.headers[DEFAULT_CONTYPE_TYPE_NAME];

    switch (true) {
      case new RegExp(MIME.JSON).test(contentType):
        result = JSON.stringify(data);
        break;
      case new RegExp(MIME.URL_ENCODE).test(contentType):
        result = encodeQuery(data);
        break;
      default:
        result = data;
        break;
    }
    return result;
  }
  onreadystatechange(rel) {
    let xhr = this.xhr;
    return () => {
      if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        rel &&
          rel(
            !this.responseType || this.responseType === 'text'
              ? xhr.responseText
              : xhr.response
          );
      }
    };
  }
  isSupportUpload() {
    return isUtil.isObject(this.xhr.upload);
  }
  setConfig() {
    this.withCredentials && (this.xhr.withCredentials = true);
    this.onDownloadProgress &&
      this.xhr.addEventListener('progress', this.onDownloadProgress);
    try {
      this.xhr.responseType = this.responseType;
    } catch (e) {
      console.error(e);
    }
    this.isSupportUpload() &&
      this.onUploadProgress &&
      this.xhr.upload.addEventListener('progress', this.onUploadProgress);
    return this;
  }
  setHeaders() {
    if (!isUtil.isObject(this.headers)) {
      return this;
    }
    Object.keys(this.headers).forEach(item => {
      this.xhr.setRequestHeader(item, this.headers[item]);
    });
    return this;
  }
  send() {
    this.xhr.send(this.normalizeBody());
    return this;
  }
  open() {
    this.xhr.open(
      this.method,
      this.normalizeQuery(),
      this.async,
      this.user,
      this.password
    );
    return this;
  }
  abort() {
    this.xhr.abort();
  }
}
export default XHR;
