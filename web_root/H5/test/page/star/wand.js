class Wand extends createjs.Shape {
    /*private forward: boolean;

    private breathing: boolean;
    private min: number;
    private max: number;*/
    constructor(x, y) {
        super();
        /*this.breathing = false;
        this.forward = true;*/
        let g = this.graphics;
        g.beginFill('#d00070');
        g.drawRect(0, 0, 10, 100);
        g.endFill();
        this.x = x;
        this.y = y;
        //createjs.Ticker.addEventListener('tick', (e: createjs.TickerEvent) => this.tick(e));
    }
    /*tick(e: createjs.TickerEvent) {
        if (this.breathing) {
            if (this.forward) {
                this.y += 0.3;
            } else {
                this.y -= 0.3;
            }
            if (this.y < this.min || this.y > this.max) {
                this.forward = !this.forward;
            }
        }
    }

    breath(b: boolean = true) {
        if (b) {
            this.min = this.y - 7;
            this.max = this.y + 7;
        }
        this.breathing = b;
    }*/
    dispose() {
        createjs.Ticker.removeAllEventListeners('tick');
        this.parent.removeChild(this);
    }
}
//# sourceMappingURL=/page/star/wand.js.map
