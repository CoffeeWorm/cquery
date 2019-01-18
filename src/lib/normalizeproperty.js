import isUtil from './isutil';

export default function normalizeProperties(obj, name) {
  if (!isUtil.isObject(obj)) {
    throw new Error('First parameter is must be a object!');
  }
  Object.keys(obj).forEach(item => {
    if (item != name && item.toLowerCase() == name.toLowerCase()) {
      obj[name] = obj[item];
      delete obj[item];
    }
  });
}
