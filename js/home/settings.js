define(['aside', 'header', 'util', 'bootstrap', 'jquery', 'jquery_form', 'nprogress', 'template', 'jquery_region', 'jquery_datepicker', 'jquery_datepicker_CN', 'jquery_uploadify', ], function (ud1, ud2, util, ud3, $, ud4, nprogress, template, ud5, ud6, ud7, ud8) {
	//载入齿轮和状态检测。。
	var returns = util({
		'checkLoginStatus': [],
		'loading': []
	});
	//当点击个人中心。跳转设置页面。获取数据并渲染
	$.get('/v6/teacher/profile', function (data) {
		$('.teacher-profile').html(template('settings', data.result));
		// 点击保存时修改个人资料。借用封装函数实现。
		profileSubmit();
		initPCD();

		initDatepicker();
		initUploadify();
		console.log(1111);
	})


	//修改表单函数；包含实现ajax
	function profileSubmit() {
		// 因为在表单提交前获取页面省级数据拼出hometown，所以不能使用这个方法了，不灵活
		/*$('.teacher-profile form').ajaxForm(function() {
			location.reload();
		});*/
		$('.teacher-profile form').on('submit', function (e) {
			// 阻止表单默认的提交行为
			e.preventDefault();
			$(this).ajaxSubmit({
				data: {
					tc_hometown: $('#p').find(':selected').text() + '|' + $('#c').find(':selected').text() + '|' + $('#d').find(':selected').text(),
					tc_province: $('#p').val(),
					tc_city: $('#c').val(),
					tc_district: $('#d').val()
				},
				success: function () {
					location.reload();
				}
			})

			// 为了兼容老版本IE
			return false;
		})

	}


	/**
	 * 初始化省市县三级联动
	 * */
	function initPCD() {
		$('#tc-region').region({
			url: '/lib/jquery-region/region.json'
		})
	}
	//初始化日期
	function initDatepicker() {
		$('input[name="tc_birthday"]').datepicker({
			language: 'zh-CN', // 中文配置，需要引入对应的语言包
			format: 'yyyy-mm-dd',
			startDate: new Date('1950-01-01'),
			endDate: new Date('1999-01-01')
		});
		$('input[name="tc_join_date"]').datepicker({
			language: 'zh-CN',
			format: 'yyyy-mm-dd',
			startDate: new Date('2009-01-01'),
			endDate: new Date('1999-01-01')
		})
	}

	//初始化上传文件
	function initUploadify() {
		$('#upfile').uploadify({
			swf: '/lib/uploadify/uploadify.swf',
			uploader: '/v6/uploader/avatar',
			fileObjName:'tc_avatar',
			fileTypeExts: '*.gif; *.jpg; *.png',
			buttonText:'',
			height:$('.preview').height(),
			onUploadSuccess:function(file,data){
				try{
	$('#avatar').attr('src', JSON.parse(data).result.path);
				}catch(e){
					console.log(e);
				}

			}
		})
	}










	// 销毁网站加载进度条
	nprogress.done();
})