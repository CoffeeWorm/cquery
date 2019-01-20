export default function toString(){
  return Function.prototype.call.bind(Object.prototype.toString);
}