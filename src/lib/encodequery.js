import isUtil from './isutil';

export default function encodeQuery(obj) {
  if (!isUtil.isObject(obj)) {
    throw new Error('The parameter is must be a object');
  }
  let result = [];
  Object.keys(obj).forEach(item => {
    let str = !isUtil.isUndefined(obj[item])
      ? `${encodeURI(item)}=${encodeURI(obj[item])}`
      : `${encodeURI(item)}`;
    result.push(str);
  });
  return result.join('&');
}
