fis.set('project.fileType.text', 'ts');

// 启用插件
fis.hook('relative');
// 让所有文件，都使用相对路径。
fis.match('**', {
	relative: true
});

//Typescript  Compile
fis.match('**.{ts,html:ts}', {
	parser: fis.plugin('typescript', {
		sourceMap: true,
		strictNullChecks: true,
		module: 1,
		target: 2,
		//showNotices : true ,
		noImplicitAny: true
	}),
	//packTo: '/js/ts.js',
	rExt: '.js',
	isMod: false
});


//SCSS Compile
fis.match('{**/*.scss,**.html:scss}', {
	parser: fis.plugin('node-sass', {
		outputStyle: 'compact',
		sourceMap: true
	}),
	rExt: '.css'
});


fis.match('**.html', {
	parser: fis.plugin('art-template', {
		native: true, //默认为false，即简单语法模式
		define: {}
	})
});


// default media is `dev`
fis.media('dev').match('**.{html:js,js}', {
	optimizer: false
}).match('*.{html:css,css}', {
	useSprite: true,
	optimizer: false
});


// 产品发布
fis.media('prd').match('**.{html:js,js,ts}', {
	optimizer: fis.plugin('uglify-js', {
		compress: {
			drop_console: true,
			drop_debugger: true
		}
	})
}).match('**.{html:css,css}', {
	useSprite: true,
	optimizer: fis.plugin('clean-css', {
		keepBreaks: true
	})
});


//fis3.cmd release dev -d ../web_root/H5/