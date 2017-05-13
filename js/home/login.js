define(['bootstrap','jquery','jquery_form','jquery_cookie','util','nprogress'],function(ud,$,ud,ud,util,nprogress){
  // console.log("111")
  nprogress.start();
  $(function(){
    nprogress.done();
  })
  util.loading();



  $('#login-form').ajaxForm({//一般表单提交。另一个提交应该与onsubmit一起提交
    success:function(data){
      console.log(JSON.stringify(data.result));

      $.cookie('userInfo',JSON.stringify(data.result),{path:'/'});
      location.href='/';
    },
    error:function(){
      alert('登录失败！！！')
    }

  })

  //如果登录跳转首页
  if($.cookie('PHPSESSID')){
    location.href='/';
  }

})