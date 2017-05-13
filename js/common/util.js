define(['jquery', 'jquery_cookie'], function ($, ud) {
  return {
    //未登录时。跳转登录页面，已登录不用管
    checkLoginStatus: function () {
      if (!$.cookie('PHPSESSID')) {
        location.href = '/html/home/login.html';
      }
    },



    loading: function () {
      $(document).on('ajaxStart', function () {
        $('.overlay').show();
      }).on('ajaxStop', function () {
        $('.overlay').hide();
      });
    },
  }
})