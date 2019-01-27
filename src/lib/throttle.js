export function throttle(func, thisArg, timer) {
  let flag = false;
  return function() {
    let args = [].slice.call(arguments);
    if (!flag) {
      flag = true;
      setTimeout(function() {
        flag = false;
        func.apply(thisArg, args);
      }, timer || 300);
    }
  };
}
export function throttle2(func, thisArg, timer) {
  let flag = false;
  return function() {
    let args = [].slice.call(arguments);
    if (!flag) {
      flag = true;
      func.apply(thisArg, args);
      setTimeout(function() {
        flag = false;
      }, timer || 300);
    }
  };
}
export default {
  throttle,
  throttle2
};
