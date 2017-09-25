class Scene2 extends Scene {
    constructor(prevScene) {
        super(prevScene);
        this.box = this.prevScene.box;
        this.openBox();
    }
    openBox() {
        console.log(this.box);
        let light = Util.addImage(this.stage, this.app.preLoader.getResult('light'), 2, 0, -50);
        light.alpha = 0;
        Tween.get(light).to({ alpha: 1 }, 3600, createjs.Ease.sineIn);
    }
}
//# sourceMappingURL=/scene2.js.map
