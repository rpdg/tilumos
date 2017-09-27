class Scene2 extends Scene {

	private tickHandler: Function;

	constructor(prevScene: Scene | App) {
		super(prevScene);

		//let ctx = (<HTMLCanvasElement> this.stage.canvas).getContext('2d');

		this.draw();


	}

	draw() {
		let container = new Container();
		let bmp0 = Util.addImage(container, <HTMLImageElement> this.app.preLoader.getResult('castle-white-bg'), 0, 0, -50);
		let bmp5 = Util.addImage(container, <HTMLImageElement> this.app.preLoader.getResult('castle-white'), 1, 0, 0);

		this.stage.addChild(container);

		let _bmd01 = createjs.BitmapData.getBitmapData(container);
	}


}