var cw,ch,sw=640,sh;
	
	var _currentPage=0;
	var _lastPage=_currentPage;
	var pageFuncs=[page0,page1,page2,page3,page4,page5];
	var tpos;
	var ppos=0;

var queue=new createjs.LoadQueue(true);
var lib=[
	{id:"p0_cloud",src:"styles/cloud.png"},
	{id:"p0_t",src:"styles/p0_t.png"},
	{id:"p0_m1",src:"styles/p0_m1.png"},
	{id:"p0_m2",src:"styles/p0_m2.png"},
	{id:"p0_m3",src:"styles/p0_m3.png"},
	{id:"p0_m4",src:"styles/p0_m4.png"},
	{id:"p0_cloudp",src:"styles/cloudp.png"},
	{id:"p0_cloudp2",src:"styles/cloudp2.png"},
	{id:"leaf",src:"styles/leaf.png"},
	{id:"btn_next",src:"styles/index_arrow.png"},
	{id:"btn_next2",src:"styles/arrow.png"},
	{id:"p1_logo",src:"styles/p1_logo.png"},
	{id:"p1_wmi",src:"styles/p1_wmi.png"},
	{id:"p1_t",src:"styles/p1_t.png"},
	{id:"p2_land",src:"styles/p2_land.png"},
	{id:"p2_d1",src:"styles/p2_d1.png"},
	{id:"p2_d2",src:"styles/p2_d2.png"},
	{id:"p2_d3",src:"styles/p2_d3.png"},
	{id:"p3_land",src:"styles/p3_land.png"},
	{id:"p3_m1",src:"styles/p3_m1.png"},
	{id:"p3_m2",src:"styles/p3_m2.png"},
	{id:"p3_m3",src:"styles/p3_m3.png"},
	{id:"p3_m4",src:"styles/p3_m4.png"},
	{id:"p3_m5",src:"styles/p3_m5.png"},
	{id:"p3_t",src:"styles/p3_t.png"},
	{id:"p4_land",src:"styles/p4_land.png"},
	{id:"p4_p",src:"styles/p4_p.png"},
	{id:"p4_t",src:"styles/p4_t.png"},
	{id:"plane",src:"styles/plane.png"},
	{id:"tlogo",src:"styles/tlogo.png"},
	{id:"wait",src:"styles/wait.png"},
	{id:"tree_land",src:"styles/tree_land.png"},
	{id:"tree",src:"styles/tree.png"},
	{id:"fl",src:"styles/fl.png"}
];

$(function(){
	//kap.init();
	kap.bodyLoading(true,"努力载入中...");
	createjs.Ticker.setFPS(30);
	
	$(".btn-help").click(function(){
		pageHelp();
	});
	
	$(".btn-back").click(function(){
		$("#scroller").show();
		_currentPage=0;
		_lastPage=0;
		ppos=0;
		page0();
	});
	
	$(".btn-all").click(function(){
		page5();
	});
	
	$(".btn-share").click(function(){
		showShare();
	});
	
});

$(window).load(function(){



//	window.wechat_share.title = "这公司靠谱！童游春季招聘启动啦";
//	window.wechat_share.img_url = "http://www.tongyou.la/app_job/styles/300.png";
//	window.wechat_share.desc = "爱旅行爱小孩的亲们看过来，童游招兵买马啦！这里有很多职位在寻找牛人！";
//	window.wechat_share.link = "http://www.tongyou.la/app_job/index.htm";
//	shareAction();


	cw=$(window).width();
	ch=$(window).height();
	sh=sw*ch/cw;
	
	var filesLoaded=0;
	queue.on("fileload",function(){
		filesLoaded++;
		var p=Math.round(100*filesLoaded/lib.length);
		kap.bodyLoading(true,"载入"+p+"%");
	});
	
	queue.on("complete",function(){
		kap.bodyLoading(false);
		page0();
	});
	
	queue.loadManifest(lib);
	
	$(".j-page").each(function(idx){
		var $this=$(this);
		$this.data("pos",idx);
		$this.css({
			width:cw,
			height:ch,
			left:0,
			top:idx*ch,
			display:"block"
		});
	});

	$("#scroller").on("touchstart",function(e){
		e.preventDefault();
		tpos=kap.pointerEventToXY(e);
		//ppos=parseInt($("#pages").css("top"),10);
		
	});
	$("#scroller").on("touchmove",function(e){
		e.preventDefault();
		npos=kap.pointerEventToXY(e);
		var dis=npos.y-tpos.y;
		kap.css3trans($("#pages"),"translateY("+(ppos+dis)+"px)");
		/*
		$("#pages").css({
			top:ppos+dis
		});
		*/
	});
	$("#scroller").on("touchend",function(e){
		e.preventDefault();
		npos=kap.pointerEventToXY(e);
		var dis=npos.y-tpos.y;
		if(Math.abs(dis)>20){
			if(dis>0){
				_currentPage--;
				if(_currentPage<0)_currentPage=0;
			}else{
				_currentPage++;
				if(_currentPage>pageFuncs.length-1)_currentPage=pageFuncs.length-1;
			}
			ppos=-_currentPage*ch;
			pageFuncs[_currentPage]();
			kap.delStage($(".j-page").eq(_lastPage));
			_lastPage=_currentPage;
			//kap.rollPage("#"+$(".j-page").eq(_currentPage).attr("id"));
		}else{
			kap.rollPage("#"+$(".j-page").eq(_currentPage).attr("id"));
		}
	});
	
	
});

//重写kap.rollPage
kap.rollPage=function(pid){
	var pos=$(pid).data("pos");
	kap.css3trans($("#pages"),"translateY("+(-pos*ch)+"px)","0.6s");
}

function pageHelp(){
	kap.switchPage("#help");
}

function pageJobs(arg){
	kap.switchPage("#job");
	$("html,body").animate({
		"scrollTop":0
	},"fast");
	if(!arg){
		$("#job .jobs").show();
	}else{
		$("#job .jobs").hide();
		$("#job "+arg).show();
	}
}

function page5(){
	kap.switchPage("#pages");
	kap.rollPage("#page5");
	var stage=kap.newStage({
		width:sw,
		height:sh,
		autoClear:true,
		wrap:$("#page5")
	});	
	
	var bg=new createjs.Shape();
	bg.graphics.f("#eeeeee").dr(0,0,sw,sh);
	stage.addChild(bg);
	
	var leaves=new createjs.Container();
	stage.addChild(leaves);
	
	for(var i=0;i<5;i++){
		var l=new createjs.Shape();
		l.graphics.f("rgb("+(Math.floor(Math.random()*255))+","+(Math.floor(Math.random()*255))+","+(Math.floor(Math.random()*255))+")").dc(0,0,Math.random()*20+5);
		//l.rotation=Math.random()*360;
		l.x=Math.random()*sw;
		l.y=Math.random()*sh;
		l.xs=-Math.random()*2-2;
		l.ys=-Math.random()*2-2;
		//createjs.Tween.get(l,{loop:true}).to({rotation:l.rotation+360},Math.random()*3000+3000);
		l.alpha=0;
		createjs.Tween.get(l).wait(Math.random()*1000+200).to({alpha:1},1000);
		l.on("tick",function(){
			this.x+=this.xs;
			this.y+=this.ys;
			if(this.x<-100)this.x=sw+100;
			if(this.y<-100)this.y=sh+100;
		});
		leaves.addChild(l);	
	}
	
	var land=new createjs.Bitmap(queue.getResult("tree_land"));
	land.regY=71;
	land.y=sh;
	//createjs.Tween.get(land).wait(500).to({y:sh},500,createjs.Ease.cubicOut);
	stage.addChild(land);
	
	var tree=new createjs.Bitmap(queue.getResult("tree"));
	tree.regX=161;
	tree.regY=371;
	tree.x=440;
	tree.scaleX=tree.scaleY=0;
	tree.y=land.y-71;
	createjs.Tween.get(tree).wait(500).to({scaleX:1,scaleY:1},1000,createjs.Ease.cubicOut);
	stage.addChild(tree);
	
	var text=new createjs.Bitmap(queue.getResult("wait"));
	text.x=84;
	text.y=sh;
	createjs.Tween.get(text).wait(800).to({y:sh-122},500,createjs.Ease.bounceOut);
	stage.addChild(text);
	
	var logo=new createjs.Bitmap(queue.getResult("tlogo"));
	logo.x=44;
	logo.y=23;
	logo.alpha=0;
	createjs.Tween.get(logo).wait(500).to({alpha:1},500);
	stage.addChild(logo);
	
	var c0=new createjs.Container();
	c0.x=131;
	c0.y=251;
	c0.bg=new createjs.Shape();
	c0.bg.graphics.f("#cd1965").dc(0,0,66);
	c0.text=new createjs.Text("管理类","28px Arial","#ffffff");
	c0.text.lineHeight=24;
	c0.text.regY=12;
	c0.text.textAlign="center";
	c0.scaleX=c0.scaleY=0;
	createjs.Tween.get(c0).wait(1200).to({scaleX:1,scaleY:1},300,createjs.Ease.cubicOut).wait(300).call(function(){
		createjs.Tween.get(this,{loop:true}).to({scaleX:0.97,scaleY:0.97},300).to({scaleX:1,scaleY:1},300);
	});
	c0.addChild(c0.bg,c0.text);
	
	c0.on("click",function(){
		pageJobs(".jobs-m");
	});
	
	var c1=new createjs.Container();
	c1.x=289;
	c1.y=389;
	c1.bg=new createjs.Shape();
	c1.bg.graphics.f("#00c8a3").dc(0,0,123);
	c1.text=new createjs.Text("内容/产品执行类","28px Arial","#ffffff");
	c1.text.lineHeight=24;
	c1.text.regY=12;
	c1.text.textAlign="center";
	c1.scaleX=c1.scaleY=0;
	createjs.Tween.get(c1).wait(1400).to({scaleX:1,scaleY:1},300,createjs.Ease.cubicOut).call(function(){
		createjs.Tween.get(this,{loop:true}).to({scaleX:0.97,scaleY:0.97},300).to({scaleX:1,scaleY:1},300);
	});
	c1.addChild(c1.bg,c1.text);
	
	c1.on("click",function(){
		pageJobs(".jobs-c");
	});
	
	var c2=new createjs.Container();
	c2.x=510;
	c2.y=270;
	c2.bg=new createjs.Shape();
	c2.bg.graphics.f("#00aec8").dc(0,0,110);
	c2.text=new createjs.Text("技术/视觉类","28px Arial","#ffffff");
	c2.text.lineHeight=24;
	c2.text.regY=12;
	c2.text.textAlign="center";
	c2.scaleX=c2.scaleY=0;
	createjs.Tween.get(c2).wait(1600).to({scaleX:1,scaleY:1},300,createjs.Ease.cubicOut).wait(500).call(function(){
		createjs.Tween.get(this,{loop:true}).to({scaleX:0.97,scaleY:0.97},300).to({scaleX:1,scaleY:1},300);
	});
	c2.addChild(c2.bg,c2.text);
	
	c2.on("click",function(){
		pageJobs(".jobs-t");
	});
	
	var c3=new createjs.Container();
	c3.x=161;
	c3.y=567;
	c3.bg=new createjs.Shape();
	c3.bg.graphics.f("#69a100").dc(0,0,80);
	c3.text=new createjs.Text("运营类","28px Arial","#ffffff");
	c3.text.lineHeight=24;
	c3.text.regY=12;
	c3.text.textAlign="center";
	c3.scaleX=c3.scaleY=0;
	createjs.Tween.get(c3).wait(1600).to({scaleX:1,scaleY:1},300,createjs.Ease.cubicOut).wait(100).call(function(){
		createjs.Tween.get(this,{loop:true}).to({scaleX:0.97,scaleY:0.97},300).to({scaleX:1,scaleY:1},300);
	});
	c3.addChild(c3.bg,c3.text);
	
	c3.on("click",function(){
		pageJobs(".jobs-r");
	});
	
	stage.addChild(c0,c1,c2,c3);
	
	var fl=new createjs.Bitmap(queue.getResult("fl"));
	fl.x=221;
	fl.y=60;
	fl.alpha=0;
	createjs.Tween.get(fl).wait(1800).to({y:110,alpha:1},300).call(function(){
		createjs.Tween.get(fl,{loop:true}).to({y:100},200).to({y:110},200);
	});
	stage.addChild(fl);
	
	$("#scroller").hide();
	
}

function page4(){
	kap.switchPage("#pages");
	kap.rollPage("#page4");
	var stage=kap.newStage({
		width:sw,
		height:sh,
		autoClear:true,
		wrap:$("#page4")
	});	
	
	var bg=new createjs.Shape();
	bg.graphics.f("#00a3de").dr(0,0,sw,sh);
	stage.addChild(bg);
	
	var land=new createjs.Bitmap(queue.getResult("p4_land"));
	land.regY=250;
	land.y=sh+300;
	createjs.Tween.get(land).wait(500).to({y:sh},500,createjs.Ease.cubicOut);
	stage.addChild(land);
	
	var plane=new createjs.Bitmap(queue.getResult("plane"));
	plane.x=-100;
	plane.y=sh-222;
	createjs.Tween.get(plane,{loop:true}).to({x:sw,y:sh-280},10000);
	stage.addChild(plane);
	
	var text=new createjs.Bitmap(queue.getResult("p4_t")); 
	text.y=-20;
	text.alpha=0;
	stage.addChild(text);
	createjs.Tween.get(text).wait(500).to({alpha:1,y:0},800,createjs.Ease.cubicOut);
	
	var lines=new createjs.Sprite(new createjs.SpriteSheet({
		framerate: 30,
		images:[queue.getResult("p4_p")],
		frames:{width:510,height:48}
	}));
	
	for(var i=0;i<10;i++){
		var l=lines.clone();
		l.x=sw;
		l.y=192+i*48;
		l.gotoAndStop(i);
		createjs.Tween.get(l).wait(i*300+500).to({x:72},500,createjs.Ease.cubicOut);
		stage.addChild(l);
	}
	
	var btn_next=new createjs.Bitmap(queue.getResult("btn_next2"));
	btn_next.regX=28;
	btn_next.regY=30;
	btn_next.y=sh-50;
	btn_next.x=sw/2;
	btn_next.alpha=1;
	var ny=btn_next.y+20;
	createjs.Tween.get(btn_next,{loop:true}).to({y:ny-20,alpha:1},250).to({y:ny,alpha:0},500).to({y:ny-20,alpha:1},250);
	stage.addChild(btn_next);
	
	$("#scroller").show();
}

function page3(){
	
	kap.switchPage("#pages");
	kap.rollPage("#page3");
	var stage=kap.newStage({
		width:sw,
		height:sh,
		autoClear:true,
		wrap:$("#page3")
	});	
	
	var bg=new createjs.Shape();
	bg.graphics.f("#ffc517").dr(0,0,sw,sh);
	stage.addChild(bg);
	
	
	var text=new createjs.Bitmap(queue.getResult("p3_t")); 
	text.y=-20;
	text.alpha=0;
	stage.addChild(text);
	
	
	var leaves=new createjs.Container();
	stage.addChild(leaves);
	
	createjs.Tween.get(text).wait(2000).to({alpha:1,y:0},800,createjs.Ease.cubicOut).call(function(){
		for(var i=0;i<15;i++){
			var l=new createjs.Shape();
			l.graphics.f("rgb("+(Math.floor(Math.random()*255))+","+(Math.floor(Math.random()*255))+","+(Math.floor(Math.random()*255))+")").dc(0,0,Math.random()*20+5);
			//l.rotation=Math.random()*360;
			l.x=Math.random()*sw;
			l.y=Math.random()*sh;
			l.xs=-Math.random()*2-2;
			l.ys=-Math.random()*2-2;
			//createjs.Tween.get(l,{loop:true}).to({rotation:l.rotation+360},Math.random()*3000+3000);
			l.alpha=0;
			createjs.Tween.get(l).wait(Math.random()*1000+200).to({alpha:1},1000);
			l.on("tick",function(){
				this.x+=this.xs;
				this.y+=this.ys;
				if(this.x<-100)this.x=sw+100;
				if(this.y<-100)this.y=sh+100;
			});
			leaves.addChild(l);	
		}
	});

	
	var land=new createjs.Bitmap(queue.getResult("p3_land"));
	land.regY=376;
	land.y=sh+376;
	createjs.Tween.get(land).wait(500).to({y:sh},500,createjs.Ease.cubicOut);
	stage.addChild(land);
	
	var m1=new createjs.Bitmap(queue.getResult("p3_m1")); 
	m1.x=161;
	m1.y=sh-450;
	m1.alpha=0;
	createjs.Tween.get(m1).wait(1000).to({y:sh-470,alpha:1},300,createjs.Ease.cubicOut);
	stage.addChild(m1);
	
	var m2=new createjs.Bitmap(queue.getResult("p3_m2")); 
	m2.x=231;
	m2.y=sh-410;
	m2.alpha=0;
	createjs.Tween.get(m2).wait(1200).to({y:sh-430,alpha:1},300,createjs.Ease.cubicOut);
	stage.addChild(m2);
	
	var m3=new createjs.Bitmap(queue.getResult("p3_m3")); 
	m3.x=330;
	m3.y=sh-390;
	m3.alpha=0;
	createjs.Tween.get(m3).wait(1400).to({y:sh-410,alpha:1},300,createjs.Ease.cubicOut);
	stage.addChild(m3);
	
	var m4=new createjs.Bitmap(queue.getResult("p3_m4")); 
	m4.x=402;
	m4.y=sh-380;
	m4.alpha=0;
	createjs.Tween.get(m4).wait(1600).to({y:sh-400,alpha:1},300,createjs.Ease.cubicOut);
	stage.addChild(m4);
	
	var m5=new createjs.Bitmap(queue.getResult("p3_m5")); 
	m5.x=468;
	m5.y=sh-320;
	m5.alpha=0;
	createjs.Tween.get(m5).wait(1800).to({y:sh-340,alpha:1},300,createjs.Ease.cubicOut);
	stage.addChild(m5);


	
	var btn_next=new createjs.Bitmap(queue.getResult("btn_next"));
	btn_next.regX=28;
	btn_next.regY=30;
	btn_next.y=sh-50;
	btn_next.x=sw/2;
	btn_next.alpha=1;
	var ny=btn_next.y+20;
	createjs.Tween.get(btn_next,{loop:true}).to({y:ny-20,alpha:1},250).to({y:ny,alpha:0},500).to({y:ny-20,alpha:1},250);
	stage.addChild(btn_next);
	
	$("#scroller").show();
	
}

function page2(){
	kap.switchPage("#pages");
	kap.rollPage("#page2");
	var stage=kap.newStage({
		width:sw,
		height:sh,
		autoClear:true,
		wrap:$("#page2")
	});	
	
	var bg=new createjs.Shape();
	bg.graphics.f("#7df1e0").dr(0,0,sw,sh);
	stage.addChild(bg);
	
	var cp1=new createjs.Bitmap(queue.getResult("p0_cloudp"));
	cp1.y=Math.random()*100+600;
	cp1.x=sw+100;
	stage.addChild(cp1);
	createjs.Tween.get(cp1,{loop:true}).to({x:-100},12000);
	
	var cp2=new createjs.Bitmap(queue.getResult("p0_cloudp2"));
	cp2.y=Math.random()*100+550;
	cp2.x=sw;
	cp2.scaleX=cp2.scaleY=0.6;
	stage.addChild(cp2);
	createjs.Tween.get(cp2,{loop:true}).to({x:-100},16000);
	
	var land=new createjs.Bitmap(queue.getResult("p2_land"));
	land.regY=480;
	land.y=sh+100;
	createjs.Tween.get(land).to({y:sh},800,createjs.Ease.cubicOut);
	stage.addChild(land);
	
	var t1=new createjs.Bitmap(queue.getResult("p2_d1"));
	t1.x=281;
	t1.y=land.y-400;
	t1.alpha=0;
	createjs.Tween.get(t1).wait(1200).to({y:land.y-430,alpha:1},300,createjs.Ease.bounceOut);
	stage.addChild(t1);
	
	var t2=new createjs.Bitmap(queue.getResult("p2_d2"));
	t2.x=416;
	t2.y=land.y-560;
	t2.alpha=0;
	createjs.Tween.get(t2).wait(1500).to({y:land.y-580,alpha:1},300,createjs.Ease.bounceOut);
	stage.addChild(t2);
	
	var t3=new createjs.Bitmap(queue.getResult("p2_d3"));
	t3.x=60;
	t3.y=65;
	t3.alpha=0;
	createjs.Tween.get(t3).wait(1800).to({y:85,alpha:1},300,createjs.Ease.cubicOut).call(function(){
		for(var i=0;i<5;i++){
			var l=new createjs.Bitmap(queue.getResult("leaf"));
			l.regX=53;
			l.regY=19;
			l.scaleX=l.scaleY=Math.random()*0.3+0.1;
			l.rotation=Math.random()*360;
			l.x=Math.random()*sw;
			l.y=Math.random()*sh;
			l.xs=-Math.random()*2-2;
			l.ys=-Math.random()*2-2;
			createjs.Tween.get(l,{loop:true}).to({rotation:l.rotation+360},Math.random()*3000+3000);
			l.on("tick",function(){
				this.x+=this.xs;
				this.y+=this.ys;
				if(this.x<0)this.x=sw+100;
				if(this.y<0)this.y=sh+100;
			});
			leaves.addChild(l);	
		}
	});
	stage.addChild(t3);
	
	var btn_next=new createjs.Bitmap(queue.getResult("btn_next"));
	btn_next.regX=28;
	btn_next.regY=30;
	btn_next.y=sh-50;
	btn_next.x=sw/2;
	btn_next.alpha=1;
	var ny=btn_next.y+20;
	createjs.Tween.get(btn_next,{loop:true}).to({y:ny-20,alpha:1},250).to({y:ny,alpha:0},500).to({y:ny-20,alpha:1},250);
	stage.addChild(btn_next);
	
	var leaves=new createjs.Container();
	stage.addChild(leaves);
	$("#scroller").show();
}

function page1(){
	kap.switchPage("#pages");
	kap.rollPage("#page1");
	var stage=kap.newStage({
		width:sw,
		height:sh,
		autoClear:true,
		wrap:$("#page1")
	});	
	
	var bg=new createjs.Shape();
	bg.graphics.f("#12803b").dr(0,0,sw,sh);
	stage.addChild(bg);
	
	var logo=new createjs.Bitmap(queue.getResult("p1_logo"));
	logo.regX=151;
	logo.regY=161;
	logo.scaleX=logo.scaleY=0;
	logo.x=sw/2;
	logo.y=350;
	stage.addChild(logo);
	createjs.Tween.get(logo).wait(1000).to({scaleX:1,scaleY:1},500,createjs.Ease.bounceOut).call(function(){
		createjs.Tween.get(this,{loop:true}).to({scaleX:0.95,scaleY:0.95},500).to({scaleX:1,scaleY:1},500);
	});
	
	var wmi=new createjs.Bitmap(queue.getResult("p1_wmi"));
	wmi.regX=137;
	wmi.x=sw/2;
	wmi.y=150;
	wmi.scaleX=wmi.scaleY=0;
	createjs.Tween.get(wmi).wait(500).to({y:100,scaleX:1,scaleY:1},500,createjs.Ease.cubicOut);
	stage.addChild(wmi);
	
	var text=new createjs.Bitmap(queue.getResult("p1_t"));
	text.regX=258;
	text.x=sw/2;
	text.y=550;
	text.alpha=0;
	createjs.Tween.get(text).wait(500).to({alpha:1,y:530},500);
	stage.addChild(text);
	
	var btn_next=new createjs.Bitmap(queue.getResult("btn_next"));
	btn_next.regX=28;
	btn_next.regY=30;
	btn_next.y=sh-50;
	btn_next.x=sw/2;
	btn_next.alpha=1;
	var ny=btn_next.y+20;
	createjs.Tween.get(btn_next,{loop:true}).to({y:ny-20,alpha:1},250).to({y:ny,alpha:0},500).to({y:ny-20,alpha:1},250);
	stage.addChild(btn_next);
	$("#scroller").show();
}

function page0(){
	kap.switchPage("#pages");
	kap.rollPage("#page0");
	var stage=kap.newStage({
		width:sw,
		height:sh,
		autoClear:true,
		wrap:$("#page0")
	});	
	
	var bg=new createjs.Shape();
	bg.graphics.f("#00b9b0").dr(0,0,sw,sh);
	stage.addChild(bg);
	

	
	var cp1=new createjs.Bitmap(queue.getResult("p0_cloudp"));
	cp1.y=Math.random()*200+400;
	cp1.x=sw;
	stage.addChild(cp1);
	createjs.Tween.get(cp1,{loop:true}).to({x:-100},12000);
	
	var cp2=new createjs.Bitmap(queue.getResult("p0_cloudp2"));
	cp2.y=Math.random()*200+400;
	cp2.x=sw;
	stage.addChild(cp2);
	createjs.Tween.get(cp2,{loop:true}).to({x:-100},16000);
	
	var p0_cloud=new createjs.Bitmap(queue.getResult("p0_cloud"));
	p0_cloud.regY=398;
	p0_cloud.y=sh+400;
	stage.addChild(p0_cloud);
	
	createjs.Tween.get(p0_cloud).to({y:sh},500,createjs.Ease.cubicOut);
		
	var p0_m1=new createjs.Bitmap(queue.getResult("p0_m1"));
	p0_m1.x=30;
	p0_m1.y=sh-366;
	p0_m1.alpha=0;
	stage.addChild(p0_m1);
	
	createjs.Tween.get(p0_m1).wait(500).to({alpha:1,y:sh-326},500,createjs.Ease.cubicOut);
	
	var p0_m2=new createjs.Bitmap(queue.getResult("p0_m2"));
	p0_m2.x=194;
	p0_m2.y=sh-420;
	p0_m2.alpha=0;
	stage.addChild(p0_m2);
	createjs.Tween.get(p0_m2).wait(1000).to({alpha:1,y:sh-380},500,createjs.Ease.cubicOut);
	
	var p0_m3=new createjs.Bitmap(queue.getResult("p0_m3"));
	p0_m3.x=386;
	p0_m3.y=sh-331;
	p0_m3.alpha=0;
	stage.addChild(p0_m3);
	createjs.Tween.get(p0_m3).wait(1500).to({alpha:1,y:sh-301},500,createjs.Ease.cubicOut);
	
	var p0_m4=new createjs.Bitmap(queue.getResult("p0_m4"));
	p0_m4.x=488;
	p0_m4.y=sh-261;
	p0_m4.alpha=0;
	stage.addChild(p0_m4);
	createjs.Tween.get(p0_m4).wait(2000).to({alpha:1,y:sh-211},500,createjs.Ease.cubicOut);


	var p0_t=new createjs.Bitmap(queue.getResult("p0_t"));
	p0_t.alpha=0;
	p0_t.y=50;
	stage.addChild(p0_t);
	createjs.Tween.get(p0_t).to({alpha:1,y:0},800,createjs.Ease.cubicOut).call(function(){
		//createjs.Tween.get(this,{loop:true}).to({y:-10},600,createjs.Ease.cubicOut).to({y:0},600,createjs.Ease.cubicOut);
		for(var i=0;i<10;i++){
			var l=new createjs.Bitmap(queue.getResult("leaf"));
			l.regX=53;
			l.regY=19;
			l.scaleX=l.scaleY=Math.random()*0.3+0.1;
			l.rotation=Math.random()*360;
			l.x=Math.random()*sw;
			l.y=Math.random()*sh;
			l.xs=-Math.random()*2-2;
			l.ys=-Math.random()*2-2;
			createjs.Tween.get(l,{loop:true}).to({rotation:l.rotation+360},Math.random()*3000+3000);
			l.on("tick",function(){
				this.x+=this.xs;
				this.y+=this.ys;
				if(this.x<0)this.x=sw+100;
				if(this.y<0)this.y=sh+100;
			});
			leaves.addChild(l);	
		}
	});

	var leaves=new createjs.Container();
	stage.addChild(leaves);

	
	var btn_next=new createjs.Bitmap(queue.getResult("btn_next"));
	btn_next.regX=28;
	btn_next.regY=30;
	btn_next.y=sh-50;
	btn_next.x=sw/2;
	btn_next.alpha=1;
	var ny=btn_next.y+20;
	createjs.Tween.get(btn_next,{loop:true}).to({y:ny-20,alpha:1},250).to({y:ny,alpha:0},500).to({y:ny-20,alpha:1},250);
	stage.addChild(btn_next);
	$("#scroller").show();
}

function showShare(){
	var $share=$("#share");
	$share.show();
	$("#share .share").unbind().bind("click",function(e){
		e.preventDefault();
		$share.hide();
	});
}