import Shape = createjs.Shape;

class Main {
	private stage: createjs.Stage;
	private ratio: number;

	constructor(canvas: HTMLCanvasElement) {
		this.initStage(canvas);


		let clickTip = new ClickTip();
		clickTip.x = 200;
		clickTip.y = 200;
		this.stage.addChild(clickTip);
		clickTip.pulsate();


		for (let i = 0, l = 40; i < l; i++) {
			let star = new Star();
			this.stage.addChild(star);
		}


		let wand = new Wand(200, 200);
		wand.rotation = -35;
		this.stage.addChild(wand);


		createjs.Tween.get(wand).wait(1000).to({x: 500, y: 500}, 1000).call(wand.breath);


		createjs.Ticker.framerate = 30;
		createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		createjs.Touch.enable(this.stage);

		createjs.Ticker.addEventListener('tick', (e: createjs.TickerEvent) => this.tick(e));


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
			clickTip.dispose();
		});

	}

	private drawGrid() {
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
	}

	private tick(e: createjs.TickerEvent) {
		this.stage.update(e);
	}

	private initStage(canvas: HTMLCanvasElement) {
		let w = document.body.clientWidth;
		let h = document.body.clientHeight;

		canvas.style.background = '#000';
		canvas.width = w;
		canvas.height = h;

		let stageScale = w / 750; //宽度自适应；
		this.ratio = 750 / w;
		//let stageScale = h/1206; //高度自适应两者选一
		this.stage = new createjs.Stage(canvas);
		this.stage.scaleX = stageScale;
		this.stage.scaleY = stageScale;

		this.stage.setBounds(0, 0, 750, 1206);
		this.drawGrid();

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