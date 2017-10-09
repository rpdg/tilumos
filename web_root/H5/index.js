var Shape=createjs.Shape,Bitmap=createjs.Bitmap,App=function(){function e(e,t){void 0===t&&(t=750),this._stats=new Stats,this._stats.setMode(0),this._stats.domElement.style.position="absolute",this._stats.domElement.style.left="0px",this._stats.domElement.style.top="0px",document.body.appendChild(this._stats.domElement),this.initStage(e,t)}return e.prototype.showScene=function(){new Scene1(this)},e.prototype.tick=function(e){this.stage.update(e),this._stats.update()},e.prototype.loadAssets=function(){var e=this,t=new ProgressBar;t.x=this.draftWidth/2-100,t.y=500,this.stage.addChild(t),this.preLoader=new createjs.LoadQueue,this.preLoader.installPlugin(createjs.Sound),this.preLoader.addEventListener("progress",function(e){t.progress=e.progress}),this.preLoader.addEventListener("complete",function(){e.preLoader.removeAllEventListeners(),t.progress=1,e.showScene()}),this.preLoader.loadManifest([{id:"bg-1",src:"img/scene1/bg-1.jpg"},{id:"wand",src:"img/scene1/wand.png"},{id:"box",src:"img/scene1/box.png"},{id:"light",src:"img/scene1/light.png"},{id:"castle-white",src:"img/scene2/castle-white.png"},{id:"castle-white-hole",src:"img/scene2/castle-white-hole.png"},{id:"castle-white-bg",src:"img/scene2/castle-white-bg.jpg"},{id:"sound_sparkle",src:"sound/sparkle.mp3"},{id:"sound_magic",src:"sound/magic.mp3"}],!0,"assets/")},e.prototype.initStage=function(e,t){var s=document.body.clientWidth,i=document.body.clientHeight;e.style.background="#000",e.width=s,e.height=i,this.draftWidth=t;var a=s/t;this.ratio=t/s,this.draftHeight=this.ratio*i,this.stage=new createjs.Stage(e),this.stage.scaleX=a,this.stage.scaleY=a,this.stage.setBounds(0,0,s*this.ratio,i*this.ratio),createjs.Touch.isSupported()&&createjs.Touch.enable(this.stage,!0,!1),createjs.Ticker.framerate=60,createjs.Ticker.timingMode=createjs.Ticker.RAF_SYNCHED,this.tickHandler=createjs.Ticker.on("tick",this.tick,this),this.loadAssets()},e}();window.addEventListener("load",function e(){window.removeEventListener("load",e),new App(document.getElementById("gameCanvas"))});