export default function extend(...items) {
  let tar = items[0];
  if (!this.isObject(tar)) {
    return {};
  }
  items.forEach(item => {
    if (item === tar) {
      return;
    }
    if (!this.isObject(item)) {
      throw new Error(tar + ' is not a Object');
    }
    Object.keys(item).forEach(it => {
      tar[it] = item[it];
    });
  });
  return tar;
}