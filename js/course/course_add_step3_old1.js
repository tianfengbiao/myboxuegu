define(['bootstrap','jquery','jquery_form','jquery_cookie','aside','header','util','nprogress','template'],function(ud1,$,ud2,ud3,ud4,ud5,util,nprogress,template){
 var returns = util({
		'checkLoginStatus': [],
		'loading': [],
    'getSearch':['cs_id']
	});
//传入cs_id回显数据。渲染模板
  var cs_id=returns.getSearch;
  $.get('/v6/course/lesson',{cs_id:cs_id},function(data){
    $('.steps').html(template('step3',data.result))
  })
//点击编辑弹出模态,渲染好的modal框
$(document).on('click','#courseEdit',function(){
  var ct_id=$(this).attr('data-ct-id');
  // console.log(ct_id);
$.get('/v6/course/chapter/edit',{ct_id:ct_id},function(data){
  data.result.action ='/v6/course/chapter/modify';//手动添加类似后台返回数据。渲染到form的action中。以便方便取。。
$('#chapterModal').html(template('step3-modal',data.result));
})
})




//先点击添加课时按钮,弹出模态框，进行数据回显
$(document).on('click','.btn-ct-add',function(){
  $('#chapterModal').html(template('step3-modal',{action:'/v6/course/chapter/add'}));
})


//step3-modal中课时的添加
$(document).on('click','#addSubmit',function(){
  var ct_id=$(this).attr('data-ct-id');
  console.log(111);
  $('#modal-form').ajaxSubmit({
    data:{
      ct_id:ct_id,//渲染时后端返回自定义属性记住。后端需要知道你编辑的是那个课时）
      ct_cs_id:cs_id, // 添加课时的时候需要（后端需要知道你创建的新课时是属于那个课程的）
      ct_is_free:$('#modal-checkbox').prop('checked')?1:0
    },
    success:function(){
      console.log(ct_id)
      	$('#chapterModal').modal('hide');
      location.reload();
    }
  });
})

 // 销毁网站加载进度条
	nprogress.done();
})