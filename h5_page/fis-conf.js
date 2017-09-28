fis.set('project.fileType.text', 'ts');

// 启用插件
fis.hook('relative');
// 让所有文件，都使用相对路径。
fis.match('**', {
	relative: true
});

fis.match('**/*.{html:ts,ts}', {
	parser: fis.plugin('typescript', {
		sourceMap: true,
		strictNullChecks: true,
		module: 1,
		target: 1,
		showNotices: false,
		noImplicitAny: true
	}),
	isMod: false,
	rExt: '.js'
});

/*

// 开启模块化
fis.hook('commonjs', {
	/!*packages: [
		{
			name: 'opm',
			location: './ts/opm',
			main: 'Auto.ts'
		}
	] ,*!/
	baseUrl: '.',
	extList: ['.ts']
});
*/


//SCSS Compile
fis.match('*.scss', {
	parser: fis.plugin('node-sass', {
		outputStyle: 'compact',
		sourceMap: true
	}),
	rExt: '.css'
});


fis.match('::package', {
	postpackager: fis.plugin('loader'),
	useSourceMap: true // 合并后开启 SourceMap 功能。
});




var scripts ;
var currentMedia = fis.project.currentMedia();
if (currentMedia === 'prd') {
	scripts = ['app.js'];
}
else{
	scripts = [
		'/lib/stats.min.js' ,
		'/lib/shake.js',
		'/lib/createjs.min.js',
		'/lib/bitmapdata-1.1.1.min.js',
		'/lib/particlejs.min.js',
		'/components/utils.ts',
		'/components/interfaces.ts',
		'/components/progressBar.ts',
		'/components/clickTip.ts',
		'/components/wand.ts',
		'Scene1.ts',
		'Scene2.ts',
		'Scene3.ts',
		'index.ts'
	];

}

fis.match('**.html', {
	parser: fis.plugin('art-template', {
		define: {
			scripts : scripts
		}
	})
});


// 产品发布，进行合并
fis.media('prd')
	.match('**/**.{js,ts}', {
		packTo: 'app.js'
	})
	.match('/lib/stats.min.js', {
		packOrder: -200
	})
	.match('/lib/shake.js', {
		packOrder: -190
	})
	.match('/lib/createjs.min.js', {
		packOrder: -180
	})
	.match('/lib/bitmapdata-1.1.1.min.js', {
		packOrder: -170
	})
	.match('/lib/particlejs.min.js', {
		packOrder: -160
	})
	.match('components/utils.ts', {
		packOrder: -100
	})
	.match('components/interfaces.ts', {
		packOrder: -95
	})
	.match('components/progressBar.ts', {
		packOrder: -80
	})
	.match('components/clickTip.ts', {
		packOrder: -80
	})
	.match('components/wand.ts', {
		packOrder: -80
	})
	.match('Scene1.ts', {
		packOrder: -50
	})
	.match('Scene2.ts', {
		packOrder: -50
	})
	.match('Scene3.ts', {
		packOrder: -50
	})
	.match('index.ts', {
		packOrder: -10
	})
	.match('**.{html:js,js,ts}', {
		optimizer: fis.plugin('uglify-js', {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		})
	})
	.match('*.{html:css,css,scss}', {
		useSprite: true,
		optimizer: fis.plugin('clean-css', {
			keepBreaks: true
		})
	});


// fis3 server start --root ../dist --port 7788

// fis3.cmd release dev -d ../web_root/H5/

// fis3.cmd release prd -d ../web_root/H5/
