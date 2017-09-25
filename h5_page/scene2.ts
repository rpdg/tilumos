class Scene2 extends Scene{
	constructor(app :App){
		super(app);

		this.openBox();
	}

	openBox() {
		let light = Util.addImage(this.stage, <HTMLImageElement> this.app.preLoader.getResult('light'), 2, 0, -50);
		light.alpha = 0;

		Tween.get(light).to({alpha: 1}, 3300, createjs.Ease.sineIn);



		//this.dispose();

		//new Scene2(this.app);
	}

}