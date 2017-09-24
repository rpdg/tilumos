"use strict";
class Scene1 extends Scence {
    constructor(app) {
        super(app);
        Util.addImage(app.stage, app.preLoader.getResult('bg-1'), 0, 0, -50);
        this.wand = Util.addImage(app.stage, app.preLoader.getResult('wand'), 1, 350, 80);
        Util.breath(this.wand, 10);
        this.box = Util.addImage(app.stage, app.preLoader.getResult('box'), 1, 10, 550);
        //
        let clickTip = new ClickTip();
        clickTip.x = 460;
        clickTip.y = 810;
        app.stage.addChild(clickTip);
        clickTip.pulsate();
        clickTip.addEventListener('click', () => {
            Util.unBreath(this.wand);
            this.clickBox();
        });
    }
    clickBox() {
        Tween.get(this.wand).to({ rotation: -68, y: 800, x: 180 }, 1500, createjs.Ease.sineIn).wait(300).call(() => {
            Tween.removeTweens(this.wand);
            this.stage.removeChild(this.wand);
            createjs.Sound.play('sound_sparkle');
            setTimeout(() => {
                this.openBox();
            }, 200);
        });
    }
    openBox() {
        let light = Util.addImage(this.stage, this.app.preLoader.getResult('light'), 2, 0, -50);
        light.alpha = 0;
        Tween.get(light).to({ alpha: 1 }, 3300, createjs.Ease.sineIn);
        new Scene2(this.app);
    }
}
//# sourceMappingURL=/scene1.js.map
