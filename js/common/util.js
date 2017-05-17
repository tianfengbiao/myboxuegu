define(['jquery', 'jquery_cookie'], function ($, ud) {

var util={
   //未登录时。跳转登录页面，已登录不用管
    checkLoginStatus: function () {
      if (!$.cookie('PHPSESSID')) {
        location.href = '/html/home/login.html';
      }
    },


//当开始发送ajax时显示齿轮图。结束时隐藏。
    loading: function () {
      $(document).on('ajaxStart', function () {
        $('.overlay').show();
      }).on('ajaxStop', function () {
        $('.overlay').hide();
      });
    },

    getSearch:function(searchKey){
      var searchObj={},temp;
      var searchArr=location.search.slice(1).split('&');
      for(var i=0;i<searchArr.length;i++){
        temp=searchArr[i].split('=');
        searchObj[temp[0]]=temp[1];
      }

      return searchKey==null?searchObj:searchObj[searchKey];
    }




};

//当用util模块时。需要那个方法就传那个方法。
// 传入所有要执行的方法名，格式范例：{'checkLoginStatus': [], 'fn2': [], ...}
return function(methods){
 var returns={};
 for( var key in methods){
   returns[key]=util[key].apply(util,methods[key]);
 }
 // 所有方法的返回值一起返回
 return returns;
 //这样returns={check:ud,load:ud,get:obj}
}




})