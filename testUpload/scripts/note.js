//单击笔记本加载笔记列表
function loadnotes(){
  				//alert("-----");//这个能实现异步
	            //设置全部列表显示，其他列表隐藏
				$("#pc_part_6").hide();//搜索结果列表区
				$("#pc_part_2").show();//全部笔记列表区
				$("#pc_part_5").hide();//预览区
				$("#pc_part_4").hide();//回收站
				$("#pc_part_3").show();//编辑区
  				//给笔记本li设置选中样式，空格代表是谁的？
  				$("#book_list li a").removeClass("checked");
  				$(this).find("a").addClass("checked");//点击那个，那个就被选中，添加样式
  				//获取bookId，点击那里那里就是this
  				var bookId=$(this).data("bookId");//从绑定中获取数据
  				 //alert(bookId);
  				 //发送ajax请求
  				 $.ajax({
  				 	url:"http://localhost:8088/cloud_note/note/loadnotes.do",
  				 	type:"post",
  				 	data:{"bookId":bookId},//这里的data就是钥匙，根据bookid来获取笔记
  				 	dataType:"json",
  				 	success:function(result){
  				 		if(result.status==0){
  				 			var notes=result.data;//取出来就是以Map形式的note集合
  				 			//清除原有的笔记列表
  				 			$("#note_list").empty();
  				 			//循环添加新的li
  				 			for(var i=0;i<notes.length;i++){
  				 				var noteId=notes[i].cn_note_id;//获取笔记本id
  				 				var noteTitle=notes[i].cn_note_title;//货物为笔记本标题
  				 				//alert(noteId);
  				 				//拼成一个笔记本列表的li
  				 				var s_li='<li class="online">';
									s_li+='<a>';
									s_li+='<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'+noteTitle+'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>';
									s_li+='</a>';
									s_li+='<div class="note_menu" tabindex="-1">';
									s_li+='<dl>';
									s_li+='<dt><button type="button" class="btn btn-default btn-xs btn_move" title="移动至..."><i class="fa fa-random"></i></button></dt>';
									s_li+='<dt><button type="button" class="btn btn-default btn-xs btn_share" title="分享"><i class="fa fa-sitemap"></i></button></dt>';
									s_li+='<dt><button type="button" class="btn btn-default btn-xs btn_delete" title="删除"><i class="fa fa-times"></i></button></dt>';
									s_li+='</dl>';
									s_li+='</div>';
									s_li+='</li>';
									var $li=$(s_li);//转换为jquery对象
									$li.data("noteId",noteId);//给li绑定id
									//将笔记li添加到ul中去,使用id选择器注意#
									$("#note_list").append($li);
  				 			}
  				 		}
  				 	}
  				 });
  			}
//给添加笔记+按钮帮点事件处理
function showAddNoteWindow(){
 		$(".opacity_bg").show();//显示背景，使用类选择器
		//zai id=can的div中添加一个alert页面
		$("#can").load("alert/alert_note.html");//显示对话框
 }
//给创建笔记按钮绑定事件
function sureAddNote(){
 		//获取笔记名称
 		var noteTitle=$("#input_note").val().trim();
 		//获取笔记本的ID
 		var $bookli=$("#book_list a.checked").parent();//子找父，有a找li，因为bookId绑定在li中
 		var bookId=$bookli.data("bookId");
 		//alert(bookId);
 		//检测格式
 		if(bookId==undefined){
 			alert("请选择笔记本");
 			return;
 		}
 		//发送请求
 		$.ajax({
 			url:"http://localhost:8088/cloud_note/note/add.do",
 			type:"post",
 			data:{"noteTitle":noteTitle,"bookId":bookId,"userId":userId},
 			dataType:"json",
 			success:function(result){
 				if(result.status==0){
 					closeWindow();//关闭对话框
 					var noteId=result.data;//获取笔记noteid
 					//拼一个笔记列表li
 					var s_li='<li class="online">';
						s_li+='<a>';
						s_li+='<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'+noteTitle+'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>';
						s_li+='</a>';
						s_li+='<div class="note_menu" tabindex="-1">';
						s_li+='<dl>';
						s_li+='<dt><button type="button" class="btn btn-default btn-xs btn_move" title="移动至..."><i class="fa fa-random"></i></button></dt>';
						s_li+='<dt><button type="button" class="btn btn-default btn-xs btn_share" title="分享"><i class="fa fa-sitemap"></i></button></dt>';
						s_li+='<dt><button type="button" class="btn btn-default btn-xs btn_delete" title="删除"><i class="fa fa-times"></i></button></dt>';
						s_li+='</dl>';
						s_li+='</div>';
						s_li+='</li>';
						var $li=$(s_li);//转换为jquery对象
						$li.data("noteId",noteId);//给li绑定id
						//将笔记列表添加笔记列表ul中
						$("#note_list").prepend($li);
 				}	
 			},
 			error:function(){
 				alert("创建笔记失败！");
 			}
 		});
 		
 		
 }

//给笔记列表li添加单击事件。加载笔记
function loadNote(){
	  // alert("====");
	  
	  		//设置笔记选中的效果
	  		$("#note_list li a").removeClass("checked");
	  		$(this).find("a").addClass("checked");//this指代的是note的li
	   		var noteId=$(this).data("noteId");
	   		//发型请求
	   		$.ajax({
	   			url:"http://localhost:8088/cloud_note/note/load.do",
	   			type:"post",
	   			data:{"noteId":noteId},
	   			dataType:"json",
	   			success:function(result){
	   				if(result.status==0){
	   					var note=result.data;
	   					var noteTitle=note.cn_note_title;
	   					var noteBody=note.cn_note_body;
	   					//设置编辑区标题
	   					$("#input_note_title").val(noteTitle);
	   					//设置编辑区内容
	   					um.setContent(noteBody);
	   				
	   				}
	   			},
	   			error:function(){
	   				alert("加载笔记信息失败！");
	   			}
	   		});
	   }
//添加保存笔记按钮处理
function updateNote(){
	   	//获取笔记的标题
	   	var noteTitle=$("#input_note_title").val().trim();
	   	//获取笔记的内容
	   	var noteBody=um.getContent();
	   	//获取笔记的id
	   	var $noteli=$("#note_list a.checked").parent();//子找父
	   	var noteId=$noteli.data("noteId");
	   //	alert(noteId);
	   	//格式检查
	   	//发送请求
	   	$.ajax({
	   		url:"http://localhost:8088/cloud_note/note/update.do",
	   		type:"post",
	   		data:{"noteId":noteId,"noteTitle":noteTitle,"noteBody":noteBody},
	   		dataType:"json",
	   		success:function(result){
	   			if(result.status==0){
	   			//如果标题改变，要修改标题li
	   			var liTitle=$("#note_list a.checked").text().trim();//获取编辑后的标题文本
	   				if(liTitle!=noteTitle){
	   					//拼接一个字符串s，替代原先的内容
	   				var s='<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'+noteTitle+'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>';
	   				$("#note_list a.checked").html(s);//替换选中的<a>中的<i>中的元素
	   			    }
	   			      alert("笔记保存成功！");
	   		    }
	   		
	   		},
	   		error:function(){
	   			alert("笔记保存失败！");
	   		}
	   	});
	   }

//确认将笔记移入回收站
function recycleNote(){
	   //获取笔记id,ta是绑定在li上的,注意：this指代的是谁！
	  // var $li=$(this).parents("li");
	  var $li=$("#note_list a.checked").parent();//通过选中的状态来定位
	  var noteId=$li.data("noteId");
	   //发送ajax请求
	   $.ajax({
	   url:"http://localhost:8088/cloud_note/note/recycle.do",
	   type:"post",
	   data:{"noteId":noteId},
	   dataType:"json",
	   success:function(result){
	   if(result.status==0){
	   //删除笔记li
	   $li.remove();
	   //清空笔记编辑区
	   $("#input_note_title").val("");
	   um.setContent("");
	   //提示删除成功
	   alert(result.msg);
	   }
	   },
	   error:function(){
	   		alert("删除笔记失败！");
	   }
	   		});
	   }

    //分享笔记操作
function shareNote(){
	   //获取笔记id
	   var $li=$(this).parents("li");//这里的this指代的就是所点击的按钮
	   var noteId=$li.data("noteId");
	   //发送ajax请求
	   $.ajax({
	   url:"http://localhost:8088/cloud_note/note/share.do",
	   type:"post",
	   data:{"noteId":noteId},
	   dataTpye:"json",
	   success:function(result){
	   alert(result.msg);
	   },
	   error:function(){
	   alert("分享笔记失败！");
	   }
	   });
	   }
//搜索笔记列表功能
function searchNotes(event){//浏览器通用的写法+event
	   //alert("------");
	   var code=event.keyCode;//获取键的ASCII值
	   //alert("------"+code);
	   //回车键的值为13
	   if(code==13){
	   //alert("按回车键，发送ajax请求");
	   //清除原有的搜索结果礼列表
	   $("#share_list").empty();
	   //获取检索的关键字
	   var keyword=$("#search_note").val().trim();
	   //发送ajax请求
	   $.ajax({
	   url:"http://localhost:8088/cloud_note/note/search.do",
	   type:"post",
	   data:{"keyword":keyword},
	   dataType:"json",
	   success:function(result){
	   if(result.status==0){
	   var notes=result.data;
	   //循环生成检索的结果
	   for(var i=0;i<notes.length;i++){
	   var shareId=notes[i].cn_share_id;
	   var shareTitle=notes[i].cn_share_title;
	   //拼成li
	   var s_li='<li class="online">';
		   s_li+='<a>';
		   s_li+='<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'+shareTitle+'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-star"></i></button>';
		   s_li+='</a>';
		   s_li+='</li>';
	   var $li=$(s_li);
	   $li.data("shareId",shareId);
	   //将li添加到share_list中
	   $("#share_list").append($li);
	   }
	   //将搜索结果div进行显示
	   $("#pc_part_6").show();//搜索结果列表区
	   $("#pc_part_2").hide();//全部笔记列表区
	   $("#pc_part_5").show();//预览区
	   $("#pc_part_3").hide();//编辑区
	   $("#pc_part_4").hide();//回收站
	   }
	   
	   }
	   });
	   }
	   }
//查看分享笔记的信息
function showShare(){
	   //获取shareId
	   var shareId=$(this).data("shareId");
	   //发送ajax请求
	   $.ajax({
	   url:"http://localhost:8088/cloud_note/note/loadShare.do",
	   type:"post",
	   data:{"shareId":shareId},
	   dataType:"json",
	   success:function(result){
	   if(result.status==0){
	   var share=result.data;
	   $("#noput_note_title").html(share.cn_share_title);
	   $("#noput_note_body").html(share.cn_share_body);
	   }
	   }
	   });
	   }



