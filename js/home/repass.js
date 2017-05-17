define(['aside','header','util','jquery_form','jquery','jquery_cookie','nprogress'],function(ud1,ud2,util,ud3,$,ud4,nprogress){
 
  var returns = util({
		'checkLoginStatus': [],
		'loading': []
	});


$('.repass>form').on('submit',function(e){
	e.preventDefault();
	console.log(111)
	if($('#password').val()===$('#okPassword').val()){
		$(this).ajaxSubmit(function(){
			$('#logout').trigger('click');
		})
	}else {
			alert('新密码和确定密码不一致！！');
		}
return false;
})







 // 销毁网站加载进度条
	nprogress.done();
})