/*
abstract class DisposibleObject extends DisplayObject implements IDispose{
    dispose(){
        this.parent.removeChild(this);
    }
}*/
var Scene = (function () {
    function Scene(appOrScene) {
        if (appOrScene instanceof App)
            this.app = appOrScene;
        else {
            var sc = appOrScene;
            this.app = sc.app;
            this.prevScene = sc;
        }
        this.stage = this.app.stage;
        this.tickHandler = createjs.Ticker.on('tick', this.tick, this);
    }
    Scene.prototype.tick = function (e) {
        this.stage.update();
    };
    Scene.prototype.dispose = function () {
        createjs.Ticker.off('tick', this.tickHandler);
    };
    return Scene;
}());
//# sourceMappingURL=/components/interfaces.js.map
