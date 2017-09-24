class Scene1{

	private app : App;
	private stage :Stage ;

	private wand: Bitmap;
	private box: Bitmap;

	constructor(main :App){
		this.app = main;
		this.stage = main.stage;


		Util.addImage(main.stage , <HTMLImageElement> main.preLoader.getResult('bg-1') , 0 , 0 , -50);

		this.wand = Util.addImage(main.stage , <HTMLImageElement> main.preLoader.getResult('wand') , 1, 350, 80);
		Util.breath(this.wand  , 10);

		this.box = Util.addImage(main.stage , <HTMLImageElement> main.preLoader.getResult('box'), 1, 10, 550);


		//
		let clickTip = new ClickTip();
		clickTip.x = 460;
		clickTip.y = 810;
		main.stage.addChild(clickTip);
		clickTip.pulsate();

		clickTip.addEventListener('click', ()=> {
			Util.unBreath(this.wand);
			this.clickBox();
		});




	}

	clickBox(){
		Tween.get(this.wand).to({rotation: -68 , y : 800 , x : 180 } , 1500, createjs.Ease.sineIn).wait(300).call(()=>{

			Tween.removeTweens(this.wand);
			this.stage.removeChild(this.wand);

			createjs.Sound.play('sound_sparkle');


			setTimeout(()=>{
				this.openBox();
			} , 200) ;

		});

	}

	openBox(){
		let light = Util.addImage(this.stage , <HTMLImageElement> this.app.preLoader.getResult('light'), 2 , 0 , -50);
		light.alpha = 0;
		Tween.get(light).to({alpha: 1} , 1500, createjs.Ease.sineIn);
	}
}