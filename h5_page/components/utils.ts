import Stage = createjs.Stage;
import Bitmap = createjs.Bitmap;
import DisplayObject = createjs.DisplayObject;
import Container = createjs.Container;


interface BreathCfg {
	forward: boolean;
	y: number;
	min: number;
	max: number;
	remove: number;
	revertY: boolean;
}

interface IBreathable {
	y: number;
	breath ?: BreathCfg;
}


class Util {
	static drawGrid(stage: Stage, gap?: number = 50, color?: string = '#fff') {
		let rect = stage.getBounds();
		let to = {
			x: rect.width,
			y: rect.height,
		};

		let cur, i, freq;

		let s = new Shape();
		let g = s.graphics;

		g.clear();
		g.setStrokeStyle(1);
		g.beginStroke(color);

		for (freq = to.x / gap - 1, i = 0; i < freq; i++) {
			cur = ~~( (i + 1) * gap);
			g.moveTo(cur, 0).lineTo(cur, to.y);
		}

		for (freq = to.y / gap - 1, i = 0; i < freq; i++) {
			cur = ~~( (i + 1) * gap);
			g.moveTo(0, cur).lineTo(to.x, cur);
		}


		g.endStroke();

		stage.addChild(s);
	}


	private static breathObjs: IBreathable[] = [];
	private static breathing: boolean = false;
	private static breathCount: number = 0;

	static breath(obj: IBreathable, offset: number = 10, revertY ?: boolean = false) {
		if (Util.breathObjs.length === 0) {
			Util.breathing = true;
			createjs.Ticker.addEventListener('tick', Util.tickBreath);
		}


		//
		obj.breath = {
			forward: true,
			y: obj.y,
			min: obj.y - offset,
			max: obj.y + offset,
			remove: -1,
			revertY: revertY
		};

		Util.breathObjs.push(obj);
	}

	static unBreath(obj: IBreathable, revertY?: boolean = false): number {
		let index = Util.breathObjs.indexOf(obj);
		if (index > -1) {
			obj.breath.remove = index;
			obj.breath.revertY = revertY;
		}

		return index;
	}

	static tickBreath(e: createjs.TickerEvent) {


		if (Util.breathing) {

			if (Util.breathObjs.length === 0) {
				Util.breathing = false;
				createjs.Ticker.removeEventListener('tick', Util.tickBreath);
			}

			//Util.breathCount++;
			//let step = Math.sin(Util.breathCount * 0.017 * (2 * Math.PI / 360)) * 3;
			let step = 0.5;
			//console.log(step);

			for (let i = 0, l = Util.breathObjs.length; i < l; i++) {
				let obj = Util.breathObjs[i];

				if (obj.breath.remove === -1) {
					if (obj.breath.forward) {
						obj.y += step
					} else {
						obj.y -= step;
					}
					if (obj.y < obj.breath.min || obj.y > obj.breath.max) {
						obj.breath.forward = !obj.breath.forward;
					}
				}
				else {
					Util.breathObjs.splice(obj.breath.remove, 1);
					if (obj.breath.revertY)
						obj.y = obj.breath.y;
				}

				//console.log(obj.y, step);
			}

		}

	}


	/////


	private static time = 0;
	private static fps = 0;

	static FPS() {
		console.log(Util.fps);
	}


	static addImage(conatainer: Container, imgElem: HTMLImageElement, index: number = 0, props?:Object): Bitmap {
		let bmp: createjs.Bitmap = new createjs.Bitmap(imgElem);

		if(props){
			for(let prop in props){
				bmp[prop] = props[prop] ;
			}
		}


		conatainer.addChildAt(bmp, index);

		return bmp;
	}
}

