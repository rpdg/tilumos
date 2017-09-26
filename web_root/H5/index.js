var Shape = createjs.Shape;
var Bitmap = createjs.Bitmap;
class App {
    constructor(canvas, draftWidth = 750) {
        this.initStage(canvas, draftWidth);
    }
    scene1() {
        new Scene1(this);
    }
    scene2() {
        console.log('222');
    }
    tick(e) {
        this.stage.update(e);
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
            progressBar.progress = 1;
            this.scene1();
        });
        //
        this.preLoader.loadManifest([
            { id: 'bg-1', src: 'img/scene1/bg-1.jpg' },
            { id: 'wand', src: 'img/scene1/wand.png' },
            { id: 'box', src: 'img/scene1/box.png' },
            { id: 'light', src: 'img/scene1/light.png' },
            { id: 'castle-white', src: 'img/scene3/castle-white.png' },
            { id: 'castle-white-hole', src: 'img/scene3/castle-white-hole.png' },
            { id: 'castle-white-bg', src: 'img/scene3/castle-white-bg.jpg' },
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
        createjs.Ticker.addEventListener('tick', (e) => this.tick(e));
        this.loadAssets();
    }
}
//
function run() {
    window.removeEventListener('load', run);
    new App(document.getElementById('gameCanvas'));
}
window.addEventListener('load', run);
//# sourceMappingURL=/index.js.map
