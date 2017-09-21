//kap canvas 1.5.4 with createjs.
if(!kap)kap={};

kap.distance=function(p0,p1){
	if(!p1){
		return 0;
	}else{
		return Math.sqrt((p0.x-p1.x)*(p0.x-p1.x)+(p0.y-p1.y)*(p0.y-p1.y));
	}
}

//计算触点位置
kap.pointerEventToXY=function(e,idx){ //idx为多点触摸时点的索引
	if(!idx)idx=0;
	var out = {x:0, y:0};
	if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
		var touch = e.originalEvent.touches[idx] || e.originalEvent.changedTouches[idx];
		if(!touch)return null;
		out.x = touch.pageX;
		out.y = touch.pageY;
	}else if(e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
		out.x = e.pageX;
		out.y = e.pageY;
	}
	return out;
};

//自动建画布
kap.newStage=function($arg){
	//wrap,width,height,skin
	var $t=$arg.wrap;
	var sw=$arg.width;
	var sh=$arg.height;
	var skin=$arg.skin;
	var autoClear=$arg.autoClear;
	var mycanvas=$t.attr("id")+"_canvas";
	if($t.find("#"+mycanvas).length>0){
		$t.find("#"+mycanvas).remove();
	}
	$t.prepend('<canvas class="kap-canvas-stage" id="'+mycanvas+'" width="'+sw+'" height="'+sh+'"></canvas>');
	var stage = new createjs.Stage(mycanvas);
	stage.autoClear = autoClear;	
	createjs.Touch.enable(stage);
	createjs.Ticker.addEventListener("tick", stage);
	stage.clear();
	stage.$id=$("#"+mycanvas);
	if(skin!=null)stage.$id.addClass(skin);
	return stage;
}

kap.delStage=function($t){
	$t.find("canvas").remove();
}

//载入声音,播放为resultList["id"].play();
kap.loadSound=function($arg){
	//list:[{id,onload,onend,autoplay,loop}],onload(result),oncomplete(resultList)
	var list=[];
	var sNum=$arg.list.length;
	var sCounter=sNum;
	//function myObj(){return this};
	for(var i=0;i<sNum;i++){
		data=$arg.list[i];
		var a=document.createElement('audio');
		a.dataObj={id:data.id,autoplay:data.autoplay,loop:data.loop,onload:data.onload,onend:data.onend,sound:a};
		a.addEventListener("canplay",function(){
			sCounter--;
			if($arg.onload!=null){
				$arg.onload(this.dataObj);
			}
			if(onload!=null)onload(this.dataObj);
			if(sCounter<=0){
				if($arg.oncomplete!=null){
					$arg.oncomplete(list);
				}
			}
			if(this.dataObj.autoplay){
				//console.log("autoplay");
				this.play();
			}
		});
		a.addEventListener("ended",function(){
			if(this.dataObj.onend!=null)this.dataObj.onend(this.dataObj);
			if(this.dataObj.loop){
				//console.log("loop");
				this.play();
			}
		});
		a.src=data.src;
		a.load();
		a.dataObj.play=function(){if(!this.loop){this.sound.currentTime=0;};this.sound.play();};
		a.dataObj.stop=function(){this.sound.pause();};
		list[data.id]=a.dataObj;
	}
	return list;
}

//createjs扩展
kap.createjs={};
kap.createjs.bitmapMask=function(bitmap,mask){	//利用jpg+png通道文件生成较小的arbg图片
	var pic=new createjs.Bitmap(bitmap);
	var pic_mask=new createjs.Bitmap(mask);
	var bounds=pic.getBounds();
	pic_mask.cache(0,0,bounds.width,bounds.height);
	pic.filters = [
		 new createjs.AlphaMaskFilter(pic_mask.cacheCanvas)
	];
	pic.cache(0,0,bounds.width,bounds.height);
	return pic;
}