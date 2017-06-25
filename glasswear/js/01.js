
$(function(){
	$('#modelList li').click(function(){
		var _this=$(this);
		$('#model').animate({opacity:0},1000,function(){
			$('<img src=image/big_'+( _this.index()+1)+'.jpg>').addClass('big').appendTo($('#box')).animate(
		{width:'428px',height:'526px'},500,function(){
			$('ul.rchoose').css('display','block').animate({left:'450px'},500,function(){
				$('#mask').hide();
			});
		})
		});
		
	})
	$('#pull').click(function(){
		if($(this).html()=='收缩'){
			$(this).html('展开')
			$('ul.rchoose').animate({height:'75px'},500);
		}
		else{
			$(this).html('收缩')
			$('ul.rchoose').animate({height:'150px'},500);
		}
	})
	$('#rchoose').click(function(){
		$('img.wear').remove();
		$('ul.rchoose').animate({left:'-50px'},500,function(){
			$('#model').animate({opacity:1},1000)
		});
		$('img.big').css('display','none');
		$('#mask').show();
	})
	var $li=$('#glassList ul li');
	console.log($li.length);
	for(var i=0;i<$li.length;i++){
		$li[i].index=i;
	}
	$('#search').click(function(){
		//原生js的ajax异步交互
		var xhr=getXhr();
		xhr.open('post','01.php');
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		var obj={
			"pinpai":$("select[name='pinpai']").val(),
			"kuanshi":$("select[name='kuanshi']").val(),
			"lianxing":$("select[name='lianxing']").val(),
			"xinghao":$("select[name='xinghao']").val(),
			"kuangxing":$("select[name='kuangxing']").val(),
		};
		var myJSON=JSON.stringify(obj);
		xhr.send('data='+myJSON);
		xhr.onreadystatechange=function(){
			if(this.readyState==4&&this.status==200){
				var data=eval('('+this.responseText+')');
				$('#glassList ul li,#glassList ul p.result').remove();
				$('<img src="image/loading.gif">').addClass('loading').appendTo($('#glassList ul'))
				.animate({opacity:0},1500,function(){
					$(this).remove();
					if(data){
						for(var i=0;i<data.length;i++){
							console.log(data[i]);
							$('#glassList ul').append($li[data[i]])
						}
					}
					else{
						$('#glassList ul').append('<P class="result">没有符合条件的眼睛！！！</p>')
					}
					
				});
			}
		}
		console.log($('#glassList ul li'))
		$('#glassList ul ').on('click','li',function(){
			console.log(this.index)
			$('img.wear').remove();
			$('<img src=image/glass_'+(this.index+1)+'.png>').addClass('wear').appendTo($('#box'));
		})
	})
	$('#glassList ul li').click(function(){
		$('img.wear').remove();
		console.log(122);
		$('<img src=image/glass_'+( $(this).index()+1)+'.png>').addClass('wear').appendTo($('#box'));
	});
	
})

function Glass(pinpai,kuanshi,lianxing,xinghao,kuangxing){
	this.pinpai=pinpai;
	this.kuanshi=kuanshi;
	this.lianxing=lianxing;
	this.xinghao=xinghao;
	this.kuangxing=kuangxing;
}
function getXhr(){
	var xhr=null;
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else{
		xhr=new ActiveXObject('Microsoft.XMLHttp');
	}
	return xhr;
}