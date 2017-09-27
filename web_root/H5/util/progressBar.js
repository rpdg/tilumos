var Shape = createjs.Shape;
var Graphics = createjs.Graphics;
class ProgressBar extends Shape {
    constructor() {
        super();
        this.barWidth = 200;
        this.barHeight = 15;
        this.percent = 0; // 0 ~ 1
        this.prevPercent = 0; // 0 ~ 1
        this.width = 0;
        this.hue = 0;
        let g = this.graphics;
        /*g.beginFill('#272822');
         g.drawRect(0, 0, 400, 200);*/
        g.beginFill('#888');
        g.drawRect(0, 0, this.barWidth, this.barHeight);
        g.endFill();
        this.progressBarTicker = createjs.Ticker.on('tick', this.update, this);
    }
    update() {
        if (this.percent != this.prevPercent) {
            console.log('update', this.percent, this.prevPercent);
            this.prevPercent = this.percent;
            if (this.percent < 1) {
                this.hue = this.percent * 90;
                this.width = this.barWidth * this.percent;
                let g = this.graphics;
                g.beginFill(createjs.Graphics.getHSL(this.hue, 100, 40, 1));
                g.drawRect(0, 0, this.width, this.barHeight);
            }
            else {
                this.dispose();
            }
        }
    }
    set progress(n) {
        this.percent = n;
    }
    dispose() {
        //debugger;
        createjs.Ticker.off('tick', this.progressBarTicker);
        setTimeout(() => {
            this.parent.removeChild(this);
        }, 100);
    }
}
//# sourceMappingURL=/util/progressBar.js.map
