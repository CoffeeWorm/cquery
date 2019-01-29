import toString from './tostring';

export default function isSupportXHRUpload() {
  let bool =
    toString(new XMLHttpRequest().upload) === '[object XMLHttpRequestUpload]';
  /* eslint-disable */
  isSupportXHRUpload = function() {
    return bool;
  };
  /* eslint-enable */

  return isSupportXHRUpload();
}
