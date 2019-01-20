import toString from './tostring';

export default function isSupportXHRUpload(){
  return toString(new XMLHttpRequest().upload) === '[object XMLHttpRequestUpload]';
}