fis.set('project.fileType.text', 'ts');

// 启用插件
fis.hook('relative');

// 让所有文件，都使用相对路径。
fis.match('**', {
	relative: true
});


//var currentMedia = fis.project.currentMedia();



fis.match('**/*.html', {
	parser: fis.plugin('art-template', {
		define: {
			__layout: '/comm/layout.html',
			bodyType: '',
			// 需要：完整协议+ url +‘/’ 结尾
			// 如： http://54.223.126.249:8080/api/
			apiServer: '/api/admin/',
			'page/': {
				'clickDetail.html': {
					bodyType: 'pop'
				}
			}
		}
	}),
	rExt: '.aspx'
});



fis.match('**/*.ts', {
	parser: fis.plugin('typescript', {
		sourceMap: true,
		strictNullChecks: true,
		module: 1,
		target: 1,
		//showNotices : true ,
		noImplicitAny: true
	}),
	//packTo: '/js/ts.js',
	rExt: '.js'
});


fis.match('{/@types/**.*,/comm/**.*}', {
	release: false
});



// 开启模块化
fis.hook('commonjs', {
	/*packages: [
		{
			name: 'opm',
			location: './ts/opm',
			main: 'Auto.ts'
		}
	] ,*/
	baseUrl: '.',
	extList: ['.ts']
});


// 设置成是模块化 js, 编译后会被 define 包裹。
fis.match('**/*.ts', {
	//wrap : false,
	//useSameNameRequire: true,// 开启同名依赖
	isMod: true
});


fis.match('::package', {
	postpackager: fis.plugin('loader'),
	useSourceMap: true // 合并后开启 SourceMap 功能。
});


//SCSS Compile
fis.match('*.scss', {
	parser: fis.plugin('node-sass', {
		outputStyle: 'compact',
		sourceMap: true
	}),
	rExt: '.css'
});


// 产品发布，进行合并
fis.media('prd')
	.match('/ts/**.ts', {
		packTo: '/js/opg.js'
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


// fis3 server start --root ../dist
// fis3 release prd -d ../web_root/admin
