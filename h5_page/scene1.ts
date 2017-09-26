

class Scene1 extends Scene {

	wand: Bitmap;
	box: Bitmap;
	bg: Bitmap;


	private particleSystem: particlejs.ParticleSystem;
	private particleYOffset: number = 130;

	private tickHandler : Function;

	constructor(app: App) {
		super(app);

		this.bg = Util.addImage(app.stage, <HTMLImageElement> app.preLoader.getResult('bg-1'), 0, 0, -50);

		this.wand = Util.addImage(app.stage, <HTMLImageElement> app.preLoader.getResult('wand'), 1, 350, 80);
		Util.breath(this.wand, 10);

		this.box = Util.addImage(app.stage, <HTMLImageElement> app.preLoader.getResult('box'), 1, 10, 550);


		//
		let clickTip = new ClickTip();
		clickTip.x = 460;
		clickTip.y = 810;
		app.stage.addChild(clickTip);
		clickTip.pulsate();

		clickTip.on('click', () => {
			Util.unBreath(this.wand);
			this.clickBox();
			this.particleSystem.emitFrequency = 100;
			this.particleYOffset = -100;
		}, this, true);


		this.particleSystem = new particlejs.ParticleSystem();
		this.stage.addChild(this.particleSystem.container);
		this.particleSystem.importFromJson(
			{
				'bgColor': '#00000',
				'width': 679,
				'height': 343,
				'emitFrequency': 30,
				'startX': 340,
				'startXVariance': 169,
				'startY': 147,
				'startYVariance': 179,
				'initialDirection': 348,
				'initialDirectionVariance': 112,
				'initialSpeed': 1.2,
				'initialSpeedVariance': 2.2,
				'friction': '0',
				'accelerationSpeed': '0',
				'accelerationDirection': '0',
				'startScale': 0.06,
				'startScaleVariance': 0.33,
				'finishScale': 0.04,
				'finishScaleVariance': '0.23',
				'lifeSpan': 50,
				'lifeSpanVariance': '93',
				'startAlpha': '1',
				'startAlphaVariance': '0',
				'finishAlpha': 0,
				'finishAlphaVariance': 0.26,
				'shapeIdList': [
					'kirakira',
					'star',
				],
				'startColor': {
					'hue': 198,
					'hueVariance': 0,
					'saturation': 100,
					'saturationVariance': 89,
					'luminance': 93,
					'luminanceVariance': 68,
				},
				'blendMode': false,
				'alphaCurveType': '0',
				'VERSION': '0.1.3',
			},
		);


		this.tickHandler = createjs.Ticker.on('tick', this.tick , this);
	}

	clickBox() {
		Tween.get(this.wand).to({rotation: -78, y: 900, x: 260}, 1500, createjs.Ease.sineIn).wait(100).call(() => {

			Tween.removeTweens(this.wand);

			createjs.Sound.play('sound_sparkle');

			this.particleSystem.initialDirection = 0;
			this.particleSystem.initialDirectionVariance = 360;
			this.particleSystem.initialSpeed = 10;
			this.particleSystem.initialSpeedVariance = 0;
			this.particleSystem.lifeSpan = 30;
			this.particleSystem.emitFrequency = 2000;
			this.particleYOffset = -150;

			setTimeout(() => {
				this.particleSystem.emitFrequency = 0;

				setTimeout(() => {
					this.stage.removeChild(this.wand);
					this.openBox();
				}, 1000);

			}, 200);

		});

	}


	openBox() {

		this.dispose();

		new Scene2(this);
	}

	tick(e: createjs.TickerEvent) {
		//console.log('emit');
		this.particleSystem.startX = this.wand.x + 160;
		this.particleSystem.startY = this.wand.y + this.particleYOffset;
		this.particleSystem.update();
	}

	dispose() {
		createjs.Ticker.off('tick', this.tickHandler);
		this.particleSystem.dispose();

	}
}