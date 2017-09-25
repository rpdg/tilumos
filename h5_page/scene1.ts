function tickScene1Frame(e: createjs.TickerEvent){
	scene.tick(e);
}

let scene :Scene1;

class Scene1 extends Scene{


	private wand: Bitmap;
	private box: Bitmap;

	private particleSystem : particlejs.ParticleSystem ;
	private particleYOffset : number = 130;

	constructor(app: App) {
		super(app);

		scene = this ;

		Util.addImage(app.stage, <HTMLImageElement> app.preLoader.getResult('bg-1'), 0, 0, -50);

		this.wand = Util.addImage(app.stage, <HTMLImageElement> app.preLoader.getResult('wand'), 1, 350, 80);
		Util.breath(this.wand, 10);

		this.box = Util.addImage(app.stage, <HTMLImageElement> app.preLoader.getResult('box'), 1, 10, 550);


		//
		let clickTip = new ClickTip();
		clickTip.x = 460;
		clickTip.y = 810;
		app.stage.addChild(clickTip);
		clickTip.pulsate();

		clickTip.on('click', ()=> {
			Util.unBreath(this.wand);
			this.clickBox();
			this.particleSystem.emitFrequency = 200;
			this.particleYOffset = -100;
		} , this , true);


		this.particleSystem = new particlejs.ParticleSystem();
		this.stage.addChild(this.particleSystem.container);
		this.particleSystem.importFromJson(
			{
				"bgColor": "#00000",
				"width": 679,
				"height": 343,
				"emitFrequency": 50,
				"startX": 340,
				"startXVariance": 169,
				"startY": 147,
				"startYVariance": 179,
				"initialDirection": 348,
				"initialDirectionVariance": 112,
				"initialSpeed": 1.2,
				"initialSpeedVariance": 2.2,
				"friction": "0",
				"accelerationSpeed": "0",
				"accelerationDirection": "0",
				"startScale": 0.06,
				"startScaleVariance": 0.33,
				"finishScale": 0.04,
				"finishScaleVariance": "0.23",
				"lifeSpan":  50 ,
				"lifeSpanVariance": "93",
				"startAlpha": "1",
				"startAlphaVariance": "0",
				"finishAlpha": 0,
				"finishAlphaVariance": 0.26,
				"shapeIdList": [
					"kirakira",
					"star"
				],
				"startColor": {
					"hue": 198,
					"hueVariance": 0,
					"saturation": 100,
					"saturationVariance": 89,
					"luminance": 93,
					"luminanceVariance": 68
				},
				"blendMode": false,
				"alphaCurveType": "0",
				"VERSION": "0.1.3"
			}
		);


		createjs.Ticker.on('tick', this.tick , this);
	}

	clickBox() {
		Tween.get(this.wand).to({rotation: -68, y: 800, x: 180}, 1500, createjs.Ease.sineIn).wait(300).call(()=> {

			Tween.removeTweens(this.wand);
			this.stage.removeChild(this.wand);

			createjs.Sound.play('sound_sparkle');

			this.dispose();
			setTimeout(()=> {
				new Scene2(this.app);
			}, 200);

		});

	}



	tick(e: createjs.TickerEvent) {
		console.log('emit');
		this.particleSystem.startX = this.wand.x + 160 ;
		this.particleSystem.startY = this.wand.y + this.particleYOffset ;
		this.particleSystem.update();
	}

	dispose(){
		createjs.Ticker.removeEventListener('tick', tickScene1Frame);
		this.particleSystem.dispose();
	}
}