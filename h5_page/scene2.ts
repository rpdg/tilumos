class Scene2 extends Scene {
	box: Bitmap;

	constructor(prevScene: Scene) {
		super(prevScene);

		this.box = (<Scene1> this.prevScene).box;

		this.openBox();
	}

	openBox() {
		console.log(this.box);

		let light = Util.addImage(this.stage, <HTMLImageElement> this.app.preLoader.getResult('light'), 2, 0, -50);
		light.alpha = 0;

		Tween.get(light).to({alpha: 1}, 3600, createjs.Ease.sineIn);
	}
}