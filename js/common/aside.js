define(['jquery','jquery_cookie'],function($,ud){
var userInfo={};
try{
  userInfo=JSON.parse($.cookie('userInfo'));
}catch(e){
  console.log(e);
  console.log('解析错误');
}

userInfo.tc_avatar&&$('.aside .avatar img').attr('src',userInfo.tc_avatar);
$('.aside h4').text(userInfo.tc_name);



});