define(['aside','header','util','bootstrap','jquery','jquery_cookie','nprogress','template','jquery_form'],function(ud1,ud2,util,ud3,$,ud4,nprogress,template,ud5){
 
//  console.log(util);function(methods){}
  var returns = util({
		'checkLoginStatus': [],
		'loading': [],
		'getSearch':['tc_id']
	});
//这样returns={check:ud,load:ud,get:obj}
// 拿到tc_id
	var tcId=returns.getSearch;
	// console.log(tcId);
	$.get('/v6/teacher/edit',{tc_id:tcId},function(data){
		// console.log(template('tc-edit-tpl',data.result));
		$('.teacher-add').append(template('tc-edit-tpl',data.result));
		

		$('.teacher-add>form').ajaxForm({
			data:{tc_id:tcId},
			success:function(){
					location.href = '/html/teacher/list.html';
			}
		})
	})







 // 销毁网站加载进度条
	nprogress.done();
})