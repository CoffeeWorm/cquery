class Cache {
  constructor(options = {}) {
    this.data = options.data;
    this.dataType = options.dataType || 'json';
    this.async = options.async === undefined ? true : options.async;
    this.headers = options.headers;
    this.url = options.url || '/';
    this.withCredentials = options.withCredentials || false;
    this.method = options.method || 'GET';
    this.xhr = new XMLHttpRequest();

    return new Promise((rel, rej) => {
      this.xhr.onreadystatechange = this.onreadystatechange(rel, rej);
      this.open()
        .setHeaders()
        .send();
    });
  }
  format(keyValue) {
    let result = '';
    let contentType = this.headers
      ? this.headers['Content-Type'] ||
        this.headers['content-type'] ||
        this.headers['CONTENT-TYPE']
      : 'application/json';
    if (this.data == null) {
      return;
    }
    if (/applications\/json/.test(contentType)) {
      result = JSON.stringify(this.data);
    }

    if (/application\/x-www-form-urlencoded/.test(contentType)) {
      Object.keys(keyValue).forEach(item => {
        result += `${encodeURI(item)}=${encodeURI(keyValue[item]) || ''}&`;
      });
    }
    this.data = result.substr(0, result.length - 1);
    return this.data;
  }
  onreadystatechange(rel, rej) {
    let xhr = this.xhr;
    return () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let str = '';
        switch (this.dataType.toLowerCase()) {
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
    if (this.headers == undefined) {
      return this;
    }
    Object.keys(this.headers).forEach(item => {
      this.xhr.setRequestHeader(item, this.headers[item]);
    });
    this.withCredentials && (this.xhr.withCredentials = true);
    return this;
  }
  send() {
    this.format();
    this.data === undefined && (this.data = null);
    this.xhr.send(this.data);
    return this;
  }
  open() {
    this.xhr.open(this.method, this.url, this.async);
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
