import Shape = createjs.Shape;
import Graphics = createjs.Graphics;


let progressBarInstance: ProgressBar;

function progressBarTick() {
	progressBarInstance.update();
}

class ProgressBar extends Shape implements IDispose {
	private barWidth: number = 200;
	private barHeight: number = 15;

	private percent: number = 0; // 0 ~ 1
	private width: number = 0;
	private hue: number = 10;


	constructor() {
		super();

		let g: Graphics = this.graphics;
		/*g.beginFill('#272822');
		 g.drawRect(0, 0, 400, 200);*/

		g.beginFill('#888');
		g.drawRect(0, 0, this.barWidth, this.barHeight);

		g.endFill();

		progressBarInstance = this;
		createjs.Ticker.addEventListener('tick', progressBarTick);
	}

	update() {
		console.log('update' , this.percent);
		if (this.percent < 1) {

			if (this.width / this.barWidth < this.percent) {
				this.hue += 0.8;
				this.width += 2;
				let g: Graphics = this.graphics;
				g.beginFill(createjs.Graphics.getHSL(this.hue, 100, 40, 1));
				g.drawRect(0, 0, this.width, this.barHeight);
			}
			else {
				this.width = this.barWidth * this.percent;
			}
		}
		else {
			this.dispose();

		}
	}

	set progress(n: number) {
		this.percent = n;
	}

	dispose() {
		//debugger;
		createjs.Ticker.removeEventListener('tick', progressBarTick);
		this.parent.removeChild(this);
	}
}