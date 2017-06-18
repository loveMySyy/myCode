//图片库 提前加载
var Img = new function() {
    this.bg = new Image();
    this.bomb=new Image();
	this.o0=new Image();
	this.o1=new Image();
    this.o2=new Image();
    this.o3=new Image();
	this.o4=new Image();
	this.o5=new Image();
    this.o6=new Image();
    this.o7=new Image();
	this.o8=new Image();
	this.oMark=new Image();
	this.oStart=new Image();
	this.oGameover=new Image();
	this.oWin=new Image();
    var numImages = 15;
    var numLoaded = 0;

    function imageLoaded() {
        numLoaded++;
		//图片加载完才开始加载页面
        if (numLoaded === numImages) {
            window.init();
        }
    }

    this.bg.onload=function(){
        imageLoaded();
    };
    this.bomb.onload=function(){
        imageLoaded();
    };
	this.o0.onload=function(){
        imageLoaded();
    };
	this.o1.onload=function(){
        imageLoaded();
    };
    this.o2.onload=function(){
        imageLoaded();
    };
    this.o3.onload=function(){
        imageLoaded();
    };
	this.o4.onload=function(){
        imageLoaded();
    };
	this.o5.onload=function(){
        imageLoaded();
    };
    this.o6.onload=function(){
        imageLoaded();
    };
    this.o7.onload=function(){
        imageLoaded();
    };
	 this.o8.onload=function(){
        imageLoaded();
    };
	this.oMark.onload=function(){
        imageLoaded();
    };
	this.oStart.onload=function(){
        imageLoaded();
    };
	this.oGameover.onload=function(){
        imageLoaded();
    };
	this.oWin.onload=function(){
        imageLoaded();
    };
    this.bg.src = 'saolei/Image/s.jpg';
    this.bomb.src='saolei/Image/bomb0.jpg';
	this.o0.src='saolei/Image/0.jpg';
	this.o1.src='saolei/Image/1.jpg';
    this.o2.src='saolei/Image/2.jpg';
    this.o3.src='saolei/Image/3.jpg';
	this.o4.src='saolei/Image/4.jpg';
	this.o5.src='saolei/Image/5.jpg';
    this.o6.src='saolei/Image/6.jpg';
    this.o7.src='saolei/Image/7.jpg';
	this.o8.src='saolei/Image/8.jpg';
	this.oMark.src='saolei/Image/flag.jpg';
	this.oStart.src='saolei/Image/start.jpg';
	this.oGameover.src='saolei/Image/gameover.jpg';
	this.oWin.src='saolei/Image/win.jpg';
};