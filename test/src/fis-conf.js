fis.set('project.fileType.text', 'ts');

//Ts
fis.match('{**/*.ts,**.html:ts}', {
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
	isMod : false
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
		define: {
		}
	})
});