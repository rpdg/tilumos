var Shape = createjs.Shape;
var Bitmap = createjs.Bitmap;
class App {
    constructor(canvas, draftWidth = 750) {
        this._stats = new Stats();
        this._stats.setMode(0);
        this._stats.domElement.style.position = "absolute";
        this._stats.domElement.style.left = "0px";
        this._stats.domElement.style.top = "0px";
        document.body.appendChild(this._stats.domElement);
        this.initStage(canvas, draftWidth);
    }
    showScene() {
        new Scene1(this);
        //new Scene2(this);
    }
    tick(e) {
        this.stage.update(e);
        this._stats.update();
    }
    loadAssets() {
        ///
        let progressBar = new ProgressBar();
        progressBar.x = this.draftWidth / 2 - 100;
        progressBar.y = 500;
        this.stage.addChild(progressBar);
        //
        this.preLoader = new createjs.LoadQueue();
        this.preLoader.installPlugin(createjs.Sound);
        //createjs.Sound.alternateExtensions = ['mp3'];
        this.preLoader.addEventListener('progress', (event) => {
            progressBar.progress = event.progress;
        });
        this.preLoader.addEventListener('complete', (e) => {
            this.preLoader.removeAllEventListeners();
            //this.preLoader.removeAll();
            console.log(this.preLoader);
            progressBar.progress = 1;
            this.showScene();
        });
        //
        this.preLoader.loadManifest([
            { id: 'bg-1', src: 'img/scene1/bg-1.jpg' },
            { id: 'wand', src: 'img/scene1/wand.png' },
            { id: 'box', src: 'img/scene1/box.png' },
            { id: 'light', src: 'img/scene1/light.png' },
            { id: 'castle-white', src: 'img/scene2/castle-white.png' },
            { id: 'castle-white-hole', src: 'img/scene2/castle-white-hole.png' },
            { id: 'castle-white-bg', src: 'img/scene2/castle-white-bg.jpg' },
            { id: 'sound_sparkle', src: 'sound/sparkle.mp3' },
            { id: 'sound_magic', src: 'sound/magic.mp3' },
        ], true, 'assets/');
    }
    initStage(canvas, draftWidth) {
        let w = document.body.clientWidth;
        let h = document.body.clientHeight;
        canvas.style.background = '#000';
        canvas.width = w;
        canvas.height = h;
        this.draftWidth = draftWidth;
        let stageScale = w / draftWidth; //宽度自适应；
        this.ratio = draftWidth / w;
        this.draftHeight = this.ratio * h;
        //let stageScale = h/1206; //高度自适应两者选一
        this.stage = new createjs.Stage(canvas);
        this.stage.scaleX = stageScale;
        this.stage.scaleY = stageScale;
        this.stage.setBounds(0, 0, w * this.ratio, h * this.ratio);
        //Util.drawGrid(this.stage, 100);
        //Util.FPS();
        if (createjs.Touch.isSupported()) {
            createjs.Touch.enable(this.stage);
        }
        createjs.Ticker.framerate = 60;
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        this.tickHandler = createjs.Ticker.on('tick', this.tick, this);
        this.loadAssets();
    }
}
//
window.addEventListener('load', function loadHandler() {
    window.removeEventListener('load', loadHandler);
    new App(document.getElementById('gameCanvas'));
});
//# sourceMappingURL=/index.js.map
