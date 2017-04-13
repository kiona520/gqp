$(function(){

	var FREQ = 1000;
	var repeat = true;
	
	getTime();
	showFrequency();
	startStartAJAXcalls();

	function startStartAJAXcalls(){
		if(repeat){
			setTimeout(function(){
				getXMLRaces();
				startStartAJAXcalls();
			},FREQ);
		}else{
			
		}
		
	}

	$("#btnStop").click(function(){
		repeat = false;
		$("#freq").html("停止刷新");
	});

	$("#btnStart").click(function(){
		repeat = true;
		showFrequency();
		startStartAJAXcalls();
	});




	function showFrequency(){
		$("#freq").html("页面每隔"+FREQ/1000+"秒刷新");
	}

	function getXMLRaces(){
	
		$.ajax({
			url:"finishers.xml",//通过ajax加载xml文件
			cache:false,//在本地缓存结果，这样可以减少对服务器的调用
			dataType:"xml",//希望从服务器返回的数据类型
			success:function(xml){
				//处理响应回来的XML文件
				//先清空原来的内容
				$("#male_finishers").empty();
				$("#female_finishers").empty();
				$("#all_finishers").empty();
				$(xml).find("runner").each(function(){
					var info = '<li>Name:'+$(this).find("fname").text()+' '+$(this).find("lname").text()+'.'+'Time:'+$(this).find("time").text()+'</li>';
					
					var gender = $(this).find("gender").text();
					
					
					
					if(gender == 'm'){
						$("#male_finishers").append(info);	
					}else if(gender == "f"){
						$("#female_finishers").append(info);
					}else{
						
					}
					$("#all_finishers").append(info);
					

				});
			}
		});
	}
	function getTime(){
		var ap = "";
		var d = new Date();
		var current_hour = d.getHours();
		
		(current_hour<12)?a_p="AM":a_p="PM";
		(current_hour==0)?current_hour = 12:current_hour = current_hour;
		(current_hour>12)?current_hour -= 12:current_hour=current_hour;
		
        var current_sec = d.getSeconds().toString();
		var current_min = d.getMinutes().toString();
		if(current_sec.length==1){
			current_sec = "0"+current_sec;
		}

		if(current_min.length == 1){
			current_min = "0"+current_min;
		}

		$("#updateTime").text(current_hour+":"+current_min+":"+current_sec+" "+a_p);
	}
	
	
});