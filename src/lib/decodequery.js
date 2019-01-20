export default function decodeQuery(query = '', res = {}) {
  query.split('&').forEach(item => {
    let param = item.split('=');
    res[param[0]] = param[1];
  });
  return res;
}
