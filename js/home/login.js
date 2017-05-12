define(['bootstrap','jquery','jquery_form'],function(ud,$,ud){
  console.log("111")
  $('#login-form').ajaxForm({//一般表单提交。另一个提交应该与onsubmit一起提交
    success:function(){
      location.href='/';
    },
    error:function(){
      alert('登录失败！！！')
    }

  })
})