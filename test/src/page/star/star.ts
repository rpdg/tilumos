class Star extends createjs.Shape {
	size: number;

	constructor() {
		super();

		this.size = Math.random() * Math.random() * Math.random() * 20 + 10;
		let color = createjs.Graphics.getRGB(~~(Math.random() * 50) + 50, ~~(Math.random() * 50) + 200, 255, 0.6 + Math.random() * 0.4);
		//console.log(colorHsl);
		let g = this.graphics;
		g.clear();
		g.beginRadialGradientFill([color, '#000000'], [0.0, 0.5], 0, 0, this.size / 10, 0, 0, this.size);
		g.drawCircle(0, 0, this.size);
		g.endFill();

		this.compositeOperation = 'lighter';
		this.mouseEnabled = false;
		let padding = 2;
		this.cache(-this.size - padding, -this.size - padding, this.size * 2 + padding * 2, this.size * 2 + padding * 2);

		createjs.Ticker.addEventListener('tick', (e: createjs.TickerEvent) => this.tick(e));
	}

	tick(e: createjs.TickerEvent) {
		this.x += (Math.random() - 0.5) * Math.random() *10;
		this.y += (Math.random() - 0.5) * Math.random() *10;
	}
}