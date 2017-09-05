const c = document.getElementById('c');
console.log(c);
let ctx = c.getContext('2d'), cw = c.width = window.innerWidth, ch = c.height = window.innerHeight, points = [], tick = 0, rand = function (min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}, ease = function (t, b, c, d) {
    if ((t /= d / 2) < 1)
        return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
};
let opt = {
    count: 5,
    range: {
        x: 20,
        y: 80,
    },
    duration: {
        min: 20,
        max: 40,
    },
    thickness: 10,
    strokeColor: '#444',
    level: .35,
    curved: true,
};
ctx.lineJoin = 'round';
ctx.lineWidth = opt.thickness;
ctx.strokeStyle = opt.strokeColor;
class Point {
    constructor(config) {
        this.anchorX = config.x;
        this.anchorY = config.y;
        this.x = config.x;
        this.y = config.y;
        this.setTarget();
    }
    setTarget() {
        this.initialX = this.x;
        this.initialY = this.y;
        this.targetX = this.anchorX + rand(0, opt.range.x * 2) - opt.range.x;
        this.targetY = this.anchorY + rand(0, opt.range.y * 2) - opt.range.y;
        this.tick = 0;
        this.duration = rand(opt.duration.min, opt.duration.max);
    }
    update() {
        let dx = this.targetX - this.x;
        let dy = this.targetY - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (Math.abs(dist) <= 0) {
            this.setTarget();
        }
        else {
            let t = this.tick;
            let b = this.initialY;
            let c = this.targetY - this.initialY;
            let d = this.duration;
            this.y = ease(t, b, c, d);
            b = this.initialX;
            c = this.targetX - this.initialX;
            d = this.duration;
            this.x = ease(t, b, c, d);
            this.tick++;
        }
    }
    render() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
        ctx.fillStyle = '#000';
        ctx.fill();
    }
}
function updatePoints() {
    let i = points.length;
    while (i--) {
        points[i].update();
    }
}
function renderPoints() {
    let i = points.length;
    while (i--) {
        points[i].render();
    }
}
function renderShape() {
    ctx.beginPath();
    let pointCount = points.length;
    ctx.moveTo(points[0].x, points[0].y);
    let i;
    for (i = 0; i < pointCount - 1; i++) {
        let c = (points[i].x + points[i + 1].x) / 2;
        let d = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
    }
    ctx.lineTo(-opt.range.x - opt.thickness, ch + opt.thickness);
    ctx.lineTo(cw + opt.range.x + opt.thickness, ch + opt.thickness);
    ctx.closePath();
    ctx.fillStyle = 'hsl(' + (tick / 2) + ', 80%, 60%)';
    ctx.fill();
    ctx.stroke();
}
function clear() {
    ctx.clearRect(0, 0, cw, ch);
}
let requestAnimFrame = function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (fn) {
            window.setTimeout(fn, 1E3 / 60);
        };
}();
function loop() {
    requestAnimFrame(loop);
    tick++;
    clear();
    updatePoints();
    renderShape();
    //renderPoints();
}
let i = opt.count + 2;
let spacing = (cw + (opt.range.x * 2)) / (opt.count - 1);
while (i--) {
    points.push(new Point({
        x: (spacing * (i - 1)) - opt.range.x,
        y: ch - (ch * opt.level)
    }));
}
loop();
//# sourceMappingURL=/page/wave.js.map
