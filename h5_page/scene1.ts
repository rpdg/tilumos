class Scene1{

	constructor(main :Main){
		Util.addImage(main.stage , <HTMLImageElement> main.preLoader.getResult('bg-1') , 0 , 0 , -50);

		let wand = Util.addImage(main.stage , <HTMLImageElement> main.preLoader.getResult('wand') , 1, 350, 80);
		Util.breath(wand  , 10);

		Util.addImage(main.stage , <HTMLImageElement> main.preLoader.getResult('box'), 1, 10, 550);

		//
		let clickTip = new ClickTip();
		clickTip.x = 460;
		clickTip.y = 810;
		main.stage.addChild(clickTip);
		clickTip.pulsate();

		clickTip.addEventListener('click', ()=> {
			Util.unBreath(wand);
			this.clickBox();
		})
	}

	clickBox(){
		this.openBox();
	}
	openBox(){

	}
}