var Shape = createjs.Shape;
class Main {
    constructor(canvas, draftWidth = 750) {
        this.initStage(canvas, draftWidth);
        this.loadSound();
    }
    loadSound() {
        this.preLoader = new createjs.LoadQueue();
        this.preLoader.installPlugin(createjs.Sound);
        createjs.Sound.alternateExtensions = ['mp3'];
        this.preLoader.addEventListener('progress', function (e) {
            console.log('loading:', e);
        });
        this.preLoader.addEventListener('complete', (e) => this.playSound(e));
        this.preLoader.loadFile({ id: 'mySound', src: 'assets/sound/magic-wand-sparkle.mp3' });
        // OR
        this.preLoader.loadManifest([
            { id: 'myImage1', src: 'assets/image/1.jpg' },
            { id: 'myImage2', src: 'assets/image/2.png' },
        ]);
    }
    playSound(event) {
        let btn = document.getElementById('btnPlay');
        console.log(btn);
        console.log('loaded:', event);
        btn.removeAttribute('disabled');
        btn.addEventListener('click', function () {
            createjs.Sound.play('mySound');
        });
        let a = this.preLoader.getResult('myImage1');
        let b = new createjs.Bitmap(a);
        console.log('img:', a);
        this.stage.addChild(b);
    }
    initStage(canvas, draftWidth) {
        let w = document.body.clientWidth;
        let h = document.body.clientHeight;
        canvas.style.background = '#000';
        canvas.width = w;
        canvas.height = h;
        let stageScale = w / draftWidth; //宽度自适应；
        this.ratio = draftWidth / w;
        //let stageScale = h/1206; //高度自适应两者选一
        this.stage = new createjs.Stage(canvas);
        this.stage.scaleX = stageScale;
        this.stage.scaleY = stageScale;
        this.stage.setBounds(0, 0, w * this.ratio, h * this.ratio);
        createjs.Ticker.framerate = 30;
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Ticker.addEventListener('tick', (e) => this.tick(e));
        if (createjs.Touch.isSupported()) {
            createjs.Touch.enable(this.stage);
        }
    }
    tick(e) {
        this.stage.update();
    }
}
//
function run() {
    window.removeEventListener('load', run);
    new Main(document.getElementById('gameCanvas'));
}
window.addEventListener('load', run);
//# sourceMappingURL=/page/sound/index.js.map
