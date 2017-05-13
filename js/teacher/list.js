define(['aside','header','template','jquery'],function(a,b,template,$){
  
  $.ajax({
    type:'get',
    url:'/v6/teacher',
    success:function(aa){
      // console.log(aa);
      
      var data={
        list:aa.result
      }
      
      var html=template('tclist',data);
      // console.log(html);
     document.getElementById('tc_add').innerHTML=html;

    },


    error:function(){
      alert('请求失败');
    }
  })



});