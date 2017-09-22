var Stage = createjs.Stage;
var DisplayObject = createjs.DisplayObject;
class Util {
    static drawGrid(stage, gap = 50, color = '#fff') {
        let rect = stage.getBounds();
        let to = {
            x: rect.width,
            y: rect.height,
        };
        let cur, i, freq;
        let s = new Shape();
        let g = s.graphics;
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
    }
    static breath(obj, offset = 5) {
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
        };
        Util.breathObjs.push(obj);
    }
    static unBreath(obj) {
        let index = Util.breathObjs.indexOf(obj);
        if (index > -1) {
            obj.breath.remove = index;
        }
        return index;
    }
    static tickBreath(e) {
        if (Util.breathing) {
            if (Util.breathObjs.length === 0) {
                Util.breathing = false;
                createjs.Ticker.removeEventListener('tick', Util.tickBreath);
            }
            let step = Math.random();
            for (let i = 0, l = Util.breathObjs.length; i < l; i++) {
                let obj = Util.breathObjs[i];
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
                    obj.y = obj.breath.y;
                }
            }
        }
    }
    static FPS() {
        console.log(Util.fps);
    }
}
Util.breathObjs = [];
Util.breathing = false;
/////
Util.time = 0;
Util.fps = 0;
//# sourceMappingURL=/page/star/util/util.js.map
