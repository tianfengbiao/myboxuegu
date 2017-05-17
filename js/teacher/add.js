define(['aside','header','util','bootstrap','jquery','jquery_cookie','nprogress','jquery_form'],function(ud1,ud2,util,ud3,$,ud4,nprogress,ud5){
 
  var returns = util({
		'checkLoginStatus': [],
		'loading': []
	});
	// 表单转ajax提交，成功后跳转到讲师列表页
	$('.teacher-add>form').ajaxForm(function(){
		location.href='/html/teacher/list.html';
	})




 // 销毁网站加载进度条
	nprogress.done();
})