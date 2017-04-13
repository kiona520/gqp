$(function(){
	//定义一个存放牌对象的数组  A代表11,2-10代表排面数，J、Q、K代表10，每种牌面对应四中不同的花色
	var deck = [
		new card("Ace","Hearts",11),
		new card("Two","Hearts",2),
		new card("Three","Hearts",3),
		new card("Four","Hearts",4),
		new card("Five","Hearts",5),
		new card("Six","Hearts",6),
		new card("Seven","Hearts",7),
		new card("Eight","Hearts",8),
		new card("Nine","Hearts",9),
		new card("Ten","Hearts",10),
		new card("Jack","Hearts",10),
		new card("Queen","Hearts",10),
		new card("King","Hearts",10),
		new card("Ace","Clubs",11),
		new card("Two","Clubs",2),
		new card("Three","Clubs",3),
		new card("Four","Clubs",4),
		new card("Five","Clubs",5),
		new card("Six","Clubs",6),
		new card("Seven","Clubs",7),
		new card("Eight","Clubs",8),
		new card("Nine","Clubs",9),
		new card("Ten","Clubs",10),
		new card("Jack","Clubs",10),
		new card("Queen","Clubs",10),
		new card("King","Clubs",10),
		new card("Ace","Diamonds",11),
		new card("Two","Diamonds",2),
		new card("Three","Diamonds",3),
		new card("Four","Diamonds",4),
		new card("Five","Diamonds",5),
		new card("Six","Diamonds",6),
		new card("Seven","Diamonds",7),
		new card("Eight","Diamonds",8),
		new card("Nine","Diamonds",9),
		new card("Ten","Diamonds",10),
		new card("Jack","Diamonds",10),
		new card("Queen","Diamonds",10),
		new card("King","Diamonds",10),
		new card("Ace","Spades",11),
		new card("Two","Spades",2),
		new card("Three","Spades",3),
		new card("Four","Spades",4),
		new card("Five","Spades",5),
		new card("Six","Spades",6),
		new card("Seven","Spades",7),
		new card("Eight","Spades",8),
		new card("Nine","Spades",9),
		new card("Ten","Spades",10),
		new card("Jack","Spades",10),
		new card("Queen","Spades",10),
		new card("King","Spades",10)
	];
	
	//用来存放取过的牌的索引
	var used_cards = new Array();

	//手牌对象
	var hand = {
			cards:new Array(),
			current_total:0,
			sumCardTotal:function(){
				//手牌点数数统计
				this.current_total = 0;
				for(var i=0;i<this.cards.length;i++){
					 var value = this.cards[i].value;
					 this.current_total += value;
				}
				$("#hdrTotal").html("Total:"+this.current_total);

				//判断牌面数字
				if(this.current_total>21){
					//爆牌游戏结束
					$("#btnStick").trigger("click");
					$("#imgResult").attr("src","images/x2.png");
					$("#hdrResult").html("爆牌！").attr("class","lose");	
				}else if(this.current_total == 21){
					//赢得游戏，游戏结束
					$("#btnStick").trigger("click");
					$("#imgResult").attr("src","images/check.png");
					$("#hdrResult").html("恭喜赢得游戏！").attr("class","win");	
				}else if(this.current_total<21&&this.cards.length==5){
					$("#btnStick").trigger("click");
					$("#imgResult").attr("src","images/check.png");
					$("#hdrResult").html("恭喜赢得游戏！").attr("class","win");	
				}else{
				
				}

			
			}
	};

	//牌队形
	function card(name,suit,value){
		this.name = name;//牌的名称属性
		this.suit = suit;//牌的花色的属性
		this.value = value;//牌面大小属性
	}

	//用来生成随机数，决定抽取哪张牌
	function getRandom(num){
		return Math.floor(Math.random()*num);
	}

	//取牌
	function hit(){
		var good_card = false;
		do{
			var index = getRandom(52);
			//判断随机抽取的牌是否抽取过，如果抽取过，则继续抽取，否则将抽牌的索引放到对应数组，抽的牌
			//封装到对应的手牌对象，将牌放到对应的容器
			if(!$.inArray(index,used_cards)>-1){
				good_card = true;
				var c = deck[index];
				used_cards[used_cards.length] = index;
				hand.cards[hand.cards.length] = c;
				var $d = $("<div>");
				$d.addClass("current_hand").appendTo($("#my_hand"));
				$("<img>").appendTo($d).attr("src","images/cards/"+c.suit+"/"+c.name+".jpg").fadeOut('slow').fadeIn('slow');
				
			}
		
		}while(!good_card);
		good_card = false;
		
		hand.sumCardTotal();
		
	}

	//发牌，循环次数即为发牌的张数
	function deal(){
		for(i= 0;i<2;i++){
			console.log(i);
			hit();
		}
	}

	$("#btnDeal").click(function(){
		deal();
		$(this).toggle();
		$("#btnHit").toggle();
		$("#btnStick").toggle();
	});


	$("#btnHit").click(function(){
		hit();
	});

	$("#btnStick").click(function(){
		$("#hdrResult").html("游戏结束！");
		$("#result").toggle();
		end();
	});

	$("#btnRestart").click(function(){
		$("#result").toggle();
		$(this).toggle();
		$("#my_hand").empty();
		$("#hdrResult").html('');
		used_cards.length = 0;
		hand.cards.length = 0;
		hand.current_total = 0;	
		$("#btnDeal").toggle().trigger("click");//模拟第一次点击

	});



	function end(){
		$("#btnHit").toggle();
		$("#btnStick").toggle();
		$("#btnRestart").toggle();
	}




});