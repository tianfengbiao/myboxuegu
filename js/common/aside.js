define(['jquery', 'jquery_cookie'], function ($, ud) {
  var userInfo = {};
  try {
    //缓存用户输入信息
    userInfo = JSON.parse($.cookie('userInfo')); //把字符串转化为对象
  } catch (e) {
    // console.log(e);//获取到的错误
    console.log('解析错误');
  }
  //将用户名。图片渲染到公共页面
  userInfo.tc_avatar && $('.aside .avatar img').attr('src', userInfo.tc_avatar);
  //注意该类型的用法
  $('.aside h4').text(userInfo.tc_name);

  //做侧边栏课程管理下拉列表
  $('.slide-down').on('click', function () {
    $(this).next().slideToggle();
  })
  // console.log(111);
  //侧边栏点击添加类名active焦点，同时注意依赖包
  var pathname = location.pathname;
  // console.log(pathname);
  var pathToHref = {
    '/index.html': '/',
    // '/': '/index.html',a路径问题不能用这个..
    '/html/home/settings.html': '/',
    '/html/home/repass.html': '/',
    
    '/html/user/profile.html': '/html/user/list.html',
    '/html/teacher/edit.html': '/html/teacher/list.html',
    '/html/teacher/add.html': '/html/teacher/list.html',//后期添加页面，包括js&html
    // '/html/course/list.html': '/html/course/list.html',
  }; //该对象的作用是：对应的子页面给对应的用户user的a标签添加active类样式，如user下的profile.html。。类active应该给user的页面的a标签添加active样式。。

  var href = pathToHref[pathname] ? pathToHref[pathname] : pathname;
  // console.log(href);	// 被选中的元素所有的父元素显示，这个显示截止到navs为止
  $('.aside a').removeClass('active').filter('[href="' + href + '"]').addClass('active').parentsUntil('.navs').slideDown();




});