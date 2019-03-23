import ajax from './xhr/ajax';
import isUtil from './lib/isutil';
import extend from './lib/extend';
import html from './lib/html';
import throttle from './lib/throttle';
import debounce from './lib/debounce';
import toStr from './lib/tostring';
import eventBus, { EventBus } from './lib/even-bus';
import LocalStorageUtil, { ls } from './lib/ls';
import decodeQuery from './lib/decodequery';
import encodeQuery from './lib/encodequery';
import $ from './lib/$';
import html2node from './lib/html2node';
import klass from './lib/klass';
import timeformat from './lib/timeformat';
import cloneDeep from './lib/extenddeep';
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
  cloneDeep,
  EventBus,
  eventBus,
  ls,
  LocalStorageUtil,
  ...klass,
  ...isUtil,
  ...html,
  ...throttle
};
Object.keys(util).forEach(methodName => {
  cquery[methodName] = util[methodName];
});
export default cquery;
