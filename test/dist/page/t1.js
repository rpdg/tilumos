class Main {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        //let scale = 1 / window.devicePixelRatio;
        let stageScale = document.documentElement.clientWidth / 750; //宽度自适应；
        //let stageScale = document.documentElement.clientHeight/1206; //高度自适应两者选一
        //document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        this.stage = new createjs.Stage(canvas);
        this.stage.scaleX = stageScale;
        this.stage.scaleY = stageScale;
        this.container = new createjs.Container();
        this.message = new createjs.Text(document.documentElement.clientWidth, 'bold 30px Segoe UI', '#e66000');
        this.message.textAlign = 'left';
        this.message.x = 100;
        this.message.y = 200;
        this.container.addChild(this.message);
        this.shape = new createjs.Shape();
        let g = this.shape.graphics;
        g.beginFill('#d030f0');
        g.drawRect(0, 0, 375, 100);
        g.endFill();
        this.shape.x = 0;
        this.shape.y = 0;
        this.shape.snapToPixel = true;
        this.stage.addChild(this.shape);
        this.stage.addChild(this.container);
        createjs.Touch.enable(this.stage);
        createjs.Ticker.addEventListener('tick', (e) => this.tick(e));
        this.testShake();
    }
    tick(e) {
        if (this.shape.y < 10) {
            this.shape.y += 2;
        }
        else if (this.shape.y > 0) {
            console.log(this.shape.y);
            this.shape.y += -2;
        }
        this.stage.update(e);
    }
    testShake() {
        //create a new instance of shake.js.
        let myShakeEvent = new Shake({
            threshold: 15
        });
        // start listening to device motion
        myShakeEvent.start();
        // register a shake event
        window.addEventListener('shake', shakeEventDidOccur, false);
        //shake event callback
        function shakeEventDidOccur() {
            //put your own code here etc.
            alert('Shake!');
        }
    }
}
window.addEventListener('load', () => {
    let canvas = document.getElementById('gameCanvas');
    canvas.style.background = '#000';
    new Main(canvas);
});
//# sourceMappingURL=/page/t1.js.map
