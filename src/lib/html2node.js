export default function html2node(str) {
  const el = document.createElement('div');

  str = str
    .trim()
    .replace(/\r|\n/g, '')
    .replace(/>(\s+)</g, (matcher, $1) => {
      return matcher.replace($1, '');
    });
  el.innerHTML = str;
  return el.childNodes[0];
}
