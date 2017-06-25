<?php
	class Glass{
		function __construct($pinpai,$kuanshi,$lianxing,$xinghao,$kuangxing){
			$this->pinpai=$pinpai;
			$this->kuanshi=$kuanshi;
			$this->lianxing=$lianxing;
			$this->xinghao=$xinghao;
			$this->kuangxing=$kuangxing;
		}
	}
	$glass1=new Glass('佐藤樱花','男款','椭圆脸','小码','全框');
	$glass2=new Glass('佐藤樱花','通款','长形脸','中码','半框');
	$glass3=new Glass('毕加索','男款','方形脸','大码','无框');
	$glass4=new Glass('毕加索','女款','椭圆脸','小码','全框');
	$glass5=new Glass('沙漠之鹰','女款','长形脸','中码','半框');
	$glass6=new Glass('沙漠之鹰','男款','椭圆脸','大码','无框');
	$glass7=new Glass('蝙蝠侠','男款','方形脸','小码','全框');
	$glass8=new Glass('蝙蝠侠','女款','长形脸','中码','半框');
	$glass9=new Glass('毕加索','通款','方形脸','大码','无框');
	$glassArr=[$glass1,$glass2,$glass3,$glass4,$glass5,$glass6,$glass7,$glass8,$glass9];
	$data=$_POST['data'];
	$option=json_decode($data);
	$arr=null;
	foreach($glassArr as $i=>$value){
		if(($option->pinpai=='全部'||$value->pinpai==$option->pinpai)&&($option->kuanshi=='全部'||$option->kuanshi=='通款'||$value->kuanshi==$option->kuanshi)
			&&($option->lianxing=='全部'||$value->lianxing==$option->lianxing)&&($option->xinghao=='全部'||$value->xinghao==$option->xinghao)
		&&($option->kuangxing=='全部'||$value->kuangxing==$option->kuangxing)){
			$arr[]=$i;
		}
	}
	$oArr=json_encode($arr);
	echo($oArr);
?>