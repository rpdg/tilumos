var Shape = createjs.Shape;
class Main {
    constructor(canvas, draftWidth = 750) {
        this.initStage(canvas, draftWidth);
        let clickTip = new ClickTip();
        clickTip.x = 200;
        clickTip.y = 200;
        this.stage.addChild(clickTip);
        clickTip.pulsate();
        this.stars = [];
        for (let i = 0, l = 40; i < l; i++) {
            let star = new Star();
            this.stage.addChild(star);
            this.stars.push(star);
        }
        this.wand = new Wand(200, 200);
        this.wand.rotation = -35;
        this.stage.addChild(this.wand);
        createjs.Tween.get(this.wand).wait(1000).to({ x: 500, y: 500 }, 1000).call(function () {
            Util.breath(this.wand, 20);
        });
        this.particleSystem = new particlejs.ParticleSystem();
        this.stage.addChild(this.particleSystem.container);
        this.particleSystem.importFromJson({
            "bgColor": "#00000",
            "width": 679,
            "height": 343,
            "emitFrequency": 50,
            "startX": 340,
            "startXVariance": 169,
            "startY": 147,
            "startYVariance": 179,
            "initialDirection": 348,
            "initialDirectionVariance": "0",
            "initialSpeed": 1.2,
            "initialSpeedVariance": 2.2,
            "friction": "0",
            "accelerationSpeed": "0",
            "accelerationDirection": "0",
            "startScale": 0.06,
            "startScaleVariance": 0.33,
            "finishScale": 0.04,
            "finishScaleVariance": "0.23",
            "lifeSpan": "27",
            "lifeSpanVariance": "93",
            "startAlpha": "1",
            "startAlphaVariance": "0",
            "finishAlpha": 0,
            "finishAlphaVariance": 0.26,
            "shapeIdList": [
                "kirakira",
                "star"
            ],
            "startColor": {
                "hue": 198,
                "hueVariance": 0,
                "saturation": 100,
                "saturationVariance": 89,
                "luminance": 93,
                "luminanceVariance": 68
            },
            "blendMode": false,
            "alphaCurveType": "0",
            "VERSION": "0.1.3"
        });
        createjs.Ticker.framerate = 30;
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Touch.enable(this.stage);
        createjs.Ticker.addEventListener('tick', (e) => this.tick(e));
        this.stage.update();
        let that = this;
        clickTip.on('pressmove', function (evt) {
            let s = this;
            let p = s.localToGlobal(evt.rawX, evt.rawY);
            console.log(evt, s, p);
            clickTip.x = evt.rawX * that.ratio;
            clickTip.y = evt.rawY * that.ratio;
            //clickTip.dispose()
        });
        this.stage.on('pressup', function (evt) {
            console.log(evt.stageX, evt.stageY);
            console.log(evt.stageX, evt.stageY);
        });
        this.wand.on('pressup', function (evt) {
            if (clickTip) {
                clickTip.dispose();
                clickTip = null;
            }
            if (that.stars) {
                for (let i = that.stars.length - 1; i > -1; --i) {
                    //console.log(i);
                    let star = that.stars.splice(i, 1)[0];
                    star.dispose();
                    star = null;
                }
                that.stars = null;
            }
            Util.unBreath(this.wand);
        });
    }
    /*private drawGrid() {
        let rect = this.stage.getBounds();
        let to = {
            x: rect.width,
            y: rect.height,
        };

        let gap = 50;
        let cur, i, freq;

        let s = new Shape();
        let g = s.graphics;

        g.clear();
        g.setStrokeStyle(1);
        g.beginStroke('#fff');

        for (freq = to.x / gap - 1, i = 0; i < freq; i++) {
            cur = ~~( (i + 1) * gap);
            g.moveTo(cur, 0).lineTo(cur, to.y);
        }

        for (freq = to.y / gap - 1, i = 0; i < freq; i++) {
            cur = ~~( (i + 1) * gap);
            g.moveTo(0, cur).lineTo(to.x, cur);
        }


        g.endStroke();

        this.stage.addChild(s);
    }*/
    tick(e) {
        this.particleSystem.startX = this.wand.x;
        this.particleSystem.startY = this.wand.y;
        this.particleSystem.update();
        //
        this.stage.update(e);
    }
    initStage(canvas, draftWidth) {
        let w = document.body.clientWidth;
        let h = document.body.clientHeight;
        canvas.style.background = '#000';
        canvas.width = w;
        canvas.height = h;
        let stageScale = w / draftWidth; //宽度自适应；
        this.ratio = draftWidth / w;
        //let stageScale = h/1206; //高度自适应两者选一
        this.stage = new createjs.Stage(canvas);
        this.stage.scaleX = stageScale;
        this.stage.scaleY = stageScale;
        this.stage.setBounds(0, 0, w * this.ratio, h * this.ratio);
        Util.drawGrid(this.stage, 100);
        Util.FPS();
        if (createjs.Touch.isSupported()) {
            createjs.Touch.enable(this.stage);
        }
    }
}
//
function run() {
    window.removeEventListener('load', run);
    new Main(document.getElementById('gameCanvas'));
}
window.addEventListener('load', run);
//# sourceMappingURL=/page/star/index.js.map
