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
    }
    dispose() {
    }
}
//# sourceMappingURL=/util/interfaces.js.map
