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
var Scene1 = (function (_super) {
    __extends(Scene1, _super);
    function Scene1(app) {
        var _this = _super.call(this, app) || this;
        _this.particleYOffset = 150;
        _this.bg = Util.addImage(_this.stage, app.preLoader.getResult('bg-1'), 0, { y: -50 });
        _this.box = Util.addImage(_this.stage, app.preLoader.getResult('box'), 1, { x: 10, y: 550 });
        _this.wand = Util.addImage(_this.stage, app.preLoader.getResult('wand'), 2, { x: 350, y: 80 });
        Util.breath(_this.wand, 10);
        //
        var clickTip = new ClickTip();
        clickTip.x = 460;
        clickTip.y = 810;
        _this.stage.addChild(clickTip);
        clickTip.pulsate();
        clickTip.on('click', function () {
            Util.unBreath(this.wand);
            this.clickBox();
            this.particleSystem.emitFrequency = 100;
            this.particleYOffset = -100;
        }, _this, true);
        _this.particleSystem = new particlejs.ParticleSystem();
        _this.stage.addChild(_this.particleSystem.container);
        _this.particleSystem.importFromJson({
            'bgColor': '#00000',
            'width': 679,
            'height': 343,
            'emitFrequency': 30,
            'startX': 340,
            'startXVariance': 169,
            'startY': 147,
            'startYVariance': 179,
            'initialDirection': 348,
            'initialDirectionVariance': 180,
            'initialSpeed': 1.2,
            'initialSpeedVariance': 2.2,
            'friction': '0',
            'accelerationSpeed': '0',
            'accelerationDirection': '0',
            'startScale': 0.06,
            'startScaleVariance': 0.33,
            'finishScale': 0.04,
            'finishScaleVariance': '0.23',
            'lifeSpan': 80,
            'lifeSpanVariance': 100,
            'startAlpha': 1,
            'startAlphaVariance': '0',
            'finishAlpha': 0,
            'finishAlphaVariance': 0.26,
            'shapeIdList': [
                'kirakira',
                'star',
            ],
            'startColor': {
                'hue': 198,
                'hueVariance': 0,
                'saturation': 100,
                'saturationVariance': 89,
                'luminance': 93,
                'luminanceVariance': 68,
            },
            'blendMode': false,
            'alphaCurveType': '0',
            'VERSION': '0.1.3',
        });
        return _this;
    }
    Scene1.prototype.clickBox = function () {
        var _this = this;
        this.particleSystem.startYVariance = 0;
        this.particleYOffset = -50;
        Tween.get(this.wand).to({ rotation: -78, y: 900, x: 260 }, 1000, createjs.Ease.sineIn).to({
            rotation: -75,
            y: 880,
            x: 250,
        }, 300).call(function () {
            Tween.removeTweens(_this.wand);
            createjs.Sound.play('sound_sparkle');
            _this.particleSystem.initialDirection = 0;
            _this.particleSystem.initialDirectionVariance = 360;
            _this.particleSystem.initialSpeed = 10;
            _this.particleSystem.initialSpeedVariance = 0;
            _this.particleSystem.lifeSpan = 40;
            _this.particleSystem.emitFrequency = 5000;
            _this.particleYOffset = -150;
            setTimeout(function () {
                _this.particleSystem.emitFrequency = 0;
                setTimeout(function () {
                    _this.particleSystem.dispose();
                    _this.stage.removeChild(_this.wand);
                    createjs.Ticker.off('tick', _this.tickHandler);
                    _this.openBox();
                }, 1200);
            }, 100);
        });
    };
    Scene1.prototype.openBox = function () {
        var _this = this;
        this.light = Util.addImage(this.stage, this.app.preLoader.getResult('light'), 2, { y: -50 });
        this.light.alpha = 0;
        Tween.get(this.light).to({ alpha: 1 }, 3600, createjs.Ease.sineIn).call(function () {
            _this.dispose();
            new Scene2(_this);
        });
    };
    Scene1.prototype.tick = function (e) {
        //console.log('emit');
        this.particleSystem.startX = this.wand.x + 160;
        this.particleSystem.startY = this.wand.y + this.particleYOffset;
        this.particleSystem.update();
    };
    Scene1.prototype.dispose = function () {
        this.stage.removeChild(this.box);
        this.stage.removeChild(this.light);
        this.stage.removeChild(this.bg);
    };
    return Scene1;
}(Scene));
//# sourceMappingURL=/Scene1.js.map
