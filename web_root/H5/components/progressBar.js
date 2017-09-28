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
var Graphics = createjs.Graphics;
var ProgressBar = (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar() {
        var _this = _super.call(this) || this;
        _this.barWidth = 200;
        _this.barHeight = 15;
        _this.percent = 0; // 0 ~ 1
        _this.prevPercent = 0; // 0 ~ 1
        _this.width = 0;
        _this.hue = 0;
        var g = _this.graphics;
        /*g.beginFill('#272822');
         g.drawRect(0, 0, 400, 200);*/
        g.beginFill('#888');
        g.drawRect(0, 0, _this.barWidth, _this.barHeight);
        g.endFill();
        _this.progressBarTicker = createjs.Ticker.on('tick', _this.update, _this);
        return _this;
    }
    ProgressBar.prototype.update = function () {
        if (this.percent != this.prevPercent) {
            console.log('update', this.percent, this.prevPercent);
            this.prevPercent = this.percent;
            if (this.percent < 1) {
                this.hue = this.percent * 90;
                this.width = this.barWidth * this.percent;
                var g = this.graphics;
                g.beginFill(createjs.Graphics.getHSL(this.hue, 100, 40, 1));
                g.drawRect(0, 0, this.width, this.barHeight);
            }
            else {
                this.dispose();
            }
        }
    };
    Object.defineProperty(ProgressBar.prototype, "progress", {
        set: function (n) {
            this.percent = n;
        },
        enumerable: true,
        configurable: true
    });
    ProgressBar.prototype.dispose = function () {
        var _this = this;
        //debugger;
        createjs.Ticker.off('tick', this.progressBarTicker);
        setTimeout(function () {
            _this.parent.removeChild(_this);
        }, 100);
    };
    return ProgressBar;
}(Shape));
//# sourceMappingURL=/components/progressBar.js.map
