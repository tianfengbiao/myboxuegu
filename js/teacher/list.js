define(['aside','header','template','jquery','util','nprogress','bootstrap'],function(a,b,template,$,util,nprogress,c){
   var returns = util({
		'checkLoginStatus': [],
		'loading': []
	});
 // 销毁网站加载进度条
	nprogress.done();
  // $.ajax({
  //   type:'get',
  //   url:'/v6/teacher',
  //   success:function(aa){
  //     // console.log(aa);
  //     //原生用的js
  //     var data={
  //       list:aa.result
  //     }
      
  //     var html=template('tclist',data);
  //     // console.log(html);
  //    document.getElementById('tc_add').innerHTML=html;

  //   },
  //   error:function(){
  //     alert('请求失败');
  //   }
  // })

  
  // 计算年龄
  template.helper('age',function(tplValue){
    if(!tplValue){
      return '';
    }
    var birthdayY = tplValue.slice(0, 4);
		var currentY = new Date().getFullYear();
		return currentY - birthdayY;

  });


  //获取后台讲师列表数据并渲染到对应的模板
  $.get('/v6/teacher',function(data){
    // console.log(data);
    $('#tc-list-table').append(template('tclist',data));
  })

  // 查看按钮渲染
  $(document).on('click','[href="#teacherModal"]',function(){
    var tcid=$(this).attr('data-tcid');
    // console.log(tcid);
    $.get('/v6/teacher/view',{tc_id:tcid},function(data){
      $('#teacherModal').html(template('tc-list-view',data.result));
    })
  })

// 启用与注销
$(document).on('click','.tc-handle',function(){
    var tcid=$(this).attr('data-tcid');
    var status=$(this).attr('data-status');
    var $that=$(this);
    // console.log(tcid);
    $.get('/v6/teacher/handle',{tc_id:tcid,tc_status:status},function(data){
     //传启用返注销。否则相反
      $that.attr('data-status',data.result.tc_status).text( data.result.tc_status==0?'注 销':'启 用');
    })
  })



})
