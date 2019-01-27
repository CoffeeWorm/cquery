export default function debounce(func, thisArg, timer) {
  let timeoutId;
  return function() {
    let args = [].slice.call(arguments);
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
      func.apply(thisArg, args);
    }, timer || 300);
  };
}
