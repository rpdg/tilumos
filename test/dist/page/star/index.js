class Main {
    constructor(canvas) {
        this.initStage(canvas);
        for (let i = 0, l = 50; i < l; i++) {
            let star = new Star();
            star.x = 200 * Math.random() + 100;
            star.y = 500 * Math.random() + 100;
            this.stage.addChild(star);
        }
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
window.addEventListener('load', () => {
    new Main(document.getElementById('gameCanvas'));
});
//# sourceMappingURL=/page/star/index.js.map
