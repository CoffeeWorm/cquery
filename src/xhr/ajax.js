import XHR from './xhr';
import isUtil from '../lib/isutil';
import isSupportUpload from '../lib/issupportxhrupload';
import { HTTP_METHOD } from './default_configration';

let ajax = function(url, config = {}) {
  if (isUtil.isString(url)) {
    config.url = url;
  }
  if (isUtil.isObject(url)) {
    config = url;
  }
  return new XHR(config);
};

HTTP_METHOD.forEach(method => {
  ajax[method] = (url = '/', config = {}) => {
    config.method = method;
    config.url = url;
    return new XHR(config);
  };
});
ajax.isSupportUpload = isSupportUpload;

export default ajax;
