class Main {
	private canvas: HTMLCanvasElement;
	private stage: createjs.Stage;
	private container: createjs.Container;
	private manifest: any[];
	private queue: createjs.LoadQueue;
	private message: createjs.Text;
	private shape: createjs.Shape;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.canvas.width = document.documentElement.clientWidth;
		this.canvas.height = document.documentElement.clientHeight;

		//let scale = 1 / window.devicePixelRatio;
		let stageScale = document.documentElement.clientWidth / 750; //宽度自适应；
		//let stageScale = document.documentElement.clientHeight/1206; //高度自适应两者选一
		//document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

		this.stage = new createjs.Stage(canvas);
		this.stage.scaleX = stageScale;
		this.stage.scaleY = stageScale;

		this.container = new createjs.Container();


		this.message = new createjs.Text(<string> !!navigator.vibrate, 'bold 30px Segoe UI', '#e66000');
		this.message.textAlign = 'left';
		this.message.x = 100;
		this.message.y = 200;
		this.container.addChild(this.message);


		this.shape = new createjs.Shape();
		let g = this.shape.graphics;
		g.beginFill('#309070');
		g.drawRect(0, 0, 375, 100);
		g.endFill();
		this.shape.x = 0;
		this.shape.y = 0;
		this.shape.snapToPixel = true;
		this.stage.addChild(this.shape);


		this.stage.addChild(this.container);

		this.testShake();

		createjs.Touch.enable(this.stage);
		createjs.Ticker.addEventListener('tick', (e: createjs.TickerEvent) => this.tick(e));


	}

	tick(e: createjs.TickerEvent) {
		/*if(this.shape.y < 10){
			this.shape.y += 2;
		}
		else if(this.shape.y > 0){
			console.log(this.shape.y);
			this.shape.y += -2;
		}*/
		this.stage.update(e);
	}


	testShake() {
		//create a new instance of shake.js.
		let myShakeEvent = new Shake({
			threshold: 15,
		});
		// start listening to device motion
		myShakeEvent.start();
		//this.message.text = 'wait Shake!';
		// register a shake event
		window.addEventListener('shake', () => {
			this.message.text = 'Shake ed !';
			this.vibrate();
		}, false);

	}

	vibrate() {
		// 振动1秒
		navigator.vibrate(1000);

		// 振动多次
		// 参数分别是震动3秒，等待2秒，然后振动1秒
		// navigator.vibrate([3000, 2000, 1000]);
	}
}

window.addEventListener('load', () => {
	let canvas = <HTMLCanvasElement> document.getElementById('gameCanvas');
	canvas.style.background = '#000';
	new Main(canvas);
});