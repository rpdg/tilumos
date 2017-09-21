import opg from 'ts/opg.ts';

const btnName = opg.request['btnName'];

opg.api({
	getCountList : `Bll.ClickNoteBll/GetClicksByButtonName?btnName=${btnName}`
});


let tb = opg('#tb').table({
	api: opg.api.getCountList,
	pagination: true,
	columns: [
		{
			text: '按钮名称',
			src: 'btnName',
		},
		{
			text: '点击时间',
			src: 'time',
			width: 200,
		},
		{
			text: '用户IP',
			src: 'ip',
		},
		{
			text: '用户浏览器',
			src: 'browser',
			width: 420,
		},
	],
});


