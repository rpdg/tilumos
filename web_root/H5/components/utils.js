var Stage = createjs.Stage;
var Bitmap = createjs.Bitmap;
var DisplayObject = createjs.DisplayObject;
var Container = createjs.Container;
var Util = (function () {
    function Util() {
    }
    Util.drawGrid = function (stage, gap, color) {
        if (gap === void 0) { gap = 50; }
        if (color === void 0) { color = '#fff'; }
        var rect = stage.getBounds();
        var to = {
            x: rect.width,
            y: rect.height,
        };
        var cur, i, freq;
        var s = new Shape();
        var g = s.graphics;
        g.clear();
        g.setStrokeStyle(1);
        g.beginStroke(color);
        for (freq = to.x / gap - 1, i = 0; i < freq; i++) {
            cur = ~~((i + 1) * gap);
            g.moveTo(cur, 0).lineTo(cur, to.y);
        }
        for (freq = to.y / gap - 1, i = 0; i < freq; i++) {
            cur = ~~((i + 1) * gap);
            g.moveTo(0, cur).lineTo(to.x, cur);
        }
        g.endStroke();
        stage.addChild(s);
    };
    Util.breath = function (obj, offset, revertY) {
        if (offset === void 0) { offset = 10; }
        if (revertY === void 0) { revertY = false; }
        if (Util.breathObjs.length === 0) {
            Util.breathing = true;
            createjs.Ticker.addEventListener('tick', Util.tickBreath);
        }
        //
        obj.breath = {
            forward: true,
            y: obj.y,
            min: obj.y - offset,
            max: obj.y + offset,
            remove: -1,
            revertY: revertY
        };
        Util.breathObjs.push(obj);
    };
    Util.unBreath = function (obj, revertY) {
        if (revertY === void 0) { revertY = false; }
        var index = Util.breathObjs.indexOf(obj);
        if (index > -1) {
            obj.breath.remove = index;
            obj.breath.revertY = revertY;
        }
        return index;
    };
    Util.tickBreath = function (e) {
        if (Util.breathing) {
            if (Util.breathObjs.length === 0) {
                Util.breathing = false;
                createjs.Ticker.removeEventListener('tick', Util.tickBreath);
            }
            //Util.breathCount++;
            //let step = Math.sin(Util.breathCount * 0.017 * (2 * Math.PI / 360)) * 3;
            var step = 0.5;
            //console.log(step);
            for (var i = 0, l = Util.breathObjs.length; i < l; i++) {
                var obj = Util.breathObjs[i];
                if (obj.breath.remove === -1) {
                    if (obj.breath.forward) {
                        obj.y += step;
                    }
                    else {
                        obj.y -= step;
                    }
                    if (obj.y < obj.breath.min || obj.y > obj.breath.max) {
                        obj.breath.forward = !obj.breath.forward;
                    }
                }
                else {
                    Util.breathObjs.splice(obj.breath.remove, 1);
                    if (obj.breath.revertY)
                        obj.y = obj.breath.y;
                }
                //console.log(obj.y, step);
            }
        }
    };
    Util.FPS = function () {
        console.log(Util.fps);
    };
    Util.addImage = function (conatainer, imgElem, index, props) {
        if (index === void 0) { index = 0; }
        var bmp = new createjs.Bitmap(imgElem);
        if (props) {
            for (var prop in props) {
                bmp[prop] = props[prop];
            }
        }
        conatainer.addChildAt(bmp, index);
        return bmp;
    };
    Util.breathObjs = [];
    Util.breathing = false;
    Util.breathCount = 0;
    /////
    Util.time = 0;
    Util.fps = 0;
    return Util;
}());
//# sourceMappingURL=/components/utils.js.map
