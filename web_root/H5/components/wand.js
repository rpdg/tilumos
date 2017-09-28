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
var Bitmap = createjs.Bitmap;
var wand = (function (_super) {
    __extends(wand, _super);
    function wand(imageOrUrl) {
        return _super.call(this, imageOrUrl) || this;
    }
    wand.prototype.breath = function () {
    };
    wand.prototype.unBreath = function () {
    };
    wand.prototype.dispose = function () {
    };
    return wand;
}(Bitmap));
//# sourceMappingURL=/components/wand.js.map
