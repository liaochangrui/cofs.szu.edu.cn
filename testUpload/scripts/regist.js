$(function(){
	$("#regist_button").click(function(){
	//清除原有的提示信息
		//alert("-----");
		//获取表单中填写的信息，去除空格，使用id选择器
		var name=$("#regist_username").val().trim();
		var nickname=$("#nickname").val().trim();
		var password=$("#regist_password").val().trim();
		var final_password=$("#final_password").val().trim();
		//检测表单的信息格式
		//发送ajax请求
	
	$.ajax({//data 其实就是键值对。
		url:"http://localhost:8088/cloud_note/user/regist.do",
		type:"post",
		data:{"name":name,"password":password,"nickname":nickname},
		dataType:"json",//可以自定义json格式
		success:function(result){
			if(result.status==0){
			alert(result.msg);//提示注册成功
			$("#back").click();//出发返回按钮单击事件，这时候重新返回登录页面
			}else if(result.status==1){//用户被占用
				$("#warning_1 span").html(result.msg);
				$("#warning_1").show();//显示提示信息
			}
		},
		error:function(){
		alert("注册发生异常");
		}
	});	
		
		
	})
});