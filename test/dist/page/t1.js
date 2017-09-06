class Main {
    constructor(canvas) {
        this.canvas = canvas;
        this.stage = new createjs.Stage(canvas);
        this.message = new createjs.Text('message', 'bold 30px Segoe UI', '#e66000');
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
        this.stage.addChild(shape);
        createjs.Ticker.addEventListener('tick', (e) => this.tick(e));
    }
    tick(e) {
        this.stage.update(e);
    }
}
window.addEventListener('load', () => {
    let canvas = document.getElementById('gameCanvas');
    canvas.style.background = '#000';
    new Main(canvas);
});
//# sourceMappingURL=/page/t1.js.map
