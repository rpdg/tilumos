/*
abstract class DisposibleObject extends DisplayObject implements IDispose{
    dispose(){
        this.parent.removeChild(this);
    }
}*/
class Scene {
    constructor(appOrScene) {
        if (appOrScene instanceof App)
            this.app = appOrScene;
        else {
            let sc = appOrScene;
            this.app = sc.app;
            this.prevScene = sc;
        }
        this.stage = this.app.stage;
        this.tickHandler = createjs.Ticker.on('tick', this.tick, this);
    }
    tick(e) {
        this.stage.update();
    }
    dispose() {
        createjs.Ticker.off('tick', this.tickHandler);
    }
}
//# sourceMappingURL=/util/interfaces.js.map
