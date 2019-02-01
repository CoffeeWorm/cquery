export default function timeFormat(
  timestamp = +new Date(),
  template = 'yyyy-MM-dd hh:mm:ss'
) {
  const timer = new Date(timestamp);
  const reg = {
    y: /y+/,
    M: /M+/,
    d: /d+/,
    h: /h+/,
    m: /m+/,
    s: /s+/
  };
  const time = {
    y: timer.getFullYear().toString(),
    M: (timer.getMonth() + 1).toString(),
    d: timer.getDate().toString(),
    h: timer.getHours().toString(),
    m: timer.getMinutes().toString(),
    s: timer.getSeconds().toString()
  };
  Object.keys(reg).forEach(item => {
    template = template.replace(reg[item], it => {
      let res;
      let tmp = it.length - time[item].length;
      if (tmp > 0) {
        res = new Array(tmp + 1).join('0') + time[item];
      } else {
        res = time[item].substr(-it.length);
      }
      return res;
    });
  });
  return template;
}
