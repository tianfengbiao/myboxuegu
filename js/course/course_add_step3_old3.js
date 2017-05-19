define(['bootstrap','jquery','jquery_form','jquery_cookie','aside','header','util','nprogress','template'],function(ud1,$,ud2,ud3,ud4,ud5,util,nprogress,template){
 var returns = util({
		'checkLoginStatus': [],
		'loading': [],
    'getSearch':['cs_id']
	});
//传入cs_id回显数据。渲染模板
  var cs_id=returns.getSearch;

  var result=null;//为后面的modal的按钮使用字符串拼接。。
  $.get('/v6/course/lesson',{cs_id:cs_id},function(data){
    result=data.result;//外面可以访问
    $('.steps').html(template('step3',data.result))

  })

//通过 编辑和添加课时的data-ct-id属性是否存在来判断是编辑还是添加。。
//如果存在。通过接口返回数据，可知为编辑、。否则为添加。。这块负责step3.html不包括modal框
$(document).on('click','#courseEdit, .btn-ct-add',function(){
  var ct_id=$(this).attr('data-ct-id');
  if(ct_id){
$.get('/v6/course/chapter/edit',{ct_id:ct_id},function(data){
  data.result.action ='/v6/course/chapter/modify';//手动添加类似后台返回数据。渲染到form的action中。以便方便取。。
$('#chapterModal').html(template('step3-modal',data.result));
})
  }else{
$('#chapterModal').html(template('step3-modal',{action:'/v6/course/chapter/add'}));
  }
})


//负责modal逻辑的添加按钮
$(document).on('click','#addSubmit',function(){
var ct_id=$(this).attr('data-ct-id');//注意step3.html中编辑也有此data-ct-id属性。

   $('#modal-form').ajaxSubmit({
    data:{
      ct_id:ct_id,//渲染时后端返回自定义属性记住。后端需要知道你编辑的是那个课时）
      ct_cs_id:cs_id, // 添加课时的时候需要（后端需要知道你创建的新课时是属于那个课程的）
      ct_is_free:$('#modal-checkbox').prop('checked')?1:0
    },
    success:function(data){
      // console.log(ct_id)
      	$('#chapterModal').modal('hide');
      // location.reload();不推荐方法
    if(ct_id){//如果存在ct_id就改变编辑框的值
      	// 更新缓存的数据
 					for(var i = 0, len = result.lessons.length; i < len; i++) {
 						if(result.lessons[i].ct_id === ct_id) {
 							result.lessons[i].ct_name = $('[name="ct_name"]').val();
 							result.lessons[i].ct_video_duration = $('[name="ct_minutes"]').val() + ':' + $('[name="ct_seconds"]').val();
 						}
 					}
 				

    }else{//否则就是在后边添加数据
     	result.lessons.push({
						ct_id: data.result,
						ct_name: $('[name="ct_name"]').val(),
						ct_video_duration: $('[name="ct_minutes"]').val() + ':' + $('[name="ct_seconds"]').val()
					});           
    }

	$('.steps').html(template('steps3-tpl', result));

    }
  });

})



nprogress.done();

//点击编辑弹出模态,渲染好的modal框
// $(document).on('click','#courseEdit',function(){
//   var ct_id=$(this).attr('data-ct-id');
//   // console.log(ct_id);
// $.get('/v6/course/chapter/edit',{ct_id:ct_id},function(data){
//   data.result.action ='/v6/course/chapter/modify';//手动添加类似后台返回数据。渲染到form的action中。以便方便取。。
// $('#chapterModal').html(template('step3-modal',data.result));
// })
// })

// //先点击step3.html中添加课时按钮,弹出模态框，进行数据回显
// $(document).on('click','.btn-ct-add',function(){
//   $('#chapterModal').html(template('step3-modal',{action:'/v6/course/chapter/add'}));
// });



// //step3-modal中课时的添加按钮
// $(document).on('click','#addSubmit',function(){
//   var ct_id=$(this).attr('data-ct-id');
//   console.log(111);
//   $('#modal-form').ajaxSubmit({
//     data:{
//       ct_id:ct_id,//渲染时后端返回自定义属性记住。后端需要知道你编辑的是那个课时）
//       ct_cs_id:cs_id, // 添加课时的时候需要（后端需要知道你创建的新课时是属于那个课程的）
//       ct_is_free:$('#modal-checkbox').prop('checked')?1:0
//     },
//     success:function(){
//       console.log(ct_id)
//       	$('#chapterModal').modal('hide');
//       location.reload();
//     }
//   });
// })

 // 销毁网站加载进度条
	// nprogress.done();
})