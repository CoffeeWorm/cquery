export const DEFAULT_CONTYPE_TYPE_NAME = 'Content-Type';
export const MIME = {
  JSON: 'application/json',
  URL_ENCODE: 'application/x-www-form-urlencoded',
  TEXT: 'text/plain',
  ANY: '*/*'
};
export const HTTP_METHOD = [
  'get',
  'post',
  'put',
  'delete',
  'patch',
  'head',
  'connect',
  'options',
  'trace'
];
class DefaultConfig {
  constructor() {
    this.url = '';
    this.method = HTTP_METHOD[0];
    this.async = true;
    this.responseType = 'json';
    this.user = undefined;
    this.password = undefined;
    this.headers = {
      Accept: `${MIME.JSON}, ${MIME.TEXT}, ${MIME.ANY}`
    };
    this.withCredentials = undefined;
    this.onDownloadProgress = undefined;
    this.onUploadProgress = undefined;
    this.data = {};
    this.query = {};
  }
}
export default DefaultConfig;
