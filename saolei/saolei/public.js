//事件绑定
function addEvent(element,event,halder){
	if(element.addEventListener){
		element.addEventListener(event,halder,false);
	}
	else if(element.attachEvent){
		element.attachEvent('on'+event,halder);
	}
	else{
		element['on'+event]=halder;
	}
}
//解除事件绑定
function removeEvent(element,event,halder){
	if(element.removeEventListener){
		element.removeEventListener(event,halder,false);
	}
	else if(element.detachEvent){
		element.detachEvent('on'+event,halder);
	}
	else{
		element['on'+event]=null;
	}
}
//时间数字格式转换
function format(num){
	var reg1=/^\d$/;
	var reg2=/^\d{2}$/;
	if(reg1.test(num)){
		return "00"+num;
	}
	else if(reg2.test(num)){
		return "0"+num;
	}
	else{
		return num;
	}
}
//取消事件默认行为
function stopDefault(e){
	if(e.preventDefault){
		e.preventDefault();
	}
	else{
		window.event.returnValue=false;
	}
}