define("page/clickNoteList.ts",function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t("ts/opg.ts");n.default.api({getCountList:"Bll.ClickNoteBll/GetCounts"});var a="按钮点击统计",i="clickDetail.aspx",o=n.default("#tb").table({api:n.default.api.getCountList,pagination:!0,titleBar:{title:a+"列表 </span>"},columns:[{text:"按钮名称",src:"btnName"},{text:"点击数",src:"count"},{text:"操作",src:"btnName",width:150,render:function(t){return'\n					<button class="btn-mini btn-info" data-name="'+t+'">查看详细</button>\n					'}}]});o.tbody.on("click",".btn-info",function(){{var t=$(this),e=t.data("name");n.default.popTop('<iframe src="'+i+"?btnName="+e+'" />',{title:a+": "+e,btnMax:!0,width:1e3,height:480})}})});