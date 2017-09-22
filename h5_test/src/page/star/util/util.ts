import Stage = createjs.Stage;
import DisplayObject = createjs.DisplayObject;


interface BreathCfg {
	forward: boolean;
	y: number;
	min: number;
	max: number;
	remove: number;
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

	static breath(obj: IBreathable, offset: number = 5) {
		if (Util.breathObjs.length === 0) {
			Util.breathing = true;
			createjs.Ticker.addEventListener('tick',  Util.tickBreath);
		}


		//
		obj.breath = {
			forward: true,
			y: obj.y,
			min: obj.y - offset,
			max: obj.y + offset,
			remove: -1,
		};

		Util.breathObjs.push(obj);
	}

	static unBreath(obj: IBreathable): number {
		let index = Util.breathObjs.indexOf(obj);
		if (index > -1) {
			obj.breath.remove = index;
		}

		return index;
	}

	static tickBreath(e: createjs.TickerEvent) {


		if (Util.breathing) {

			if (Util.breathObjs.length === 0) {
				Util.breathing = false;
				createjs.Ticker.removeEventListener('tick' ,  Util.tickBreath);
			}

			let step = Math.random();

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
					obj.y = obj.breath.y;
				}
			}

		}

	}




	/////


	private static time = 0;
	private static fps = 0;
	static FPS(){
		console.log(Util.fps);
	}

}

