define(['aside', 'header', 'util', 'bootstrap', 'jquery', 'jquery_form', 'nprogress', 'template', 'jquery_region', 'jquery_datepicker', 'jquery_datepicker_CN', 'jquery_uploadify', 'ckeditor'], function (ud1, ud2, util, ud3, $, ud4, nprogress, template, ud5, ud6, ud7, ud8,ckeditor) {
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

		initCkeditor();
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

//初始化副文本编辑器
function initCkeditor(){
	//该富文本编辑器提供一个replace方法，把textarea替换。
		// 第二个参数为一个对象，可以进行配置。
		// 对象有一个toolbarGroups配置 ，用来指定编辑器的功能列表。
		editor=ckeditor.replace('ckeditor',{
					toolbarGroups: [
		        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		        { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		        { name: 'links' },
		        { name: 'insert' },
		        { name: 'forms' },
		        { name: 'tools' },
		        { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] }
		    ]
		})
}








	// 销毁网站加载进度条
	nprogress.done();
})