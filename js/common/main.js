require.config({
  baseUrl: '/',
  // 配置模块路径昵称
  paths: {
    // 每个页面对应的模块
    index: 'js/home/index',
    login: 'js/home/login',
    repass: 'js/home/repass',
    settings: 'js/home/settings',
    tcEdit: 'js/teacher/edit',
    tcList: 'js/teacher/list',
    tcAdd: 'js/teacher/add', //后期添加页面，包括js&html
    usProfile: 'js/user/profile',
    usList: 'js/user/list',
    csAdd: 'js/course/add',
    csList: 'js/course/list',
    cgAdd: 'js/course/category_add',
    cgList: 'js/course/category_list',
    csAdd1: 'js/course/course_add_step1',
    csAdd2: 'js/course/course_add_step2',
    csAdd3: 'js/course/course_add_step3',

    // 公共的模块
    aside: 'js/common/aside',
    header: 'js/common/header',
    util: 'js/common/util',

    // 第三方模块
    template: 'lib/artTemplate/template',
    //注意是简洁模板引擎
    // 依赖jquery的
    jquery: 'lib/jquery/jquery.min',
    bootstrap: 'lib/bootstrap/js/bootstrap.min',
    jquery_form: 'lib/jquery-form/jquery.form',
    jquery_cookie: 'lib/jquery-cookie/jquery.cookie',
    //区域插件。注意英译
    jquery_region: 'lib/jquery-region/jquery.region',
    jquery_datepicker: 'lib/jquery-bootstrap-datepicker/js/bootstrap-datepicker.min',
    jquery_datepicker_CN: 'lib/jquery-bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
    jquery_uploadify: 'lib/uploadify/jquery.uploadify.min',
    jquery_Jcrop:'lib/jquery-Jcrop/js/Jcrop.min',//还要引css
    // 不依赖jquery的
    nprogress: 'lib/nprogress/nprogress',
    ckeditor:'/lib/ckeditor/ckeditor'
  },

  // 配置普通模块的依赖或者输出
  shim: {
    // bootstrap是普通模块，但是依赖与jquery，所以这里配置
    bootstrap: {
      deps: ['jquery']
    },
    	jquery_datepicker_CN: {
      deps: ['jquery','jquery_datepicker']
    },
    jquery_uploadify: {
      deps: ['jquery']
    },
    jquery_Jcrop:{
      deps:['jquery']
    },
    	// 非AMD模块，如果想按照正常的方式引入，必须配置exports属性值为该模块暴露的全局变量
		ckeditor: {
			exports: 'CKEDITOR'
		}

  },
});
// 加载进度条库，然后start
require(['nprogress'],function(nprogress){
nprogress.start();
})

var obj = {
  '/': 'index',
  '/index.html': 'index',
  '/html/home/login.html': 'login',
  '/html/home/repass.html': 'repass',
  '/html/home/settings.html': 'settings',
  '/html/teacher/edit.html': 'tcEdit',
  '/html/teacher/list.html': 'tcList',
  '/html/teacher/add.html': 'tcAdd', //后期添加页面，包括js&html
  '/html/user/list.html': 'usList',
  '/html/course/add.html': 'csAdd',
  '/html/course/list.html': 'csList',//有误，已改
  '/html/course/category_add.html': 'cgAdd',
  '/html/course/category_list.html': 'cgList',
  '/html/course/course_add_step1.html': 'csAdd1',
  '/html/course/course_add_step2.html': 'csAdd2',
  '/html/course/course_add_step3.html': 'csAdd3'

};

// 根据页面的pathname获取要加载的模块名
var moduleName = obj[location.pathname];
// 加载这个模块，这个模块咱们称为页面的主模块
require([moduleName]);