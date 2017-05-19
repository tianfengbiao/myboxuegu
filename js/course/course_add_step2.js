define(['jquery_uploadify','jquery','jquery_form','jquery_cookie','aside','header','util','nprogress','template','jquery_Jcrop'],function(uploadify,$,ud2,ud3,ud4,ud5,util,nprogress,template,ud6){
    var returns = util({
        'checkLoginStatus': [],
        'loading': [],
        'getSearch':['cs_id'],
    });

    var cs_id=returns.getSearch;
    $.get('/v6/course/picture',{cs_id:cs_id}, function (data) {
        $('.steps').html(template('step2',data.result));
        initUploadify();
    })

    //初始化上传文件
    function initUploadify() {
$('#uploadify').uploadify({
    swf:'/lib/uploadify/uploadify.swf',
    uploader:'/v6/uploader/cover',
    fileObjName:'cs_cover_original',
    formData:{
        cs_id:cs_id
    },
    buttonText:'上传图片',
    buttonClass: 'btn btn-success btn-sm btn-uploadify',
    height:30,
    width:80,
    itemTemplate:'<i></i>',
    onUploadSuccess: function (file, data) {
        try{
            var data =JSON.parse(data);
            $('.preview img').attr('src',data.result.path);
            $('.thumb img').attr('src',data.result.path);
           
        }catch(e){
            console.log(e);
        }
    }
})
    }

//裁剪图片初始化
$(document).on('click','#Jcrop',function(){
    $('.preview>img').Jcrop({
        aspectRatio: 2,//宽高比
        setSelect: [ 0,0,200,100 ],// 设置默认的选区
        bgColor: 'red',
        minSize:[300,150],// 限制选取图片的最小
        boxWidth:$('.preview').width(),
        edge: {
				n: 10,
				s: -20,
				e: -10,
				w: 10
			}
    }, function(){
	// 插件初始化完毕后，会执行这个回调，这个回调中的this为插件实例，
			// 该插件还提供了一个方法用来获取实例$('.preview img').Jcrop('api')
			// 不过这个方法步一定能够得到实例(因为你调用的时候插件可能还没初始化好)
            J=this;
            	// 创建裁剪预览框
			J.initComponent('Thumbnailer', { width: $('.thumb').width(), height: $('.thumb').height() });
            	// 把预览框添加到指定元素中
			$('.thumb').empty().append($('.jcrop-thumb'));
    });
})


$(document).on('click','#save',function(){
    var result=J.getSelection();
    $.post('/v6/course/update/picture',{
            cs_id: cs_id,
			x: result.x,
			y: result.y,
			w: result.w,
			h: result.h
    },function(){
 location.href='/html/course/course_add_step3.html?cs_id='+cs_id;
    })
})


    // 进度条结束
    nprogress.done();
})