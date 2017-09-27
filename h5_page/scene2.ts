import BitmapData = createjs.BitmapData;

class Scene2 extends Scene {

	sourceBmd: BitmapData;
	targetBmd: BitmapData;

	castleContainer: Container;

	private distortLength: number = 0;

	constructor(prevScene: Scene | App) {
		super(prevScene);

		//let ctx = (<HTMLCanvasElement> this.stage.canvas).getContext('2d');

		this.castleContainer = new Container();


		this.showCastleWhite();


	}

	showCastleWhite() {

		Util.addImage(this.castleContainer, <HTMLImageElement> this.app.preLoader.getResult('castle-white-bg'), 0);

		let x = this.app.draftWidth /2 , y = this.app.draftHeight /2 -50 ;
		let hole = Util.addImage(this.castleContainer, <HTMLImageElement> this.app.preLoader.getResult('castle-white-hole'), 1, {x, y , regX :x , regY :y});


		Util.addImage(this.castleContainer, <HTMLImageElement> this.app.preLoader.getResult('castle-white'), 2, {x:100, y:200});


		this.stage.addChild(this.castleContainer);


		Tween.get(hole , {loop : true}).to({rotation: 360} , 3000);


		this.castleContainer.on('click' , function () {
			Tween.removeTweens(hole);

			this.distort();
		} , this , true);

	}

	distort() {


		this.castleContainer.cache(0, 0, this.app.draftWidth, this.app.draftHeight);

		this.sourceBmd = createjs.BitmapData.getBitmapData(this.castleContainer);


		this.targetBmd = new createjs.BitmapData(null, this.app.draftWidth, this.app.draftHeight);


		this.stage.removeChild(this.castleContainer);
		let _bitmap02 = new createjs.Bitmap(this.targetBmd.canvas);
		this.stage.addChild(_bitmap02);

		this.distortLength = 1;
	}


	tick() {
		if (this.distortLength > 0) {
			if (this.distortLength < 300) {

				for (let x = 0; x < this.app.draftWidth; x++) {
					let y = this.distortLength * Math.sin(x / 18) + 200 - 162;
					this.targetBmd.drawImage(this.sourceBmd, x, 0, 1, this.app.draftHeight, x, y, 1, this.app.draftHeight);
				}

				this.distortLength += 5;
			}
		}

		/**/


		this.stage.update();
	}

}