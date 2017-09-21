class Preloader {

	preLoader: createjs.LoadQueue;
	loader: createjs.LoadQueue;
	sprites: Array<createjs.Bitmap> = [];
	static instance;
	sprite: createjs.DisplayObject;
	barRect: createjs.Rectangle;

	constructor(stage:createjs.Stage) {
		Preloader.instance = this;
		let s: createjs.Container = new createjs.Container();
		stage.addChild(s);
		this.sprite = s;

		let manifest: Object[] = [
			{ src: "assets/preloader/preloader back.jpg", id: "preloader back" },
			{ src: "assets/preloader/preloader candy top.png", id: "preloader candy top" },
			{ src: "assets/preloader/preloader candy.png", id: "preloader candy" },
			{ src: "assets/preloader/preloader progress back.png", id: "preloader progress back" },
			{ src: "assets/preloader/preloader progress top.png", id: "preloader progress top" },
		];

		this.preLoader = new createjs.LoadQueue(true);
		this.preLoader.addEventListener("complete", () => this.onPreLoadComplete());
		this.preLoader.loadManifest(manifest);
	}

	onPreLoadComplete():void {
		let s: createjs.Container = <createjs.Container> this.sprite;

		let b: createjs.Bitmap = new createjs.Bitmap(<HTMLImageElement> this.preLoader.getResult("preloader back"));
		s.addChild(b);
		this.sprites.push(b);

		b = new createjs.Bitmap(<HTMLImageElement> this.preLoader.getResult("preloader progress back"));
		s.addChild(b);
		b.regX = b.getBounds().width / 2;
		b.regY = b.getBounds().height / 2;
		this.sprites.push(b);

		b = new createjs.Bitmap(<HTMLImageElement> this.preLoader.getResult("preloader progress top"));
		s.addChild(b);
		b.regX = b.getBounds().width / 2;
		b.regY = b.getBounds().height / 2;
		this.barRect = b.getBounds().clone();
		this.sprites.push(b);

		b = new createjs.Bitmap(<HTMLImageElement> this.preLoader.getResult("preloader candy"));
		s.addChild(b);
		b.regX = b.getBounds().width / 2;
		b.regY = b.getBounds().height / 2;
		this.sprites.push(b);

		b = new createjs.Bitmap(<HTMLImageElement> this.preLoader.getResult("preloader candy top"));
		s.addChild(b);
		b.regX = b.getBounds().width / 2;
		b.regY = b.getBounds().height / 2 + 7;
		this.sprites.push(b);

		this.onResize();

		createjs.Sound.initializeDefaultPlugins();
		createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]);
		createjs.Sound.alternateExtensions = ["mp3"];

		let manifest: Object[] = [
			{ src: "assets/map1.jpg", id: "map1" },
			{ src: "assets/map2.jpg", id: "map2" },
			{ src: "assets/map3.jpg", id: "map3" },
			{ src: "assets/bar.png", id: "bar" },
			{ src: "assets/art.png", id: "art.png" },
			//{ src: "assets/art.jpg", id: "art.jpg" },
			//{ src: "assets/art_alpha.png", id: "art_alpha.png" },
			{ src: "assets/art.txt", id: "artJson", type: createjs.LoadQueue.JSON },
			{ src: "assets/font2.png", id: "font2.png" },
			{ src: "assets/font2.txt", id: "font2Json", type: createjs.LoadQueue.JSON },
			{ src: "assets/back1.jpg", id: "back1" },
			{ src: "assets/main menu.jpg", id: "main menu" },
			{ src: "assets/menu back.jpg", id: "menu back" },
			{ src: "assets/logo top.jpg", id: "logo top" },
			{ src: "assets/logo.txt", id: "logo text", type: createjs.LoadQueue.JSON },
			{ src: "assets/button.txt", id: "button text", type: createjs.LoadQueue.JSON },
			{ src: "assets/Char win.txt", id: "Char win", type: createjs.LoadQueue.JSON },
			{ src: "assets/Char lose.txt", id: "Char lose", type: createjs.LoadQueue.JSON },
			{ src: "assets/gloss anim.txt", id: "gloss anim", type: createjs.LoadQueue.JSON },
			{ src: "assets/buttons pause anim.txt", id: "buttons pause anim", type: createjs.LoadQueue.JSON },
			{ src: "assets/pointer.txt", id: "pointer", type: createjs.LoadQueue.JSON },

			{ src: "assets/tutorial/t1.png", id: "tutorial1" },
			{ src: "assets/tutorial/t2.png", id: "tutorial2" },
			{ src: "assets/tutorial/t3.png", id: "tutorial3" },
			{ src: "assets/tutorial/t4.png", id: "tutorial4" },
			{ src: "assets/tutorial/t5.png", id: "tutorial5" },
			{ src: "assets/tutorial/t6.png", id: "tutorial6" },
			{ src: "assets/tutorial/t7.png", id: "tutorial7" },

			{ src: "assets/sound/music/btcl_main_music.ogg", id: "main_music", type: createjs.LoadQueue.SOUND },

			{ src: "assets/sound/hero_show.ogg", id: "hero_show", type:createjs.LoadQueue.SOUND },
			{ src: "assets/sound/hero_hide.ogg", id: "hero_hide", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/win.ogg", id: "win", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/fail.ogg", id: "fail", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/play_button.ogg", id: "play_button", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/button.ogg", id: "button", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/pause.ogg", id: "pause", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/transition.ogg", id: "transition", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/remove1.ogg", id: "remove1", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/remove2.ogg", id: "remove2", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/remove3.ogg", id: "remove3", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/remove4.ogg", id: "remove4", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/bonus_show.ogg", id: "bonus_show", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/bonus_set.ogg", id: "bonus_set", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/bonus_bomb.ogg", id: "bonus_bomb", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/bonus_line.ogg", id: "bonus_line", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/bonus_color.ogg", id: "bonus_color", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/star1.ogg", id: "star1", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/pointer.ogg", id: "pointer_sound", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/star2.ogg", id: "star2", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/star3.ogg", id: "star3", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/cookie_crash.ogg", id: "cookie_crash", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/choco_crash.ogg", id: "choco_crash", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/color_crash.ogg", id: "color_crash", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/cake_down.ogg", id: "cake_down", type: createjs.LoadQueue.SOUND },
			{ src: "assets/sound/stop_move.ogg", id: "stop_move", type: createjs.LoadQueue.SOUND },
		];

		this.loader = new createjs.LoadQueue(true);
		this.loader.installPlugin(createjs.Sound);

		createjs.Sound.initializeDefaultPlugins();
		createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]);
		createjs.Sound.alternateExtensions = ["mp3"];

		this.loader.addEventListener("complete", () => this.onLoadComplete());
		this.loader.addEventListener("progress", () => this.onProgress());
		this.loader.addEventListener("fileprogress", () => this.onProgress());
		this.loader.loadManifest(manifest);
	}

	onLoadComplete(): void {
		this.onResize();
		this.onProgress();
		//return;

		//App.game.stage.removeChild(this.sprite);
		//App.game.stage.removeAllChildren();
		App.game.onLoadComplete();
	}

	isActive(): boolean {
		return this.sprite.parent != null;
	}

	disable(): void {
		removeClip(this.sprite);
		for (var i: number = 0; i < this.sprites.length; ++i)
			removeClip(this.sprites[i]);
	}

	onProgress(): void {
		if (this.sprites.length <= 0 || !this.barRect)
			return;

		var p: number = this.loader.progress;
		var r: createjs.Rectangle = new createjs.Rectangle(this.barRect.x, this.barRect.y, limit(this.barRect.width * p, 1, this.barRect.width), this.barRect.height);
		this.sprites[2].sourceRect = r;
	}

	update(dt: number): void {
		if (this.sprite.parent && this.sprites.length > 0) {
			this.sprites[4].rotation -= 400 * dt;
		}
	}

	onResize(): void {
		if (!this.sprite.parent || this.sprites.length <= 0)
			return;

		var bottom: number = App.ACTUAL_H - Math.min(App.CURRENT_SHIFT, 0);
		this.sprites[1].x = this.sprites[2].x = this.sprites[3].x = this.sprites[4].x = App.SCREEN_W / 2;
		this.sprites[1].y = bottom - 80;
		this.sprites[2].y = bottom - 80;
		this.sprites[3].y = bottom - 180;
		this.sprites[4].y = bottom - 180 - 15 + 4;
	}
}