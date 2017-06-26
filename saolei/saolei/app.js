
 document.oncontextmenu = function(){
                return false;
            };


 //给LEVEL下拉菜单添加事件
 addEvent(oGameLevel,'change',function(){
	 Map.bombNum=parseInt(oGameLevel.options[oGameLevel.selectedIndex].value);
	 newGame.restart();
})


 //给重新开始按钮添加事件
 addEvent(oStart,'click',function(){
			newGame.restart();
})


//游戏对象构造函数	
function Game(){
	this.mask();
}
//页面初始化
	function start(){
		newGame=new Game();
	}

//游戏对象原型
Game.prototype={
	timer:null,
	//画布初始画面
	mask:function(){
		oMarkNum.innerHTML=format(Map.bombNum);
		context.drawImage(Img.oStart,0,0,200,200);
	},
	//游戏初始化
	init:function(){
		var oThis=this;
		addEvent(oCanvas,'mousedown',click);
		Map.arr=[];
		context.clearRect(0,0,200,200);
		Bg.draw();
		Bomb.draw(Map.bombNum);
		for(var i=0;i<Map.arr.length;i++){
			for(var j=0;j<Map.arr[i].length;j++){
				if(Map.arr[i][j].flag!="bomb"){
					Map.arr[i][j].flag=surroundBombNum(getSurround(Map.arr[i][j]));
				}
			}
		}
	},
	//游戏重新开始
	restart:function(){
		clearInterval(this.timer);
		this.timer=null;
		this.timer=setInterval(function(){
				oTime.innerHTML=format(parseInt(oTime.innerHTML)+1);
			},1000);
		oTime.innerHTML="000";
		oMarkNum.innerHTML=format(Map.bombNum)
		oStart.value="重新开始！";
		this.init();
	},
	//游戏结束
	gameover:function(){
		clearInterval(this.timer);
		this.timer=null;
		removeEvent(oCanvas,'mousedown',click);
		context.drawImage(Img.oGameover,0,0,200,200);
		setTimeout(function(){
			alert("你输了！请重新开始！:)");
		},100)
	},
	//游戏胜利
	win:function(){
		clearInterval(this.timer);
		this.timer=null;
		removeEvent(oCanvas,'mousedown',click);
		context.drawImage(Img.oWin,0,0,200,200);
		setTimeout(function(){
			alert("你赢了！好棒！要不要再来一次？");
		},100)
		
	},
}


//得到方格周围的格子数组
function getSurround(obj){
	var oArr=[];
	if(obj.i==0&&obj.j==0){
		oArr=[Map.arr[0][1],Map.arr[1][0],Map.arr[1][1]];
	}
	else if(obj.i==9&&obj.j==0){
		oArr=[Map.arr[8][0],Map.arr[8][1],Map.arr[9][1]];
	}
	else if(obj.i==0&&obj.j==9){
		oArr=[Map.arr[0][8],Map.arr[1][8],Map.arr[1][9]];
	}
	else if(obj.i==9&&obj.j==9){
		oArr=[Map.arr[9][8],Map.arr[8][8],Map.arr[8][9]];
	}
	else if(obj.i==0&&obj.j!=0&&obj.j!=9){
		oArr=[Map.arr[obj.i][obj.j-1],Map.arr[obj.i+1][obj.j-1],Map.arr[obj.i+1][obj.j],Map.arr[obj.i+1][obj.j+1],Map.arr[obj.i][obj.j+1]]
	}
	else if(obj.i==9&&obj.j!=0&&obj.j!=9){
		oArr=[Map.arr[obj.i][obj.j-1],Map.arr[obj.i-1][obj.j-1],Map.arr[obj.i-1][obj.j],Map.arr[obj.i-1][obj.j+1],Map.arr[obj.i][obj.j+1]]
	}
	else if(obj.j==0&&obj.i!=0&&obj.i!=9){
		oArr=[Map.arr[obj.i-1][obj.j],Map.arr[obj.i-1][obj.j+1],Map.arr[obj.i][obj.j+1],Map.arr[obj.i+1][obj.j+1],Map.arr[obj.i+1][obj.j]]
	}
	else if(obj.j==9&&obj.i!=0&&obj.i!=9){
		oArr=[Map.arr[obj.i-1][obj.j],Map.arr[obj.i-1][obj.j-1],Map.arr[obj.i][obj.j-1],Map.arr[obj.i+1][obj.j-1],Map.arr[obj.i+1][obj.j]]
	}
	else {
		oArr=[Map.arr[obj.i-1][obj.j-1],Map.arr[obj.i][obj.j-1],Map.arr[obj.i+1][obj.j-1],Map.arr[obj.i+1][obj.j],Map.arr[obj.i+1][obj.j+1],Map.arr[obj.i][obj.j+1],Map.arr[obj.i-1][obj.j+1],Map.arr[obj.i-1][obj.j]]
	}
	return oArr;
}


//得到方格周围的雷的数量
function surroundBombNum(arr){
	
	var num=0;
	for(var n=0;n<arr.length;n++){
		if(arr[n].flag=="bomb"){
			num++;
		}
	}
	return num;
}


//用递归空方格周围的格子
function openSurround(obj){
	var arr=getSurround(obj);
	for(var i=0;i<arr.length;i++){
		arr[i].draw();
		if(arr[i].flag==0&&arr[i].state!="open"){
			arr[i].state="open";
			openSurround(arr[i]);
		}else{
			arr[i].state="open";
		}
	}
}


//画布点击函数（左键打开，右键标记）
function click(event){
	var i=Math.floor((event.clientX- oGame.offsetLeft-oBox.offsetLeft)/Map.cell_width);
	var j=Math.floor((event.clientY- oGame.offsetTop-oBox.offsetTop)/Map.cell_height);
	if(i<=9){
		//左键
		if(event.button==0){
			Map.arr[i][j].draw();
			Map.arr[i][j].state="open";
			if(Map.arr[i][j].flag=="bomb"){
				setTimeout(function(){
					newGame.gameover();
				},200)
			}
			else if(Map.arr[i][j].flag==0){
				openSurround(Map.arr[i][j]);
			}
			var oClose=0;
			//统计格子关闭的数量
			for(var i=0;i<Map.arr.length;i++){
				for(var j=0;j<Map.arr[i].length;j++){
					if(Map.arr[i][j].state=="close"){
					oClose++;	
					}
				}
			}
			//一颗雷没挖到，并且关闭的格子<=10，游戏胜利
			oClose<=Map.bombNum&&setTimeout(function(){
				newGame.win();
			},200)
		}
		//右键
		else if(event.button==2){
			if(Map.arr[i][j].mark=="empty"&&Map.arr[i][j].state=="close"){
				Map.arr[i][j].drawMark();
				Map.arr[i][j].mark="marked";
			}else if(Map.arr[i][j].mark=="marked"&&Map.arr[i][j].state=="close"){
				Bg.paint(Map.arr[i][j]);
				Map.arr[i][j].mark="empty";
			}
			var oMarked=0;
			for(var i=0;i<Map.arr.length;i++){
				for(var j=0;j<Map.arr[i].length;j++){
					if(Map.arr[i][j].mark=="marked"){
					oMarked++;	
					}
				}
			}
			oMarkNum.innerHTML=format(Map.bombNum-oMarked);
			stopDefault(event);
		}
	}
}
