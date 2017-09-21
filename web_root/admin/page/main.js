define("page/main.ts",function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("ts/opg.ts"),l=e("ts/util/store.ts"),i=e("ts/app.cfg.ts"),s=e("ts/ui/Popup.ts");n.default.api({backendVersion:"base/version"});for(var a,c=[{id:2,parentId:1,name:"内容生产",children:[{id:200,parentId:2,name:"发起生产",code:"200",url:"clickNoteList.aspx"},{id:201,parentId:2,name:"内容采集",code:"201",url:"/page/collection/acquisition/index.html"}],code:"2"}],o={},d=0,r=c.length;r>d;d++){var u=c[d];o["#"+u.id]=u}var m=$("#mainMenu"),h=$("#subMenu"),p=$("#td"),f=$("#mainFrame"),v=f[0].contentWindow;$("#divPn1").click(function(){var e=$(this);e.hasClass("ellipse")?(e.removeClass("ellipse"),h.css("width",180),p.css("left",180)):(e.addClass("ellipse"),h.css("width",0),p.css("left",0))});var g="a:eq(0)",F="a:eq(0)";if(location.hash.length>1){var b=location.hash.split("/");g="#\\"+b[0],b[1]&&(F="#\\/"+b[1])}h.on("click","a",function(){var e=$(this);return e.addClass("cur").siblings(".cur").removeClass("cur"),l.Cache.empty(),v.location.replace(e.attr("href")),location.hash=a+e[0].id,e.hasClass("hasChildren"),!1}),m.on("click","a",function(){var e=$(this),t=e.attr("href");a=t,e.addClass("cur").siblings(".cur").removeClass("cur"),h.bindList({template:'<a id="/${id}" href="${url}" target="mainFrame" class="${id:=g}">${name}</a>',list:o[t].children,itemRender:{g:function(e,t,n){return n.children&&n.children.length?"hasChildren":void 0}}}).find(F).click(),"a:eq(0)"!=F&&(F="a:eq(0)")}),m.bindList({template:'<a id="#${id}" href="#${id}">${name}</a>',list:c}).find(g).click();var C=window.document.documentElement.clientWidth,k=m.outerWidth();0>C-k&&m.addClass("nano-menu"),150>C-k?m.addClass("mini-menu"):300>C-k&&m.addClass("small-menu"),$("#liAbout").click(function(){var e='<div style="height: 80px; font-size: 12px; color: #555; padding-top: 12px; text-align: center;">\n					<h2 style="font-size: 32px; margin-bottom: 3px;">CMS v6</h2>\n					<span style="font-size: 12px;"><span style="display: inline-block;width: 80px;font-size: 12px;">front-end：</span>'+i.default.version+"</span><br>\n				</div>";n.default.alert(e,$.noop,{title:"关于 IMSP",width:500})}),$("#liLogOff").click(function(){l.store.clear(),window.location.href=i.default.loginPage}),history.pushState(null,null,document.URL),window.addEventListener("popstate",function(){history.pushState(null,null,document.URL),s.default.closeLast()}),$("#liFullScreen").click(function(e){var t=e.target;t.requestFullscreen?document.fullScreenElement?document.cancelFullScreen():document.documentElement.requestFullscreen():t.webkitRequestFullscreen?document.webkitFullscreenElement?document.webkitCancelFullScreen():document.documentElement.webkitRequestFullscreen():t.msRequestFullscreen?document.msFullscreenElement?document.msExitFullscreen():document.body.msRequestFullscreen():t.mozRequestFullScreen&&(document.mozFullScreenElement?document.mozCancelFullScreen():document.documentElement.mozRequestFullScreen()),e.stopPropagation()})});