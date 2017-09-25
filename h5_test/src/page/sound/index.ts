import Shape = createjs.Shape;

class Main {
	private stage: createjs.Stage;
	private ratio: number;
	private preLoader: createjs.LoadQueue;
	private progressBar :ProgressBar;


	constructor(canvas: HTMLCanvasElement, draftWidth?: number = 750) {
		this.initStage(canvas, draftWidth);
		this.loadSound();
	}

	private loadSound() {
		this.preLoader = new createjs.LoadQueue();
		this.preLoader.installPlugin(createjs.Sound);
		//createjs.Sound.alternateExtensions = ['mp3'];


		///
		this.progressBar = new ProgressBar();
		this.stage.addChild(this.progressBar);
		this.preLoader.addEventListener('progress',  (event: createjs.ProgressEvent) => {
			this.progressBar.progress = event.progress ;
		});
		this.preLoader.addEventListener('complete', (e: createjs.ProgressEvent) => this.playSound(e));


		// OR
		this.preLoader.loadManifest([
			{id: 'myImage1', src: 'assets/image/1.jpg'},
			{id: 'myImage2', src: 'assets/image/2.png'},
			{id: 'mySound', src: 'assets/sound/sparkle.mp3'},
			{id: 'mySound', src: 'assets/sound/magic.mp3'},
		]);


	}

	private playSound(event: createjs.ProgressEvent) {
		this.progressBar.progress = 1 ;

		let btn = document.getElementById('btnPlay');
		console.log(btn);
		console.log('loaded:', event);
		btn.removeAttribute('disabled');
		btn.addEventListener('click', function () {
			createjs.Sound.play('mySound');
		});

		let a = <HTMLImageElement> this.preLoader.getResult('myImage1');
		let b: createjs.Bitmap = new createjs.Bitmap(a);
		b.scaleY = b.scaleX = 750 / a.width;
		console.log('img:', a, b.getBounds().width);
		/*let s = new createjs.Shape();
		let g = s.graphics;
		g.beginBitmapFill(b);*/

		this.stage.addChildAt(b , 0);
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

		createjs.Ticker.framerate = 30;
		createjs.Ticker.timingMode = createjs.Ticker.RAF;

		createjs.Ticker.addEventListener('tick', (e: createjs.TickerEvent) => this.tick(e));

		this.stage.mouseChildren = this.stage.mouseEnabled = false;

		if (createjs.Touch.isSupported()) {
			createjs.Touch.enable(this.stage);
		}
	}

	private tick(e: createjs.TickerEvent) {
		this.stage.update();
	}
}


//
function run() {
	window.removeEventListener('load', run);
	new Main(<HTMLCanvasElement> document.getElementById('gameCanvas'));
}

window.addEventListener('load', run);