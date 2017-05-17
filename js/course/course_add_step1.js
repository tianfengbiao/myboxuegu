define(['template','jquery','jquery_form','jquery_cookie','aside','header','util','nprogress'],function(template,$,ud2,ud3,ud4,ud5,util,nprogress){
 var returns = util({
		'checkLoginStatus': [],
		'loading': [],
	 	'getSearch':['cs_id'],//返回值下面用
	});
	//拿到创建页的url后面的值，并渲染step1.html模板
	var cs_id=returns.getSearch;

	$.get('/v6/course/basic', {cs_id:cs_id},function (data) {
		//console.log(data);
		$('.steps').html(template('step1',data.result));
		step1Submit();
		console.log(111);
	})

	//课程基本信息提交
	function step1Submit() {
		$('form.basic').ajaxForm(function (data) {
			location.href='/html/course/course_add_step2.html?cs_id='+data.result.cs_id;
		})
	}

	//课程分类二级联动
	$(document).on('change','#top-select', function () {
		$.get('/v6/category/child',{cg_id:$(this).val()},function(data){
			var options='';
			for(var i=0;i<data.result.length;i++){
				options+='<option value="'+data.result[i].cg_id+'" >'+data.result[i].cg_name+'</option>'
			}
			$('#child-select').html(options);
		})
	})




 // 销毁网站加载进度条
	nprogress.done();
})