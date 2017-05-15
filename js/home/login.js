define(['bootstrap','jquery','jquery_form','jquery_cookie','util','nprogress'],function(ud1,$,ud2,ud3,util,nprogress){
  // console.log("111")
  //虚拟进度条开始与结束。。
  nprogress.start();
  $(function(){
    nprogress.done();
  })

  //依靠util模块载入齿轮图。。
  var returns = util({
		// 'checkLoginStatus': [],登录页面不要检测
		'loading': []
	});



  $('#login-form').ajaxForm({//表单点击登录提交。另一个提交应该与onsubmit直接提交
    success:function(data){
      console.log(data);
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