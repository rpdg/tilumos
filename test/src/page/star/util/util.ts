import Stage = createjs.Stage;

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
}