export function htmlEncode(html) {
  let dom = document.createElement('p');
  if (dom.textContent == null) {
    dom.innerText = html;
  } else {
    dom.textContent = html;
  }
  return dom.innerHTML;
}
export function htmlDecode(html) {
  let dom = document.createElement('p'),
    res;
  dom.innerHTML = html;
  if (dom.textContent == null) {
    res = dom.innerText;
  } else {
    res = dom.textContent;
  }
  return res;
}
export default {
  htmlEncode,
  htmlDecode
};
