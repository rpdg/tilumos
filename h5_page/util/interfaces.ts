interface IDispose {
	dispose();
}

/*
abstract class DisposibleObject extends DisplayObject implements IDispose{
	dispose(){
		this.parent.removeChild(this);
	}
}*/


abstract class Scene implements IDispose {
	app: App;
	stage: Stage;
	prevScene: Scene;

	protected tickHandler : Function;

	constructor(appOrScene: App | Scene) {
		if (appOrScene instanceof App)
			this.app = appOrScene;
		else{
			let sc = <Scene> appOrScene;
			this.app = sc.app;
			this.prevScene = sc;
		}

		this.stage = this.app.stage;
		this.tickHandler = createjs.Ticker.on('tick', this.tick , this);
	}

	tick(e: createjs.TickerEvent) {
		this.stage.update();
	}

	dispose() {
		createjs.Ticker.off('tick', this.tickHandler);
	}

}