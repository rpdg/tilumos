var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])};return function(e,r){function i(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}}(),Shape=createjs.Shape,Graphics=createjs.Graphics,ProgressBar=function(t){function e(){var e=t.call(this)||this;e.barWidth=200,e.barHeight=15,e.percent=0,e.prevPercent=0,e.width=0,e.hue=0;var r=e.graphics;return r.beginFill("#888"),r.drawRect(0,0,e.barWidth,e.barHeight),r.endFill(),e.progressBarTicker=createjs.Ticker.on("tick",e.update,e),e}return __extends(e,t),e.prototype.update=function(){if(this.percent!=this.prevPercent)if(this.prevPercent=this.percent,this.percent<1){this.hue=90*this.percent,this.width=this.barWidth*this.percent;var t=this.graphics;t.beginFill(createjs.Graphics.getHSL(this.hue,100,40,1)),t.drawRect(0,0,this.width,this.barHeight)}else this.dispose()},Object.defineProperty(e.prototype,"progress",{set:function(t){this.percent=t},enumerable:!0,configurable:!0}),e.prototype.dispose=function(){var t=this;createjs.Ticker.off("tick",this.progressBarTicker),setTimeout(function(){t.parent.removeChild(t)},100)},e}(Shape);