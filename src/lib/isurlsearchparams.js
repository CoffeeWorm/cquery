import decodeQuery from './decodequery';
import encodeQuery from './encodequery';

export default function isURLSearchParams(str) {
  /* eslint-disable */
  isURLSearchParams = window.URLSearchParams
    ? function(str) {
        return new URLSearchParams(str).toString() == str;
      }
    : function(str) {
        return encodeQuery(decodeQuery(str)) == str;
      };

  /* eslint-enable */
  return isURLSearchParams(str);
}
