class Main {
	private canvas: HTMLCanvasElement;
	private stage: createjs.Stage;
	private container: createjs.Container;
	private manifest: any[];
	private queue: createjs.LoadQueue;
	private message: createjs.Text;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.canvas.width = document.documentElement.clientWidth ;
		this.canvas.height = document.documentElement.clientHeight;

		//let scale = 1 / window.devicePixelRatio;
		let stageScale = document.documentElement.clientWidth/750; //宽度自适应；
		//let stageScale = document.documentElement.clientHeight/1206; //高度自适应两者选一
		//document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

		this.stage = new createjs.Stage(canvas);
		this.stage.scaleX = stageScale;
		this.stage.scaleY = stageScale;
		createjs.Touch.enable(this.stage);

		 this.container = new createjs.Container();




		this.message = new createjs.Text(document.documentElement.clientWidth as string , 'bold 30px Segoe UI', '#e66000');
		this.message.textAlign = 'left';
		this.message.x = 100;
		this.message.y = 200;
		this.container.addChild(this.message);


		let shape = new createjs.Shape();
		let g = shape.graphics;
		g.beginFill('#d030f0');
		g.drawRect(0, 0, 375 , 100);
		g.endFill();
		shape.x = 0;
		shape.y = 0;
		shape.snapToPixel = true;
		this.stage.addChild(shape);


		this.stage.addChild(this.container);
		createjs.Ticker.addEventListener('tick', (e: createjs.TickerEvent) => this.tick(e));


	}

	tick(e: createjs.TickerEvent) {
		/*if (stageWidth != document.documentElement.clientWidth || stageHeight != document.documentElement.clientHeight) {
			stageWidth = document.documentElement.clientWidth;
			stageHeight = document.documentElement.clientHeight;
			//外部元素自适应
			canvas.width = stageWidth;
			canvas.height = stageHeight;

			//内部元素自适应
			stageScale = stageWidth / 750;//宽度自适应；
//    stageScale = stageHeight/1206;//高度自适应两者选一
			container.scaleX = stageScale;
			container.scaleY = stageScale;
//    bitmap.x = (stageWidth -  750*bitmap.scaleX)/2;//高度自适应时解开这个注释 保证图片居中
			if (leftBtn) {
				leftBtn.x = stageWidth - 100;
			}
		}*/
		this.stage.update(e);
	}
}

window.addEventListener('load', () => {
	let canvas = <HTMLCanvasElement> document.getElementById('gameCanvas');
	canvas.style.background = '#000';
	new Main(canvas);
});