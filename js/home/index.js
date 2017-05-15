define(['aside','header','util','bootstrap','jquery','jquery_cookie','nprogress'],function(ud1,ud2,util,ud3,$,ud4,nprogress){
  // console.log('首页执行');
  //获取到了用户信息，即已经登录了，不用管了；
  var returns = util({
		'checkLoginStatus': [],
		'loading': []
	});
 // 销毁网站加载进度条
	nprogress.done();
})