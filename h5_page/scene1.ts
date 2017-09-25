class Scene1 extends Scene{


	private wand: Bitmap;
	private box: Bitmap;

	private particleSystem : particlejs.ParticleSystem ;

	constructor(app: App) {
		super(app);


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

		clickTip.addEventListener('click', ()=> {
			Util.unBreath(this.wand);
			this.clickBox();
		});


		this.particleSystem = new particlejs.ParticleSystem();
		this.stage.addChild(this.particleSystem.container);
		this.particleSystem.importFromJson(
			{
				"bgColor": "#00000",
				"width": 679,
				"height": 343,
				"emitFrequency": 80,
				"startX": 340,
				"startXVariance": 169,
				"startY": 147,
				"startYVariance": 179,
				"initialDirection": 348,
				"initialDirectionVariance": "0",
				"initialSpeed": 1.2,
				"initialSpeedVariance": 2.2,
				"friction": "0",
				"accelerationSpeed": "0",
				"accelerationDirection": "0",
				"startScale": 0.06,
				"startScaleVariance": 0.33,
				"finishScale": 0.04,
				"finishScaleVariance": "0.23",
				"lifeSpan": "27",
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


		createjs.Ticker.addEventListener('tick', (e: createjs.TickerEvent) => this.tick(e));
	}

	clickBox() {
		Tween.get(this.wand).to({rotation: -68, y: 800, x: 180}, 1500, createjs.Ease.sineIn).wait(300).call(()=> {

			Tween.removeTweens(this.wand);
			this.stage.removeChild(this.wand);

			createjs.Sound.play('sound_sparkle');

			setTimeout(()=> {
				this.openBox();
			}, 200);

		});

	}

	openBox() {
		let light = Util.addImage(this.stage, <HTMLImageElement> this.app.preLoader.getResult('light'), 2, 0, -50);
		light.alpha = 0;
		Tween.get(light).to({alpha: 1}, 3300, createjs.Ease.sineIn);

		this.dispose();
		new Scene2(this.app);
	}



	private tick(e: createjs.TickerEvent) {
		this.particleSystem.startX = this.wand.x + 180 ;
		this.particleSystem.startY = this.wand.y + 120 ;
		this.particleSystem.update();
	}

	private dispose(){
		this.particleSystem.dispose();
	}
}