var Tween = createjs.Tween;
var Shape = createjs.Shape;
class ClickTip extends createjs.Container {
    constructor() {
        super();
        this.c1 = new Circle(7);
        this.addChild(this.c1);
        this.c2 = new Circle(18);
        this.addChild(this.c2);
        this.c3 = new Circle(28);
        this.addChild(this.c3);
    }
    pulsate() {
        let t1 = Tween.get(this.c1).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500).to({ alpha: 0, scaleX: 1.2, scaleY: 1.2, visible: false }, 500, createjs.Ease.cubicOut);
        let t2 = Tween.get(this.c2).wait(200).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500).to({ alpha: 0, scaleX: 1.2, scaleY: 1.2, visible: false }, 500, createjs.Ease.cubicOut);
        let t3 = Tween.get(this.c3).wait(400).to({ alpha: 0.8, scaleX: 1, scaleY: 1 }, 500).to({ alpha: 0, scaleX: 1.2, scaleY: 1.2, visible: false }, 500, createjs.Ease.cubicOut);
        let timeline = new createjs.Timeline([t1, t2, t3], {}, { loop: true }); //create the Timeline
    }
}
class Circle extends Shape {
    constructor(r) {
        super();
        let g = this.graphics;
        g.setStrokeStyle(3).beginStroke('#fff');
        g.drawCircle(0, 0, r);
        g.endStroke();
        this.alpha = 0;
        this.scaleX = this.scaleY = 0.2;
    }
}
//# sourceMappingURL=/page/star/clickTip.js.map
