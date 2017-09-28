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
var BitmapData = createjs.BitmapData;
var Scene2 = (function (_super) {
    __extends(Scene2, _super);
    function Scene2(prevScene) {
        var _this = _super.call(this, prevScene) || this;
        _this.distortLength = 0;
        //let ctx = (<HTMLCanvasElement> this.stage.canvas).getContext('2d');
        _this.castleContainer = new Container();
        _this.showCastleWhite();
        return _this;
    }
    Scene2.prototype.showCastleWhite = function () {
        Util.addImage(this.castleContainer, this.app.preLoader.getResult('castle-white-bg'), 0);
        var x = this.app.draftWidth / 2, y = this.app.draftHeight / 2 - 50;
        var hole = Util.addImage(this.castleContainer, this.app.preLoader.getResult('castle-white-hole'), 1, { x: x, y: y, regX: x, regY: y });
        var castle = Util.addImage(this.castleContainer, this.app.preLoader.getResult('castle-white'), 2, { x: 100, y: 200 });
        this.stage.addChild(this.castleContainer);
        Tween.get(hole, { loop: true }).to({ rotation: 360 }, 3000);
        var fromX = 0, castleFromX = 0;
        this.castleContainer.on('mousedown', function (e) {
            console.log('mousedown', e.isTouch, e.localX, e.localY);
            fromX = e.localX;
            castleFromX = castle.x;
        }, this);
        this.castleContainer.on('pressup', function (e) {
            console.log('pressup', e.isTouch, e.localX, e.localY);
        }, this);
        this.castleContainer.on('pressmove', function (e) {
            console.log(e.isTouch, e.localX, fromX);
            castle.x = castleFromX + e.localX - fromX;
        }, this);
        this.castleContainer.on('dblclick', function () {
            Tween.removeTweens(hole);
            this.distort();
        }, this, true);
    };
    Scene2.prototype.distort = function () {
        this.castleContainer.cache(0, 0, this.app.draftWidth, this.app.draftHeight);
        this.sourceBmd = createjs.BitmapData.getBitmapData(this.castleContainer);
        this.targetBmd = new createjs.BitmapData(null, this.app.draftWidth, this.app.draftHeight);
        this.stage.removeChild(this.castleContainer);
        var _bitmap02 = new createjs.Bitmap(this.targetBmd.canvas);
        this.stage.addChild(_bitmap02);
        this.distortLength = 1;
    };
    Scene2.prototype.tick = function () {
        if (this.distortLength > 0) {
            if (this.distortLength < 300) {
                for (var x = 0; x < this.app.draftWidth; x++) {
                    var y = this.distortLength * Math.sin(x / 18) + 200 - 162;
                    this.targetBmd.drawImage(this.sourceBmd, x, 0, 1, this.app.draftHeight, x, y, 1, this.app.draftHeight);
                }
                this.distortLength += 5;
            }
        }
        /**/
        this.stage.update();
    };
    return Scene2;
}(Scene));
//# sourceMappingURL=/Scene2.js.map
