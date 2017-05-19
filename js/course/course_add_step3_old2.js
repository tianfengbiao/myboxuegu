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
      	// 找到对应的父li
 					var li = $('a[data-ct-id="' + ct_id + '"]').parents('.lessons li');
 					// 通过父找到里面标题和时长的元素，重设值
 					li.find('.name').text($('[name="ct_name"]').val());
 					li.find('.duration').text($('[name="ct_minutes"]').val() + ':' + $('[name="ct_seconds"]').val());



    }else{//否则就是在后边添加数据
      //该老师拼接字符串与我模板拼接有冲突。效果有点小bug..不推荐用
        	var html = 
	 					'<li>' +
	                        '<i class="fa fa-file-video-o"></i> ' +
	                        '<span class="order">课时：' + ($('.lessons .list-unstyled li').length + 1) + '</span>' +
	                        '<span class="name">' + $('[name="ct_name"]').val() + '</span>' +
	                        '<span class="duration">' + $('[name="ct_minutes"]').val() + ':' + $('[name="ct_seconds"]').val() + '</span>' +
	                        '<div class="action pull-right">' +
	                            '<a href="javascript:;" data-ct-id="' + data.result + '" class="btn btn-info btn-xs btn-ct-edit" data-toggle="modal" data-target="#chapterModal">编辑</a>' +
	                            '<a href="javascript:;" class="btn btn-info btn-xs">预览</a>' +
	                            '<a href="javascript:;" class="btn btn-danger btn-xs">删除</a>' +
	                        '</div>' +
	                    '</li>';

                  
                    $('.lessons .list-unstyled').append(html);
    }



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