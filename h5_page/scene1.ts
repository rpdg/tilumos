class Scene1 extends Scene {

	wand: Bitmap;
	box: Bitmap;
	light: Bitmap;
	bg: Bitmap;


	private particleSystem: particlejs.ParticleSystem;
	private particleYOffset: number = 150;

	private tickHandler: Function;

	constructor(app: App) {
		super(app);

		this.bg = Util.addImage(this.stage, <HTMLImageElement> app.preLoader.getResult('bg-1'), 0, {y: -50});

		this.box = Util.addImage(this.stage, <HTMLImageElement> app.preLoader.getResult('box'), 1, {x: 10, y: 550});

		this.wand = Util.addImage(this.stage, <HTMLImageElement> app.preLoader.getResult('wand'), 2, {x: 350, y: 80});
		Util.breath(this.wand, 10);


		//
		let clickTip = new ClickTip();
		clickTip.x = 460;
		clickTip.y = 810;
		this.stage.addChild(clickTip);
		clickTip.pulsate();

		clickTip.on('click', function () {
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
				'initialDirectionVariance': 180,
				'initialSpeed': 1.2,
				'initialSpeedVariance': 2.2,
				'friction': '0',
				'accelerationSpeed': '0',
				'accelerationDirection': '0',
				'startScale': 0.06,
				'startScaleVariance': 0.33,
				'finishScale': 0.04,
				'finishScaleVariance': '0.23',
				'lifeSpan': 80,
				'lifeSpanVariance': 100,
				'startAlpha': 1,
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


	}

	clickBox() {
		this.particleSystem.startYVariance = 0;
		this.particleYOffset = -50;

		Tween.get(this.wand).to({rotation: -78, y: 900, x: 260}, 1000, createjs.Ease.sineIn).to({
			rotation: -75,
			y: 880,
			x: 250,
		}, 300).call(() => {

			Tween.removeTweens(this.wand);

			createjs.Sound.play('sound_sparkle');

			this.particleSystem.initialDirection = 0;
			this.particleSystem.initialDirectionVariance = 360;
			this.particleSystem.initialSpeed = 10;
			this.particleSystem.initialSpeedVariance = 0;
			this.particleSystem.lifeSpan = 40;
			this.particleSystem.emitFrequency = 5000;
			this.particleYOffset = -150;

			setTimeout(() => {
				this.particleSystem.emitFrequency = 0;

				setTimeout(() => {
					this.particleSystem.dispose();
					this.stage.removeChild(this.wand);
					createjs.Ticker.off('tick', this.tickHandler);

					this.openBox();
				}, 1200);

			}, 100);

		});

	}


	openBox() {

		this.light = Util.addImage(this.stage, <HTMLImageElement> this.app.preLoader.getResult('light'), 2, {y: -50});
		this.light.alpha = 0;

		Tween.get(this.light).to({alpha: 1}, 3600, createjs.Ease.sineIn).call(() => {
			this.dispose();
			new Scene2(this);
		});

	}

	tick(e: createjs.TickerEvent) {
		//console.log('emit');
		this.particleSystem.startX = this.wand.x + 160;
		this.particleSystem.startY = this.wand.y + this.particleYOffset;
		this.particleSystem.update();
	}

	dispose() {

		this.stage.removeChild(this.box);
		this.stage.removeChild(this.light);
		this.stage.removeChild(this.bg);
	}
}