import XHR from './xhr';
import isSupportUpload from '../lib/isSupportXHRUpload';
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
ajax.isSupportUpload = isSupportUpload;
export default ajax;
