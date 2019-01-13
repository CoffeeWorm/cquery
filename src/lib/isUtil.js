const types = [
  'Array',
  'Function',
  'String',
  'Number',
  'Object',
  'Boolean',
  'Null',
  'Undefined',
  'Symbol'
];
const isUtils = {};
types.forEach(type => {
  isUtils[`is${type}`] = arg => {
    return Object.prototype.toString.call(arg) === `[object ${type}]`;
  };
});

export default isUtils;
