import Shape = createjs.Shape;
import Graphics = createjs.Graphics;



class ProgressBar extends Shape implements IDispose {
	private barWidth: number = 200;
	private barHeight: number = 15;

	private percent: number = 0; // 0 ~ 1
	private prevPercent: number = 0; // 0 ~ 1
	private width: number = 0;
	private hue: number = 0;

	private progressBarTicker :Function;

	constructor() {
		super();

		let g: Graphics = this.graphics;
		/*g.beginFill('#272822');
		 g.drawRect(0, 0, 400, 200);*/

		g.beginFill('#888');
		g.drawRect(0, 0, this.barWidth, this.barHeight);

		g.endFill();

		this.progressBarTicker = createjs.Ticker.on('tick', this.update , this);
	}

	update() {

		if(this.percent != this.prevPercent){
			console.log('update' , this.percent , this.prevPercent);
			this.prevPercent = this.percent ;

			if (this.percent < 1) {
				this.hue = this.percent * 90 ;
				this.width = this.barWidth * this.percent ;
				let g: Graphics = this.graphics;
				g.beginFill(createjs.Graphics.getHSL(this.hue, 100, 40, 1));
				g.drawRect(0, 0, this.width, this.barHeight);
			}
			else {
				this.dispose();
			}
		}
	}

	set progress(n: number) {
		this.percent = n;
	}

	dispose() {
		//debugger;
		createjs.Ticker.off('tick', this.progressBarTicker);
		setTimeout(()=>{
			this.parent.removeChild(this);
		} , 100);

	}
}