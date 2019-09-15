import typeCheck from './isutil';
import tostr from './tostring';
function isQuote(tar) {
  return typeof tar === 'object' && tar != null;
}

/**
 * 深拷贝  暂不支持拷贝Symbol
 * @param  {...any} objs 要合并深拷贝的数组或对象
 * @return {Array|Object} 结果
 */
export default function (...objs) {
  let hash = [];

  function extendDeep(hash, ...objs) {
    let result = typeCheck.isObject(objs[0]) ? {} : [];


    objs.forEach(obj => {
      if (tostr(result) !== tostr(obj)) {
        throw new TypeError('Can not deep extend different types of variable!');
      }

      for (let key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj,key)) {
          continue ;
        }

        let target = obj[key];
        // 引用处理
        if (isQuote(target)) {
          let i = hash.indexOf(target);
          // 是循环引用
          if (~i) {
            result[key] = hash[i];
            continue;
          }
          // 不是循环引用
          hash.push(target);
          result[key] = extendDeep(hash, target);
          continue;
        }

        // 基础类型处理
        result[key] = target;
      }
    });

    return result;
  }

  return extendDeep(hash, ...objs);
}
