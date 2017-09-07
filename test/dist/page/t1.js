class Main {
    constructor(canvas) {
        this.canvas = canvas;
        let scale = 1 / window.devicePixelRatio;
        document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        this.stage = new createjs.Stage(canvas);
        createjs.Touch.enable(this.stage);
        this.message = new createjs.Text(document.documentElement.clientWidth, 'bold 30px Segoe UI', '#e66000');
        this.message.textAlign = 'center';
        this.message.x = canvas.width / 2;
        this.message.y = canvas.height / 2;
        this.stage.addChild(this.message);
        let shape = new createjs.Shape();
        let g = shape.graphics;
        g.beginFill('#d0b000');
        g.drawCircle(100, 100, 30);
        g.endFill();
        shape.x = 50;
        shape.y = 50;
        shape.snapToPixel = true;
        //this.stage.addChild(shape);
        createjs.Ticker.addEventListener('tick', (e) => this.tick(e));
    }
    tick(e) {
        /*if (stageWidth != document.documentElement.clientWidth || stageHeight != document.documentElement.clientHeight) {
            stageWidth = document.documentElement.clientWidth;
            stageHeight = document.documentElement.clientHeight;
            //外部元素自适应
            canvas.width = stageWidth;
            canvas.height = stageHeight;

            //内部元素自适应
            stageScale = stageWidth / 750;//宽度自适应；
//    stageScale = stageHeight/1206;//高度自适应两者选一
            container.scaleX = stageScale;
            container.scaleY = stageScale;
//    bitmap.x = (stageWidth -  750*bitmap.scaleX)/2;//高度自适应时解开这个注释 保证图片居中
            if (leftBtn) {
                leftBtn.x = stageWidth - 100;
            }
        }*/
        this.stage.update(e);
    }
}
window.addEventListener('load', () => {
    let canvas = document.getElementById('gameCanvas');
    canvas.style.background = '#000';
    new Main(canvas);
});
//# sourceMappingURL=/page/t1.js.map
