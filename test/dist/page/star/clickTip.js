var Shape = createjs.Shape;
var Tween = createjs.Tween;
var Timeline = createjs.Timeline;
class ClickTip extends createjs.Container {
    constructor() {
        super();
        this.c1 = new Circle(18);
        this.addChild(this.c1);
        this.c2 = new Circle(30);
        this.addChild(this.c2);
        this.c3 = new Circle(50);
        this.addChild(this.c3);
    }
    pulsate() {
        let t1 = Tween.get(this.c1).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500, createjs.Ease.sineIn).to({ alpha: 0, scaleX: 1.2, scaleY: 1.2, visible: false }, 1200, createjs.Ease.sineOut);
        let t2 = Tween.get(this.c2).wait(150).to({ alpha: 0.7, scaleX: 1, scaleY: 1 }, 500, createjs.Ease.sineIn).to({ alpha: 0, scaleX: 1.2, scaleY: 1.2, visible: false }, 1200, createjs.Ease.sineOut);
        let t3 = Tween.get(this.c3).wait(300).to({ alpha: 0.4, scaleX: 1, scaleY: 1 }, 500, createjs.Ease.sineIn).to({ alpha: 0, scaleX: 1.2, scaleY: 1.2, visible: false }, 1200, createjs.Ease.sineOut);
        //create the Timeline
        this.tl = new createjs.Timeline([t1, t2, t3], {}, { loop: true });
    }
    dispose() {
        Tween.removeTweens(this.c1);
        Tween.removeTweens(this.c2);
        Tween.removeTweens(this.c3);
        this.removeAllChildren();
        this.parent.removeChild(this);
    }
}
class Circle extends Shape {
    constructor(r) {
        super();
        let g = this.graphics;
        g.setStrokeStyle(4).beginStroke('#fff');
        g.drawCircle(0, 0, r);
        g.endStroke();
        this.alpha = 0;
        this.scaleX = this.scaleY = 0.2;
    }
}
//# sourceMappingURL=/page/star/clickTip.js.map
