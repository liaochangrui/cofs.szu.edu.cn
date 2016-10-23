function loadNoteBooks(){
	//页面载入后自动发送请求，加载笔记本列表
	$.ajax({
		url:"http://localhost:8088/cloud_note/notebook/loadbooks.do",
		type:"post",
		data:{"userId":userId},
		dataType:"json",
		success:function(result){
			if(result.status==0){
				var books=result.data;//笔记本json集合（list指代book）
				//循环集合生成笔记本列表，笔记本是有好几种的属性
				for(var i=0;i<books.length;i++){
				//获取每个笔记本元素的笔记本名称
				var bookname=books[i].cn_notebook_name;
				//获取每个笔记本元素的笔记本ID
				var bookId = books[i].cn_notebook_id;
				
				//拼成li元素
				var s_li='<li class="online"><a>';
					s_li+='<i class="fa fa-book" title="online" rel="tooltip-bottom">';
					s_li+='</i>'+bookname+'</a></li>';
		    
		    //将s_li字符串转成jquery对象（关键啊），藏bookId,只有jquery利用.data方法
		    var $li=$(s_li);
		    $li.data("bookId",bookId);//相当于绑定数据，在li中绑定bookid
		    //将li添加到笔记本ul中去，使用id选择器
		    $("#book_list").append($li);
		    
				}
			}
		}
	
	});
}



//弹出添加笔记本对话框
function showAddBookWindow(){
 		$(".opacity_bg").show();//显示背景，使用类选择器
 //zai id=can的div中添加一个alert页面，原先是个空白的div
 		$("#can").load("alert/alert_notebook.html");//显示对话框
}
//关闭对话框
function closeWindow(){//使用类选择器,类选择器是可以并列的
 		$("#can").empty();//就是把添加的而页面给去掉，保持原样！
 		$(".opacity_bg").hide();
 }

//确认创建笔记本
function sureAddBook(){
 		//获取笔记本名,从文本框中获取，使用id选择器
 		var bookName=$("#input_notebook").val().trim();
 		
 		//发送请求
 		$.ajax({
 			url:"http://localhost:8088/cloud_note/notebook/add.do",
 			type:"post",
 			data:{"bookName":bookName,"userId":userId},
 			dataType:"json",
 			success:function(result){
 				if(result.status==0){
 				   closeWindow();//关闭对话框，注意函数名与函数的使用区别
 				   var bookId=result.data;//获取返回的bookId
 				   //alert(bookId);
 				   //拼成li元素
				var s_li='<li class="online"><a>';
					s_li+='<i class="fa fa-book" title="online" rel="tooltip-bottom">';
					s_li+='</i>'+bookName+'</a></li>';

					//将s_li字符串转成jquery对象（关键啊），藏bookId,只有jquery利用.data方法
					var $li=$(s_li);
					$li.data("bookId",bookId);//相当于绑定数据
					//将li添加到笔记本ul中去，使用id选择器
					$("#book_list").prepend($li);//添加到最前面
 				}
 			},
 			error:function(){
 			alert("创建笔记本失败！")
 			}
 		});
 }
//加载笔记本信息，生成下拉菜单的选中项
function loadReplaySelect(){
  $.ajax({
   url:"http://localhost:8088/cloud_note/notebook/loadbooks.do",
	type:"post",
	data:{"userId":userId},
	dataType:"json",
	success:function(result){
	if(result.status==0){
	var books=result.data;
	//循环生成option
	for(var i=0;i<books.length;i++){
	    //获取每个笔记本元素的笔记本名称
		var bookname=books[i].cn_notebook_name;
		//获取每个笔记本元素的笔记本ID
		var bookId = books[i].cn_notebook_id;
		//拼成一个option
		var s_opt='<option value="'+bookId+'">'+bookname+'</option>';
		//将option添加到select中
		$("#replaySelect").append(s_opt);
	}
	}
	}
  });
}

		
	
