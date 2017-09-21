import opg from 'ts/opg.ts';

opg.api({
	getCountList : 'Bll.ClickNoteBll/GetCounts'
});


const moduleName = '按钮点击统计';
const detailPage = __uri('clickDetail.aspx');

let tb = opg('#tb').table({
	api: opg.api.getCountList,
	pagination: true,
	titleBar: {
		title: `${moduleName}列表 </span>`,
	},
	columns: [
		{
			text: '按钮名称',
			src: 'btnName',
		},
		{
			text: '点击数',
			src: 'count',
		},
		{
			text: '操作',
			src: 'btnName',
			width: 150,
			render: function (val) {
				return `
					<button class="btn-mini btn-info" data-name="${val}">查看详细</button>
					`;
			}
		},
	],
});



//edit
tb.tbody.on('click', '.btn-info', function () {
	let btn = $(this), name = btn.data('name') ;

	let win = opg.popTop(`<iframe src="${detailPage}?btnName=${name}" />`, {
		title: `${moduleName}: ${name}`,
		btnMax: true,
		width: 1000,
		height: 480,
	});
	//win.max();
});

