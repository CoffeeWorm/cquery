import isUtil from './isutil';

export default function encodeQuery(obj) {
  if (!isUtil.isObject(obj)) {
    throw new Error('The parameter is must be a object');
  }
  let result = [];
  Object.keys(obj).forEach(item => {
    let str = `${encodeURIComponent(item)}=${
      isUtil.isUndefined(obj[item]) ? '' : encodeURIComponent(obj[item])
    }`;
    result.push(str);
  });
  return result.join('&');
}
