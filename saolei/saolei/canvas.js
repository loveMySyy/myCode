//方格对象
function Cell(x,y,i,j,flag){
	this.x=x;//方格x坐标 
	this.y=y;//方格y坐标 
	this.i=i;//方格的列标
	this.j=j;//方格的行标
	this.state="close";//方格的开启状态 open，close
	this.mark="empty";//方格的标记状态 marked，empty
	this.flag=flag;//方格的标志 0,1,2,3,4,5,6,7,8,bomb
	this.drawMark=function(){//给方格画标记
		context.drawImage(Img.oMark,this.x,this.y,Map.cell_width,Map.cell_height);
	};
	this.drawEmpty=function(){//给方格清空标记
		context.drawImage(Img.oMark,this.x,this.y,Map.cell_width,Map.cell_height);
	};
	this.draw=function(){//给打开方格呈现图象
		if(this.flag=="bomb"){
			context.drawImage(Img.bomb,this.x,this.y,Map.cell_width,Map.cell_height);
		}
		if(this.flag==0){
			context.drawImage(Img.o0,this.x,this.y,Map.cell_width,Map.cell_height);
		}
		if(this.flag==1){
			context.drawImage(Img.o1,this.x,this.y,Map.cell_width,Map.cell_height);
		}
		if(this.flag==2){
			context.drawImage(Img.o2,this.x,this.y,Map.cell_width,Map.cell_height)
		}
		if(this.flag==3){
			context.drawImage(Img.o3,this.x,this.y,Map.cell_width,Map.cell_height)
		}
		if(this.flag==4){
			context.drawImage(Img.o4,this.x,this.y,Map.cell_width,Map.cell_height)
		}
		if(this.flag==5){
			context.drawImage(Img.o5,this.x,this.y,Map.cell_width,Map.cell_height);
		}
		if(this.flag==6){
			context.drawImage(Img.o6,this.x,this.y,Map.cell_width,Map.cell_height);
		}
		if(this.flag==7){
			context.drawImage(Img.o7,this.x,this.y,Map.cell_width,Map.cell_height)
		}
		if(this.flag==8){
			context.drawImage(Img.o8,this.x,this.y,Map.cell_width,Map.cell_height)
		}
	}
}
//地图背景
Bg={
	draw:function(){
		for(var i=0;i<Map.rows;i++){
			Map.arr[i]=[];
			for(var j=0;j<Map.cols;j++){
				Map.arr[i][j]=new Cell(i*Map.cell_width,j*Map.cell_height,i,j,0)
				this.paint(Map.arr[i][j]);
			}
		}
		
	},
	paint:function(obj){//给地图绘制背景
		context.drawImage(Img.bg,obj.x,obj.y,Map.cell_width,Map.cell_height);
		context.beginPath();
		context.strokeStyle="#000";
		context.strokeRect(obj.x,obj.y,Map.cell_width,Map.cell_height);
		context.closePath();
	},
}
//随机雷
Bomb={
	draw:function(num){
		for(var i=0;i<num;i++){
			var x=parseInt(Math.random()*Map.cols);
			var y=parseInt(Math.random()*Map.rows);
			if(Map.arr[x][y].flag==0){
				Map.arr[x][y].flag="bomb";
			}
			else{
				i--;
			}
		}
	},
	paint:function(obj){
		context.drawImage(Img.bomb,obj.x,obj.y,Map.cell_width,Map.cell_height);
	},
	
};