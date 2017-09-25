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

	constructor(appOrScene: App | Scene) {
		if (appOrScene instanceof App)
			this.app = appOrScene;
		else{
			let sc = <Scene> appOrScene;
			this.app = sc.app;
			this.prevScene = sc;
		}

		this.stage = this.app.stage;

	}

	dispose() {

	}
}