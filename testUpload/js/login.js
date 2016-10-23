$(function(){
//给按钮追加单击事件
	$("#login").click(function(){
	    //发送之前清除原有的信息，使用id选择器
		$("#count_msg").html("");
		$("#password_msg").html("");
	//打桩
		//alert("来了！");
		//获取请求数据
		var name=$("#count").val().trim();
		var password=$("#password").val().trim();//去掉空格
		//alert(name);
		var ok=true;//加一个开关！
		//检查数据格式
		if(name==""){
		$("#count_msg").html("用户名不能为空！");
			ok=false;
		}if(password==""){
		$("#password_msg").html("密码不能为空！");
			ok=false;
		}
		if(ok){
		alert(name);
				window.location.href="edit.html";//
				//alert("到达编辑页面");
			}else if(result.status==1){//用户名错
				$("#count_msg").html(result.msg);
			}else if(result.status==2){//密码错
				$("#password_msg").html(result.msg);
			}
			}
		});
		}
		
		
	});

});