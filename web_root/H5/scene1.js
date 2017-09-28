var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])};return function(e,i){function a(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(a.prototype=i.prototype,new a)}}(),Scene1=function(t){function e(e){var i=t.call(this,e)||this;i.particleYOffset=150,i.bg=Util.addImage(i.stage,e.preLoader.getResult("bg-1"),0,{y:-50}),i.box=Util.addImage(i.stage,e.preLoader.getResult("box"),1,{x:10,y:550}),i.wand=Util.addImage(i.stage,e.preLoader.getResult("wand"),2,{x:350,y:80}),Util.breath(i.wand,10);var a=new ClickTip;return a.x=460,a.y=810,i.stage.addChild(a),a.pulsate(),a.on("click",function(){Util.unBreath(this.wand),this.clickBox(),this.particleSystem.emitFrequency=100,this.particleYOffset=-100},i,!0),i.particleSystem=new particlejs.ParticleSystem,i.stage.addChild(i.particleSystem.container),i.particleSystem.importFromJson({bgColor:"#00000",width:679,height:343,emitFrequency:30,startX:340,startXVariance:169,startY:147,startYVariance:179,initialDirection:348,initialDirectionVariance:180,initialSpeed:1.2,initialSpeedVariance:2.2,friction:"0",accelerationSpeed:"0",accelerationDirection:"0",startScale:.06,startScaleVariance:.33,finishScale:.04,finishScaleVariance:"0.23",lifeSpan:80,lifeSpanVariance:100,startAlpha:1,startAlphaVariance:"0",finishAlpha:0,finishAlphaVariance:.26,shapeIdList:["kirakira","star"],startColor:{hue:198,hueVariance:0,saturation:100,saturationVariance:89,luminance:93,luminanceVariance:68},blendMode:!1,alphaCurveType:"0",VERSION:"0.1.3"}),i}return __extends(e,t),e.prototype.clickBox=function(){var t=this;this.particleSystem.startYVariance=0,this.particleYOffset=-50,Tween.get(this.wand).to({rotation:-78,y:900,x:260},1e3,createjs.Ease.sineIn).to({rotation:-75,y:880,x:250},300).call(function(){Tween.removeTweens(t.wand),createjs.Sound.play("sound_sparkle"),t.particleSystem.initialDirection=0,t.particleSystem.initialDirectionVariance=360,t.particleSystem.initialSpeed=10,t.particleSystem.initialSpeedVariance=0,t.particleSystem.lifeSpan=40,t.particleSystem.emitFrequency=5e3,t.particleYOffset=-150,setTimeout(function(){t.particleSystem.emitFrequency=0,setTimeout(function(){t.particleSystem.dispose(),t.stage.removeChild(t.wand),createjs.Ticker.off("tick",t.tickHandler),t.openBox()},1200)},100)})},e.prototype.openBox=function(){var t=this;this.light=Util.addImage(this.stage,this.app.preLoader.getResult("light"),2,{y:-50}),this.light.alpha=0,Tween.get(this.light).to({alpha:1},3600,createjs.Ease.sineIn).call(function(){t.dispose(),new Scene2(t)})},e.prototype.tick=function(){this.particleSystem.startX=this.wand.x+160,this.particleSystem.startY=this.wand.y+this.particleYOffset,this.particleSystem.update()},e.prototype.dispose=function(){this.stage.removeChild(this.box),this.stage.removeChild(this.light),this.stage.removeChild(this.bg)},e}(Scene);