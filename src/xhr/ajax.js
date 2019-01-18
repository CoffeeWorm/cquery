import XHR from './xhr';
import isUtil from '../lib/isutil';

let ajax = function(config) {
  return new XHR(config);
};

['get', 'post', 'put', 'patch', 'delete'].forEach(method => {
  ajax[method] = (url = '/', config = {}) => {
    config.method = method;
    config.url = url;
    return new XHR(config);
  };
});
ajax.isSupportUpload = () => isUtil.isObect(new XMLHttpRequest().upload);
export default ajax;
