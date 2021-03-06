import isUtil from '../lib/isutil';
import normalizeProperty from '../lib/normalizeproperty';
import encodeQuery from '../lib/encodequery';
import decodeQuery from '../lib/decodequery';
import extend from '../lib/extend';
import { DEFAULT_CONTYPE_TYPE_NAME } from './default_configration';
import DefaultConfig from './default_configration';
import { MIME } from './default_configration';
import isSupportXHRUpload from '../lib/issupportxhrupload';
import isURLSearchParams from '../lib/isurlsearchparams';
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
    extend(this, new DefaultConfig(), config);

    normalizeProperty(this.headers, DEFAULT_CONTYPE_TYPE_NAME);
    this.setContentType();
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
  setContentType() {
    let contentType = this.headers[DEFAULT_CONTYPE_TYPE_NAME],
      data = this.data;
    if (contentType) {
      return;
    }
    switch (true) {
      case isUtil.isObject(data):
      case isUtil.isArray(data):
        this.headers[DEFAULT_CONTYPE_TYPE_NAME] = MIME.JSON;
        break;
      case isURLSearchParams(data):
        this.headers[DEFAULT_CONTYPE_TYPE_NAME] = MIME.URL_ENCODE;
        break;
      case isUtil.isFormData(data):
      default:
        break;
    }
  }
  normalizeQuery() {
    let reg = /^(\S+?)(\?(\S*))?$/;
    let urlInfo = reg.exec(this.url);
    let path = urlInfo[1];
    let query = encodeQuery(extend(decodeQuery(urlInfo[3]), this.query));
    return path + (query ? '?' + query : '');
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
  setConfig() {
    this.withCredentials && (this.xhr.withCredentials = true);
    this.onDownloadProgress &&
      this.xhr.addEventListener('progress', this.onDownloadProgress);
    try {
      this.xhr.responseType = this.responseType;
    } catch (e) {
      console.error(e);
    }
    isSupportXHRUpload() &&
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
      this.method.toUpperCase(),
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
