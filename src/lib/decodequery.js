export default function decodeQuery(query) {
  let res = {};
  if (!query) {
    return res;
  }
  query.split('&').forEach(item => {
    let param = item.split('=');
    res[decodeURIComponent(param[0])] = param[1]
      ? decodeURIComponent(param[1])
      : undefined;
  });
  return res;
}
