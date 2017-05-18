define(['jquery_uploadify','jquery','jquery_form','jquery_cookie','aside','header','util','nprogress','template'],function(uploadify,$,ud2,ud3,ud4,ud5,util,nprogress,template){
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

    // 进度条结束
    nprogress.done();
})