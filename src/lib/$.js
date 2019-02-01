export default function $(selector, node) {
  if (document.querySelector) {
    return (node || document).querySelector(selector);
  } else {
    //不兼容
    selector = selector.match(/^\.|#/) ? selector.slice(1) : selector;
    return (node || document).getElementsByTagName(selector)[0];
  }
}
