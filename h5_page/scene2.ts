import BitmapData = createjs.BitmapData;

class Scene2 extends Scene {

	sourceBmd: BitmapData;
	targetBmd: BitmapData;

	castleContainer: Container;

	private distort: number = 0;

	constructor(prevScene: Scene | App) {
		super(prevScene);

		//let ctx = (<HTMLCanvasElement> this.stage.canvas).getContext('2d');

		this.castleContainer = new Container();


		this.showCastleWhite();


	}

	showCastleWhite() {

		Util.addImage(this.castleContainer, <HTMLImageElement> this.app.preLoader.getResult('castle-white-bg'), 0, 0, 0);

		let hole = Util.addImage(this.castleContainer, <HTMLImageElement> this.app.preLoader.getResult('castle-white-hole'), 1, 0, 0);
		console.log(hole.getBounds());
		//hole.regX = 100;
		//hole.regY = 100;
		//hole.rotation = 50;

		Util.addImage(this.castleContainer, <HTMLImageElement> this.app.preLoader.getResult('castle-white'), 2, 100, 200);


		this.stage.addChild(this.castleContainer);

		this.castleContainer.on('click' , function () {
			this.draw();
		} , this , true);

	}

	draw() {

		this.stage.removeChild(this.castleContainer);

		this.castleContainer.cache(0, 0, this.app.draftWidth, this.app.draftHeight);

		this.sourceBmd = createjs.BitmapData.getBitmapData(this.castleContainer);


		this.targetBmd = new createjs.BitmapData(null, this.app.draftWidth, this.app.draftHeight);


		let _bitmap02 = new createjs.Bitmap(this.targetBmd.canvas);
		this.stage.addChild(_bitmap02);

		this.distort = 1;
	}


	tick() {
		if (this.distort > 0) {
			if (this.distort < 300) {

				for (let x = 0; x < this.app.draftWidth; x++) {
					let y = this.distort * Math.sin(x / 18) + 200 - 162;
					this.targetBmd.drawImage(this.sourceBmd, x, 0, 1, this.app.draftHeight, x, y, 1, this.app.draftHeight);
				}

				this.distort += 5;
			}
		}

		/**/


		this.stage.update();
	}

}