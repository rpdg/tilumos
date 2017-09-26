class Scene2 extends Scene {
    constructor(prevScene) {
        super(prevScene);
        this.box = this.prevScene.box;
        this.openBox();
    }
    openBox() {
        console.log(this.box);
        this.light = Util.addImage(this.stage, this.app.preLoader.getResult('light'), 2, 0, -50);
        this.light.alpha = 0;
        Tween.get(this.light).to({ alpha: 1 }, 3600, createjs.Ease.sineIn).call(() => {
            this.dispose();
            new Scene3(this);
        });
    }
    dispose() {
        this.stage.removeChild(this.box);
        this.stage.removeChild(this.light);
        this.stage.removeChild(this.prevScene.bg);
    }
}
//# sourceMappingURL=/scene2.js.map
