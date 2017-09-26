class Scene3 extends Scene {
	box: Bitmap;

	private tickHandler : Function;

	constructor(prevScene: Scene) {
		super(prevScene);
		let ctx = (<HTMLCanvasElement> this.stage.canvas).getContext('2d');

		this.draw();

		this.tickHandler = createjs.Ticker.on('tick', this.tick , this);
	}

	draw() {
		let container = new Container();
		//let bmp0 = Util.addImage(container, <HTMLImageElement> this.app.preLoader.getResult('castle-white-bg'), 0, 0, -50);
		let bmp5 = Util.addImage(container, <HTMLImageElement> this.app.preLoader.getResult('castle-white'), 5, 0, 0);

		this.stage.addChild(container);
	}

	tick(e: createjs.TickerEvent) {
		//this.stage.update();
	}

	dispose() {
		createjs.Ticker.off('tick', this.tickHandler);
	}
}