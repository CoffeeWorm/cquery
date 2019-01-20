const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
let app = new Koa();
let router = new Router();

['get', 'post', 'delete', 'put', 'patch', 'options'].forEach(item => {
  router[item]('/' + item,
  ctx => {
    ctx.body = { method: item };
  });
});

app.use(serve(path.join(__dirname, './src')));
app.use(serve(path.resolve(__dirname, '../dist')));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen('8001', () => {
  console.log('test server is running at 8001 port.');
});
