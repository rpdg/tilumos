class Main {
    constructor(canvas) {
        //this.canvas = canvas;
        //let scale = 1 / window.devicePixelRatio;
        let stageScale = document.documentElement.clientWidth / 750; //宽度自适应；
        //let stageScale = document.documentElement.clientHeight/1206; //高度自适应两者选一
        //document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        this.stage = new createjs.Stage(canvas);
        this.stage.scaleX = stageScale;
        this.stage.scaleY = stageScale;
        this.container = new createjs.Container();
        let img = new createjs.Bitmap('../img/man.jpg');
        this.container.addChild(img);
        //this.stage.setChildIndex( img, this.stage.numChildren-1);
        this.message = new createjs.Text(!!navigator.vibrate, 'bold 30px Segoe UI', '#e66000');
        this.message.textAlign = 'left';
        this.message.x = 100;
        this.message.y = 200;
        this.container.addChild(this.message);
        this.shape = new createjs.Shape();
        let g = this.shape.graphics;
        g.beginFill('#d00070');
        g.drawRect(0, 0, 375, 100);
        g.endFill();
        this.shape.x = 0;
        this.shape.y = 0;
        this.shape.snapToPixel = true;
        this.container.addChild(this.shape);
        //this.stage.addChild(this.container);
        this.circle = new Circle();
        this.stage.addChild(this.circle);
        createjs.MotionGuidePlugin.install();
        createjs.Tween.get(this.circle, { loop: true }).to({ guide: { path: [0, 0, 0, 200, 200, 200, 200, 0, 0, 0] } }, 7000);
        this.testShake();
        createjs.Touch.enable(this.stage);
        createjs.Ticker.addEventListener('tick', (e) => this.tick(e));
    }
    tick(e) {
        if (this.shape.y < 10) {
            this.shape.y += 2;
        }
        else if (this.shape.y > 0) {
            this.shape.y += -2;
        }
        this.stage.update(e);
    }
    testShake() {
        //create a new instance of shake.js.
        let myShakeEvent = new Shake();
        // start listening to device motion
        myShakeEvent.start();
        //this.message.text = 'wait Shake!';
        // register a shake event
        window.addEventListener('shake', () => {
            this.message.text = 'Shake ed !';
            this.vibrate();
        }, false);
    }
    vibrate() {
        // 振动0.5秒
        navigator.vibrate(500);
        // 振动多次
        // 参数分别是震动3秒，等待2秒，然后振动1秒
        // navigator.vibrate([3000, 2000, 1000]);
    }
}
class Circle extends createjs.Shape {
    constructor() {
        super();
        this.settings = {
            ttl: 8000,
            xmax: 5,
            ymax: 2,
            rmax: 10,
            rt: 1,
            xdef: 960,
            ydef: 540,
            xdrift: 4,
            ydrift: 4,
            random: true,
            blink: true,
        };
        let context = this.graphics;
        context.beginRadialGradientFill(["rgba(255,255,255, 0.9)", "rgba(0,0,99, 0.3)", "rgba(0,0,255, 0.02)"], [0, 0.5, 1], 100, 100, 0, 100, 100, 40);
        context.drawCircle(100, 100, 100);
        context.endFill();
    }
    reset() {
        this.x = (this.settings.random ? WIDTH * Math.random() : this.settings.xdef);
        this.y = (this.settings.random ? HEIGHT * Math.random() : this.settings.ydef);
        this.r = ((this.settings.rmax - 1) * Math.random()) + 1;
        this.dx = (Math.random() * this.settings.xmax) * (Math.random() < .5 ? -1 : 1);
        this.dy = (Math.random() * this.settings.ymax) * (Math.random() < .5 ? -1 : 1);
        this.hl = (this.settings.ttl / DRAW_INTERVAL) * (this.r / this.settings.rmax);
        this.rt = Math.random() * this.hl;
        this.settings.rt = Math.random() + 1;
        this.stop = Math.random() * .2 + .4;
        this.settings.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
        this.settings.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
    }
    tick() {
        if (this.settings.blink && (this.rt <= 0 || this.rt >= this.hl)) {
            this.settings.rt = this.settings.rt * -1;
        }
        else if (this.rt >= this.hl) {
            this.reset();
        }
        let newo = 1 - (this.rt / this.hl);
        let rect = new createjs.Shape();
        let context = rect.graphics;
        context.beginFill("#00FF00");
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        context.endFill();
        /*let cr = this.r * newo;
        gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        gradient.addColorStop(0.0, 'rgba(255,255,255,' + newo + ')');
        gradient.addColorStop(this.stop, 'rgba(77,101,181,' + (newo * .6) + ')');
        gradient.addColorStop(1.0, 'rgba(77,101,181,0)');
        context.fillStyle = gradient;
        context.fill();*/
    }
    fade() {
        this.rt += this.settings.rt;
    }
}
window.addEventListener('load', () => {
    let canvas = document.getElementById('gameCanvas');
    canvas.style.background = '#000';
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    new Main(canvas);
});
//# sourceMappingURL=/page/t1.js.map
