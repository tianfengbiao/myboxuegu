define(['bootstrap','jquery','jquery_form','jquery_cookie','aside','header','util','nprogress'],function(ud1,$,ud2,ud3,ud4,ud5,util,nprogress){
 var returns = util({
		'checkLoginStatus': [],
		'loading': []
	});
//提交创建后跳转页面
$('form').ajaxForm(function(){
  location.href='/html/course/course_add_step1.html?cs_id'+data.result.cs_id;//后台拿到的课程id。传给step1页面以便获取。找对应数据
})




 // 销毁网站加载进度条
	nprogress.done();
})