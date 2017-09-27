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
        console.log('bmp5', bmp5);
        this.stage.addChild(container);
    }
}
//# sourceMappingURL=/scene2.js.map
