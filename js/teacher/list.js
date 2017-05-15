define(['aside','header','template','jquery','util','nprogress'],function(a,b,template,$,util,nprogress){
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
  template.helper('age',function(tplValue){
    if(!tplValue){
      return '';
    }
    var birthdayY = tplValue.slice(0, 4);
		var currentY = new Date().getFullYear();
		return currentY - birthdayY;

  });
  $.get('/v6/teacher',function(data){
    console.log(data);
    $('#tc-list-table').append(template('tclist',data));
  })


});