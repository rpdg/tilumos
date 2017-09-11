class Star extends createjs.Shape {
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
        this.x = 150 * Math.random() + 100;
        this.y = 150 * Math.random() + 100;
        createjs.Ticker.addEventListener('tick', (e) => this.tick(e));
    }
    tick(e) {
        this.x += (Math.random() - 0.5) * Math.random() * 4;
        this.y += (Math.random() - 0.5) * Math.random() * 4;
        this.alpha = Math.random() * 0.3 + 0.7;
        this.scaleX = this.scaleY = Math.random() * 0.5 + 0.5;
    }
    dispose() {
        createjs.Ticker.removeAllEventListeners('tick');
        this.parent.removeChild(this);
    }
}
//# sourceMappingURL=/page/star/star.js.map
