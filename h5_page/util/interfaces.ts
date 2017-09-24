interface IDispose{
	dispose();
}

/*
abstract class DisposibleObject extends DisplayObject implements IDispose{
	dispose(){
		this.parent.removeChild(this);
	}
}*/


abstract class Scence{
	 app : App;
	 stage :Stage ;

	constructor(main :App){
		this.app = main;
		this.stage = main.stage;
	}
}