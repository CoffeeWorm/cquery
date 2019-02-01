import ajax from './xhr/ajax';
import isUtil from './lib/isutil';
import extend from './lib/extend';
import html from './lib/html';
import throttle from './lib/throttle';
import debounce from './lib/debounce';
import toStr from './lib/tostring';
import decodeQuery from './lib/decodequery';
import encodeQuery from './lib/encodequery';
import $ from './lib/$';
import html2node from './lib/html2node';
import klass from './lib/klass';
import timeformat from './lib/timeformat';

function cquery(selector, node) {
  return $(selector, node);
}
let util = {
  $,
  html2node,
  timeformat,
  toStr,
  ajax,
  extend,
  debounce,
  decodeQuery,
  encodeQuery,
  ...klass,
  ...isUtil,
  ...html,
  ...throttle
};
Object.keys(util).forEach(methodName => {
  cquery[methodName] = util[methodName];
});
export default cquery;
