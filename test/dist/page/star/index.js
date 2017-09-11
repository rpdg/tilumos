class Main {
    constructor(canvas) {
        this.initStage(canvas);
        for (let i = 0, l = 50; i < l; i++) {
            let star = new Star();
            this.stage.addChild(star);
        }
        createjs.Ticker.framerate = 30;
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Touch.enable(this.stage);
        createjs.Ticker.addEventListener('tick', (e) => this.tick(e));
    }
    tick(e) {
        this.stage.update(e);
    }
    initStage(canvas) {
        let w = document.body.clientWidth;
        canvas.style.background = '#000';
        canvas.width = w;
        canvas.height = document.body.clientHeight;
        let stageScale = w / 750; //宽度自适应；
        //let stageScale = document.documentElement.clientHeight/1206; //高度自适应两者选一
        this.stage = new createjs.Stage(canvas);
        this.stage.scaleX = stageScale;
        this.stage.scaleY = stageScale;
        if (createjs.Touch.isSupported()) {
            createjs.Touch.enable(this.stage);
        }
    }
}
//
function run() {
    window.removeEventListener('load', run);
    new Main(document.getElementById('gameCanvas'));
}
window.addEventListener('load', run);
//# sourceMappingURL=/page/star/index.js.map
