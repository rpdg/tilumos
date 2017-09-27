class Scene2 extends Scene {
    constructor(prevScene) {
        super(prevScene);
        //let ctx = (<HTMLCanvasElement> this.stage.canvas).getContext('2d');
        this.draw();
    }
    draw() {
        let container = new Container();
        let bmp0 = Util.addImage(container, this.app.preLoader.getResult('castle-white-bg'), 0, 0, -50);
        let bmp5 = Util.addImage(container, this.app.preLoader.getResult('castle-white'), 1, 0, 0);
        container.cache(0, 0, this.app.draftWidth, this.app.draftHeight);
        this.stage.addChild(container);
        let _bmd01 = createjs.BitmapData.getBitmapData(container);
        let colorTransform = new createjs.ColorTransform(1, 1, 0, 1, 255);
        let rect = new createjs.Rectangle(0, 0, _bmd01.width >> 1, _bmd01.height);
        _bmd01.colorTransform(rect, colorTransform);
    }
}
//# sourceMappingURL=/scene2.js.map
