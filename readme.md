# cquery

cquery 是一个浏览器端工具集。其集我毕生绝学（其实也就一年(=￣ ω ￣=)），包含了很多前端常用方法。

## 安装方法

```bash
  npm install git+https://github.com/CoffeeWorm/cquery.git
```

或者直接到我的[github](https://github.com/CoffeeWorm/cquery.git)下载

## 使用方法

默认提供 ES module 的引用方式。在使用 webpack 的情况下也可使用 CommonJS 规范引用。

```javascript
import cquery from 'cquery';
```

也可以按需引用某个你需要的方法

> P.S.按需引入的方法对于低版本浏览器没有支持，需要在目标项目打包时使用 babel 处理

```javascript
import debounce from 'cquery/src/lib/debounce';
import ajax from 'cquery/src/xhr/ajax';
```

直接在 html 文件中使用打包文件，这时会暴露出全局变量 'cquery'

```html
<script src="<你下载的路径>/dist/cquery[.min].js"></script>
```
## polyfill

当你直接引用打包后的文件时，已经对浏览器做过兼容。而当你使用ES module的方式时，由于引用的文件没有使用Babel处理，需要在你的项目webpack配置中添加相关配置，如：
```javascript
module: {
  rules:[
    {
      test: /\.js(x?)$/
      include: [/src/, /node_modules\/cuqery/],
      use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
    }
  ]
}
```

## 包含方法

#### 基于 Promise 的 Ajax

##### 常规用法

```javascript
  cuqery.ajax(<config>).then(response=>{
    // deal with response
  })


  cuqery.ajax(url, <config>).then(response=>{
    // deal with response
  })

  cuqery.ajax.<http_method>(url, <config>).then(response=>{
    // deal with response
  })
```

##### config 详解

> 有以下配置项，且展示的为默认值

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

#### EventBus

订阅发布者模式是软件开发中常用的设计模式，cquery 中提供了一个基于 class 语法的订阅管理中心，使用者可灵活配置。

> 订阅管理中心的使用方式

```javascript
  import cquery from 'cquery';
  let { eventBus } = cquery;
  // 订阅事件
  eventBus.on('<name>', func);
  // 订阅一个一次性事件
  evetBus.once('<name>', func);
  // 发布事件
  eventBus.emit('<name>', [param]);
  // 取消某个事件对应方法的订阅
  evetBus.del('name', func);
  // 事件对象
  {
    eventName: '<name>'
    ...yourParam
  }
```

> 订阅管理中心类的使用方法(观察者模式)

```javascript
import cquery from 'cquery';
const { EventBus } = cquery; //注意大小写
class YouClass extends EventBus {
  constructor() {
    this.on();
    this.once();
    this.del();
    this.emit();
  }
}

// 或者直接使用原型链
var a = {}
a.__proto__ = new EventBus();

function YouClass(){}
YouClass.prototype = new EventBus();
// 还有其他你能想到继承形式都可以
```

#### localStorage的封装
使用原生setItem和getItem容易导致很多问题, 如：key重复导致数据出错、不同类型的持久化内容平级存储、localStorage存满后抛异常导致js线程执行中断等等。

规范化的使用localStorage完全可以处理这些问题。

本方法会将所有数据存在一个key中，数据存放在该可以对应的一个数组中(与MongoDB的Collection类似)，如果数据没有id的话会使用当前时间戳作为id。

当然不同业务线（功能模块），可以使用不同的key（类似于MongoDB中不同的Collection），分别管理自己的数据。
> 使用方式
```javascript
  import cquery from 'cquery';
  /* 使用默认key */
  const { ls } = cquery;

  // 存储一条数据
  ls.setOne({});
  // 把一个对象数组的内容放入localStorage
  ls.set([]);
  // 用新数据覆盖所有数据的存储
  ls.coverSet({}||[]);
  // 删除一条id对应的数据
  ls.del(id);
  // 得到全部数据
  ls.get();
  //根据id得到一条数据
  ls.getOne(id);
  // 清空数据
  ls.clear();
/* 自定义Key */
const { LocalStorageUtil } = cquery,
  ls = new LocalStorageUtil('YOU OWN KEY');

/* 如果你觉得部分方法不好呢， 也可以拓展一下 */
class LS extends LocalStorageUtil {
  constructor(){
    super('Key');
  }
  // 添加更多逻辑
  set(arr){
    /* your code start */
    /* your code end */
    super.set(arr);
    /* your code start */
    /* your code end */
  }

  // 整体使用自己的逻辑
  clear(){
    /* your code here*/ 
  }

}
```
#### 一些常用方法

> 获取 Node 对象，或是某个 DOM 中的某个 Node 对象

cuqery.\$(selector, node) 或 cquery(selector, node)

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

> HTML 字符创转 DOM

cquery.html2node(str)

已对换行和空白做处理，不会出现 text 节点

> Object 的 toString 方法

cquery.toStr()

> 对 html 标签字符串的安全转码

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

> url query 部分 String Obeject 转换

cquery.decodeQuery()

cquery.encodeQuery()

cquery.isSearchParams() 该方法在浏览器支持的情况下基于 URLSearchParams 结果可信

> 对象字段 规范化方法

obj.abc -> obj.Abc

cquery.normalizeProperty(obj, key)
