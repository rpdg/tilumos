var Shape = createjs.Shape;
var Graphics = createjs.Graphics;
let progressBarInstance;
function progressBarTick() {
    progressBarInstance.update();
}
class ProgressBar extends Shape {
    constructor() {
        super();
        this.barWidth = 200;
        this.barHeight = 15;
        this.percent = 0; // 0 ~ 1
        this.width = 0;
        this.hue = 100;
        let g = this.graphics;
        /*g.beginFill('#272822');
        g.drawRect(0, 0, 400, 200);*/
        g.beginFill('#888');
        g.drawRect(0, 0, this.barWidth, this.barHeight);
        g.endFill();
        progressBarInstance = this;
        createjs.Ticker.addEventListener('tick', progressBarTick);
    }
    update() {
        console.log('update');
        if (this.percent < 1) {
            if (this.width / this.barWidth < this.percent) {
                this.hue += 0.8;
                this.width += 2;
                let g = this.graphics;
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
    set progress(n) {
        this.percent = n;
    }
    dispose() {
        //debugger;
        createjs.Ticker.removeEventListener('tick', progressBarTick);
        this.parent.removeChild(this);
    }
}
//# sourceMappingURL=/page/sound/progressBar.js.map
