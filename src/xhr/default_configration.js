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
let defaultConfig = {
  url: '',
  method: HTTP_METHOD[1],
  async: true,
  responseType: 'json',
  user: undefined,
  password: undefined,
  headers: {
    Accept: `${MIME.JSON}, ${MIME.TEXT}, ${MIME.ANY}`
  },
  withCredentials: undefined,
  onDownloadProgress: undefined,
  onUploadProgress: undefined,
  data: {},
  query: {}
};
export default defaultConfig;
