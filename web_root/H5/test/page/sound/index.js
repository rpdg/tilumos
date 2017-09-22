var Shape = createjs.Shape;
class Main {
    constructor(canvas, draftWidth = 750) {
        this.initStage(canvas, draftWidth);
        this.loadSound();
    }
    loadSound() {
        this.preLoader = new createjs.LoadQueue();
        this.preLoader.installPlugin(createjs.Sound);
        //createjs.Sound.alternateExtensions = ['mp3'];
        ///
        this.progressBar = new ProgressBar();
        this.stage.addChild(this.progressBar);
        this.preLoader.addEventListener('progress', (event) => {
            this.progressBar.progress = event.progress;
        });
        this.preLoader.addEventListener('complete', (e) => this.playSound(e));
        // OR
        this.preLoader.loadManifest([
            { id: 'myImage1', src: 'assets/image/1.jpg' },
            { id: 'myImage2', src: 'assets/image/2.png' },
            { id: 'mySound', src: 'assets/sound/魔法2.mp3' },
            { id: 'mySound', src: 'assets/sound/魔法5.mp3' },
        ]);
    }
    playSound(event) {
        this.progressBar.progress = 1;
        let btn = document.getElementById('btnPlay');
        console.log(btn);
        console.log('loaded:', event);
        btn.removeAttribute('disabled');
        btn.addEventListener('click', function () {
            createjs.Sound.play('mySound');
        });
        let a = this.preLoader.getResult('myImage1');
        let b = new createjs.Bitmap(a);
        b.scaleY = b.scaleX = 750 / a.width;
        console.log('img:', a, b.getBounds().width);
        /*let s = new createjs.Shape();
        let g = s.graphics;
        g.beginBitmapFill(b);*/
        this.stage.addChildAt(b, 0);
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
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
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
