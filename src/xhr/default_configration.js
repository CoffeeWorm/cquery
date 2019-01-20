export const DEFAULT_CONTYPE_TYPE_NAME = 'Content-Type';
export const MIME = {
  JSON: 'application/json',
  URL_ENCODE: 'application/x-www-form-urlencoded',
  TEXT: 'text/plain',
  ANY: '*/*'
};

let defaultConfig = {
  url: '',
  method: 'GET',
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
defaultConfig.headers[DEFAULT_CONTYPE_TYPE_NAME] = MIME.JSON;
export default defaultConfig;
