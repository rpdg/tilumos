var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shape = createjs.Shape;
var Tween = createjs.Tween;
var Timeline = createjs.Timeline;
var ClickTip = (function (_super) {
    __extends(ClickTip, _super);
    function ClickTip() {
        var _this = _super.call(this) || this;
        _this.c1 = new Circle(18);
        _this.addChild(_this.c1);
        _this.c2 = new Circle(30);
        _this.addChild(_this.c2);
        _this.c3 = new Circle(50);
        _this.addChild(_this.c3);
        var s = new Shape();
        var g = s.graphics;
        g.beginFill('rgba(255, 255, 255, 0.01)');
        g.drawCircle(0, 0, 60);
        g.endFill();
        //s.visible = false;
        _this.addChild(s);
        _this.addEventListener('click', function () {
            _this.dispose();
        });
        return _this;
    }
    ClickTip.prototype.pulsate = function () {
        Tween.get(this.c1, { loop: true }).to({
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
        }, 500, createjs.Ease.sineIn).to({
            alpha: 0,
            scaleX: 1.2,
            scaleY: 1.2,
            visible: false
        }, 800, createjs.Ease.sineOut).wait(500);
        Tween.get(this.c2, { loop: true }).wait(100).to({
            alpha: 0.7,
            scaleX: 1,
            scaleY: 1,
        }, 500, createjs.Ease.sineIn).to({
            alpha: 0,
            scaleX: 1.2,
            scaleY: 1.2,
            visible: false
        }, 800, createjs.Ease.sineOut).wait(400);
        Tween.get(this.c3, { loop: true }).wait(200).to({
            alpha: 0.4,
            scaleX: 1,
            scaleY: 1,
        }, 500, createjs.Ease.sineIn).to({
            alpha: 0,
            scaleX: 1.2,
            scaleY: 1.2,
            visible: false
        }, 800, createjs.Ease.sineOut).wait(300);
        //create the Timeline
        //this.tl = new createjs.Timeline([t1, t2, t3], {}, {loop: true});
    };
    ClickTip.prototype.dispose = function () {
        /*let tws = this.tl._tweens as Array, l = tws.length;
         console.log(tws);
         while (l--) {
         this.tl.removeTween(tws[l]);
         }*/
        this.c1.dispose();
        this.c1 = null;
        this.c2.dispose();
        this.c2 = null;
        this.c3.dispose();
        this.c3 = null;
        this.removeAllEventListeners('click');
        this.parent.removeChild(this);
    };
    return ClickTip;
}(createjs.Container));
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(r) {
        var _this = _super.call(this) || this;
        var g = _this.graphics;
        g.setStrokeStyle(4).beginStroke('#fff');
        g.drawCircle(0, 0, r);
        g.endStroke();
        _this.alpha = 0;
        _this.scaleX = _this.scaleY = 0.2;
        _this.cache(-r * 1.5, -r * 1.5, r * 2 * 1.5, r * 2 * 1.5);
        return _this;
    }
    Circle.prototype.dispose = function () {
        //console.log(this);
        Tween.removeTweens(this);
        this.parent.removeChild(this);
    };
    return Circle;
}(Shape));
//# sourceMappingURL=/components/clickTip.js.map
