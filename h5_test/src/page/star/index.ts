import Shape = createjs.Shape;


class Main {
	private stage: createjs.Stage;
	private ratio: number;
	private stars: Star[];

	constructor(canvas: HTMLCanvasElement, draftWidth?: number = 750) {
		this.initStage(canvas ,draftWidth);


		let clickTip = new ClickTip();
		clickTip.x = 200;
		clickTip.y = 200;
		this.stage.addChild(clickTip);
		clickTip.pulsate();


		this.stars = [];
		for (let i = 0, l = 40; i < l; i++) {
			let star = new Star();
			this.stage.addChild(star);
			this.stars.push(star);
		}


		let wand = new Wand(200, 200);
		wand.rotation = -35;
		this.stage.addChild(wand);


		createjs.Tween.get(wand).wait(1000).to({x: 500, y: 500}, 1000).call(function () {
			Util.breath(wand  , 20);
		});


		createjs.Ticker.framerate = 30;
		createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		createjs.Touch.enable(this.stage);

		createjs.Ticker.addEventListener('tick', (e: createjs.TickerEvent) => this.tick(e));

		this.stage.update();


		let that = this;
		clickTip.on('pressmove', function (evt: createjs.MouseEvent) {
			let s = <Shape> this;
			let p: createjs.Point = s.localToGlobal(evt.rawX, evt.rawY);

			console.log(evt, s, p);


			clickTip.x = evt.rawX * that.ratio;
			clickTip.y = evt.rawY * that.ratio;


			//clickTip.dispose()
		});

		this.stage.on('pressup', function (evt: createjs.MouseEvent) {
			console.log(evt.stageX, evt.stageY);
			console.log(evt.stageX, evt.stageY);
		});


		wand.on('pressup', function (evt: createjs.MouseEvent) {
			if (clickTip) {
				clickTip.dispose();
				clickTip = null;
			}


			if (that.stars) {
				for (let i = that.stars.length - 1; i > -1; --i) {
					//console.log(i);
					let star = <Star> that.stars.splice(i, 1)[0];
					star.dispose();
					star = null;
				}
				that.stars = null;
			}

			Util.unBreath(wand);

		});

	}

	/*private drawGrid() {
		let rect = this.stage.getBounds();
		let to = {
			x: rect.width,
			y: rect.height,
		};

		let gap = 50;
		let cur, i, freq;

		let s = new Shape();
		let g = s.graphics;

		g.clear();
		g.setStrokeStyle(1);
		g.beginStroke('#fff');

		for (freq = to.x / gap - 1, i = 0; i < freq; i++) {
			cur = ~~( (i + 1) * gap);
			g.moveTo(cur, 0).lineTo(cur, to.y);
		}

		for (freq = to.y / gap - 1, i = 0; i < freq; i++) {
			cur = ~~( (i + 1) * gap);
			g.moveTo(0, cur).lineTo(to.x, cur);
		}


		g.endStroke();

		this.stage.addChild(s);
	}*/

	private tick(e: createjs.TickerEvent) {
		this.stage.update(e);
	}

	private initStage(canvas: HTMLCanvasElement, draftWidth: number) {
		let w = document.body.clientWidth;
		let h = document.body.clientHeight;

		canvas.style.background = '#000';
		canvas.width = w;
		canvas.height = h;

		let stageScale = w / draftWidth; //宽度自适应；
		this.ratio = draftWidth / w;
		//let stageScale = h/1206; //高度自适应两者选一
		this.stage = new createjs.Stage(canvas);
		this.stage.scaleX = stageScale;
		this.stage.scaleY = stageScale;

		this.stage.setBounds(0, 0, w * this.ratio, h * this.ratio);
		Util.drawGrid(this.stage, 100);

		if (createjs.Touch.isSupported()) {
			createjs.Touch.enable(this.stage);
		}
	}
}


//
function run() {
	window.removeEventListener('load', run);
	new Main(<HTMLCanvasElement> document.getElementById('gameCanvas'));
}

window.addEventListener('load', run);