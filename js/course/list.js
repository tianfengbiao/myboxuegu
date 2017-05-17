define(['bootstrap','jquery','jquery_form','jquery_cookie','aside','header','util','nprogress','template'],function(ud1,$,ud2,ud3,ud4,ud5,util,nprogress,template){
 var returns = util({
		'checkLoginStatus': [],
		'loading': []
	});
//渲染模板
$.get('/v6/course',function(data){
	$('.courses').html(template('c-list',data))
})




 // 销毁网站加载进度条
	nprogress.done();
})