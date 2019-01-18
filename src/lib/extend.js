import isUtil from './isutil';

export default function extend(...items) {
  let tar = items[0];
  if (!isUtil.isObject(tar)) {
    return {};
  }
  items.forEach(item => {
    if (item === tar) {
      return;
    }
    if (!isUtil.isObject(item)) {
      throw new TypeError(tar + ' is not a object');
    }
    Object.keys(item).forEach(it => {
      tar[it] = item[it];
    });
  });
  return tar;
}