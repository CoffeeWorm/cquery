cquery.ajax.get('/get?asd').then(res => {
  console.log(res);
});
cquery.ajax
  .post('/post', {
    data: { a: 1 }
  })
  .then(res => {
    console.log(res);
  });

console.log(cquery.ajax.isSupportUpload());
