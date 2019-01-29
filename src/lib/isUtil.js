const types = [
  'Array',
  'Function',
  'String',
  'Number',
  'Object',
  'Boolean',
  'Null',
  'Undefined',
  'Symbol',
  'FormData'
];
const isUtil = {};
types.forEach(type => {
  isUtil[`is${type}`] = arg => {
    return Object.prototype.toString.call(arg) === `[object ${type}]`;
  };
});

export default isUtil;
