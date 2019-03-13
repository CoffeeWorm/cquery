# cquery

cquery是一个浏览器端工具集。其包含了很多前端常用方法。

## 安装方法

```bash
  npm install git+https://github.com/CoffeeWorm/cquery.git
```
或者直接到我的[github](https://github.com/CoffeeWorm/cquery.git)下载

## 使用方法
默认提供ES module的引用方式。在使用webpack的情况下也可使用CommonJS规范引用。
```javascript
  import cquery from 'cquery';
```
也可以按需引用某个你需要的方法
```javascript
  import debounce from 'cquery/src/lib/debounce';
  import ajax from 'cquery/src/xhr/ajax';
```
直接在html文件中使用打包文件，这时会暴露出全局变量 'cquery'
```html
  <script src="<你下载的路径>/dist/cquery[.min].js"></script>
```
## 包含方法
#### 基于Promise的Ajax

##### 常规用法

```javascript
  cuqery.ajax(<config>).then(response=>{
    // deal with response
  })

    
  cuqery.ajax(url, <config>).then(response=>{
    // deal with response
  })

  cuqery.[<http_method>](url, <config>).then(response=>{
    // deal with response
  })
```
##### config 详解

```javascript
{
  url：'/',                                             // 请求地址
  method：'get',                                        // 请求方法
  async：true,                                          // 是否异步
  responseType：'json',                                 // response的类型
  user：undefined,                                      // 用户名   好像也没人用这个  规范里面有就加上了
  password：undefined,                                  // 密码   好像也没人用这个  规范里面有就加上了
  headers：{                                            // 请求头配置 key要求与http请求头一致
    Accept: `application/json, text/plain, */*`，
    ['Cotent-Type']: 'application/json'
  },
  withCredentials：undefined,                           // 携带身份信息 cors使用的多
  onDownloadProgress：undefined,                        // ajax 下载文件
  onUploadProgress：undefined,                          // ajax上传文件
  data：{},                                             // body 中的数据，自动根据content-type 转码
  query：{}                                             // url的query部分 自动转码
}

```

##### 上传检测方法

```javascript
  /**
   * @return {Boolean} 是否支持 
   */
  cquery.isSupportUpload();
```

#### 一些常用方法

> 获取Node对象，或是某个DOM中的某个Node对象

cuqery.$(selector, node) 或 cquery(selector, node)

> 防抖与节流

cquery.debounce(function, thisArg, time)

第一次不触发
cuqery.throttle(func, thisArg, timer)

第一次触发
cuqery.throttle2(func, thisArg, timer)

> 类型判断

cquery.isObject()

cquery.isArray()

...
> 深浅复制

浅复制

cquery.extend(obj1, obj2, ...)

深复制

cquery.cloneDeep(obj1, obj2, ...);


P.S. 以上两个方法 ，传参后面的覆盖前面的


> 时间格式化

cquery.timeFormat(
  timestamp,
  template
)

模板样例：

  'yyyy-MM-dd hh:mm:ss'

> HTML字符创转DOM

cquery.html2node(str)

已对换行和空白做处理，不会出现text节点

> Object的toString方法

cquery.toStr()

> 对html标签字符串的安全转码
```
<div> -> &lt;div&gt;
cquery.htmlEncode(htmlstr)

&lt;div&gt; -> <div>  
cquery.htmlDecode(str);
```

> dom class 操作

cquery.hasClass(node, className)

cquery.toggleClass(node, className)

cquery.delClass(node, className)

cquery.addClass(node, className)

> url query 部分String Obeject转换

cquery.decodeQuery()

cquery.encodeQuery()


cquery.isSearchParams()     该方法在浏览器支持的情况下基于 URLSearchParams 结果可信

> 对象字段 规范化方法

obj.abc -> obj.Abc

cquery.normalizeProperty(obj, key)

