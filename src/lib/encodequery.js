import isUtils from './isUtil';
export default function encodeQuery(obj){
  if (!isUtils.isObject(obj)) {
    throw new Error('The parameter is must be a object');  
  }
  let result = '';
  Object.keys(obj).forEach(item => {
    result += `${encodeURI(item)}=${encodeURI(obj[item]) || ''}&`;
  });
  return result.substr(0, result.length - 1);
}