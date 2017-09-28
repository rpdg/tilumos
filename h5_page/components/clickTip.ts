import Shape = createjs.Shape;
import Tween = createjs.Tween;
import Timeline = createjs.Timeline;

class ClickTip extends createjs.Container implements IDispose {

	c1: Circle;
	c2: Circle;
	c3: Circle;


	constructor() {
		super();

		this.c1 = new Circle(18);
		this.addChild(this.c1);

		this.c2 = new Circle(30);
		this.addChild(this.c2);

		this.c3 = new Circle(50);
		this.addChild(this.c3);


		let s = new Shape();
		let g = s.graphics;
		g.beginFill('rgba(255, 255, 255, 0.01)');
		g.drawCircle(0, 0, 60);
		g.endFill();
		//s.visible = false;
		this.addChild(s);


		this.addEventListener('click',  ()=> {
			this.dispose();
		});
	}

	pulsate() {
		Tween.get(this.c1, {loop: true}).to({
			alpha: 1,
			scaleX: 1,
			scaleY: 1,
		}, 500, createjs.Ease.sineIn).to({
			alpha: 0,
			scaleX: 1.2,
			scaleY: 1.2,
			visible: false
		}, 800, createjs.Ease.sineOut).wait(500);

		Tween.get(this.c2, {loop: true}).wait(100).to({
			alpha: 0.7,
			scaleX: 1,
			scaleY: 1,
		}, 500, createjs.Ease.sineIn).to({
			alpha: 0,
			scaleX: 1.2,
			scaleY: 1.2,
			visible: false
		}, 800, createjs.Ease.sineOut).wait(400);

		Tween.get(this.c3, {loop: true}).wait(200).to({
			alpha: 0.4,
			scaleX: 1,
			scaleY: 1,
		}, 500, createjs.Ease.sineIn).to({
			alpha: 0,
			scaleX: 1.2,
			scaleY: 1.2,
			visible: false
		}, 800, createjs.Ease.sineOut).wait(300);

		//create the Timeline
		//this.tl = new createjs.Timeline([t1, t2, t3], {}, {loop: true});
	}


	dispose() {
		/*let tws = this.tl._tweens as Array, l = tws.length;
		 console.log(tws);
		 while (l--) {
		 this.tl.removeTween(tws[l]);
		 }*/

		this.c1.dispose();
		this.c1 = null;
		this.c2.dispose();
		this.c2 = null;
		this.c3.dispose();
		this.c3 = null;


		this.removeAllEventListeners('click');
		this.parent.removeChild(this);
	}

}


class Circle extends Shape implements IDispose {
	constructor(r: number) {
		super();

		let g = this.graphics;
		g.setStrokeStyle(4).beginStroke('#fff');
		g.drawCircle(0, 0, r);
		g.endStroke();

		this.alpha = 0;
		this.scaleX = this.scaleY = 0.2;

		this.cache(-r * 1.5, -r * 1.5, r * 2 * 1.5, r * 2 * 1.5);
	}

	dispose() {
		//console.log(this);
		Tween.removeTweens(this);
		this.parent.removeChild(this);
	}
}