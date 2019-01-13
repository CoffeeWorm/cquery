import isUtils from './isUtil';

export default function normalizeProperties(obj, name) {
  if (!isUtils.isObject(obj)) {
    throw new Error('First parameter is must be a object!');
  }
  Object.keys(obj).forEach(item => {
    if (item != name && item.toLowerCase() == name.toLowerCase()) {
      obj[name] = obj[item];
      delete obj[item];
    }
  });
}
