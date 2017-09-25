/*
abstract class DisposibleObject extends DisplayObject implements IDispose{
    dispose(){
        this.parent.removeChild(this);
    }
}*/
class Scene {
    constructor(main) {
        this.app = main;
        this.stage = main.stage;
    }
    dispose() {
    }
}
//# sourceMappingURL=/util/interfaces.js.map
