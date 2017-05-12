define(['jquery'], function($) {
	$('#logout').on('click', function() {
		$.ajax({
			type:"post",
			url:"/v6/logout",
			success: function() {
				location.href = '/html/home/login.html';
        console.log(11)
			},
			error: function() {
				// alert('网络超时，请稍候再试！');
        
			}
		});
	});
});
