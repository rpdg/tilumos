<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<!--<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">-->
	<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
	<meta name="renderer" content="webkit">
	<title>CMS</title>
	    <link rel="stylesheet" href="../css/ams.css" />
    <style>body { padding: 0; overflow: hidden; }

#header { height: 55px; background-color: #00acc1; }

#header #logo { display: inline-block; width: 180px; height: 55px; background-color: #00a3b7; text-align: center; color: #fff; font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 36px; float: left; }

#header #logo img { height: 28px; width: 28px; margin-top: -4px; vertical-align: middle; }

#header .ico-more-vert { z-index: 5; right: 0; display: inline-block; width: 36px; height: 36px; float: right; margin-top: 10px; margin-right: 16px; border-radius: 50px; background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAUBAMAAAC3y+roAAAAKlBMVEUAAAD///////////////////////////////////////////////////+Gu8ovAAAADXRSTlMAwvrFdEIiH+zu63p5SkJwCAAAADtJREFUCNdjSFQsYJC9K8Cge1cBTBcC+TDAepSBwfeuA0Pv3QUMc+82gNmsWxngIFk5gcEWohdEg8wCAPBYEuWz1hdTAAAAAElFTkSuQmCC"); background-repeat: no-repeat; background-position: center center; }

#header .ico-more-vert:hover { background-color: #009eb2; }

#header .ico-more-vert:hover #moreMenu { display: block; right: 0; }

#header .ico-more-vert #moreMenu { display: none; position: absolute; z-index: 50; padding: 55px 0 1em 1em; top: 0; right: 0; width: 150px; transition-duration: 0.3s; }

#header .ico-more-vert ul { box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4); }

#header .ico-more-vert ul li { background-color: #fff; padding: 1em 1.2em; cursor: pointer; }

#header .ico-more-vert ul li:hover { background-color: #e9e9e9; }

#header .ico-more-vert ul #liLogOff { border-top: 1px solid #eee; }

#header menu { position: absolute; display: inline-block; height: 55px; white-space: nowrap; }

#header menu > a { display: inline-block; font-size: 18px; color: #fff; text-align: center; text-decoration: none; line-height: 55px; padding: 0 1.5em; height: 55px; }

#header menu > a:hover { background-color: #009eb2; }

#header menu > a.cur { border-width: 0 1px; border-style: solid; border-color: #008898; background-color: #0095a8; box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2); }

#header menu.small-menu > a { font-size: 16px; }

#header menu.mini-menu > a { font-size: 14px; }

#header menu.nano-menu > a { font-size: 12px; }

#sideBar { position: absolute; top: 55px; bottom: 0; left: 0; width: 180px; background-color: #e4eeed; box-shadow: inset -1px 1px 2px 0 rgba(0, 0, 0, 0.1); padding-top: 1em; /*.ico-tg{ cursor: pointer; }*/ }

#subMenu { position: absolute; top: 10px; left: 0; bottom: 10px; right: 0; overflow: auto; }

#subMenu a { display: block; border: solid transparent; border-width: 1px 0 1px 0; height: 2.6em; line-height: 2.6em; padding-left: 3em; font-size: 14px; text-decoration: none; color: #333; transition: text-indent 200ms ease; }

#subMenu a:hover { color: #4b6887; background-color: #c7e4f1; text-indent: 5px; }

#subMenu a.cur { color: #48726e; background-color: #c5dad8; background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAOCAMAAADUg/YpAAAAM1BMVEUAAAD29vb29vb29vb29vb29vb29vb29vb29vb29vb29vb29vb29vb29vb29vb29vb29vbudHGKAAAAEHRSTlMA8+jMWjMjFwzy3NtzckZFRtdGZwAAADhJREFUCNc9zEcKADAMA8H0XvT/1wZF4L2MMdhONVHjp0yQHEBvB00edAPfJbmX7nCwO1YG7K9qD5CmAp5f4tORAAAAAElFTkSuQmCC"); background-position: right center; background-repeat: no-repeat; }

#td { position: absolute; top: 55px; bottom: 0; left: 180px; right: 0; }

#divPn1 { opacity: 0.6; width: 14px; height: 14px; text-align: center; cursor: pointer; position: absolute; top: 41px; left: 166px; background: url("data:image/gif;base64,R0lGODlhCgAJAJECAAAAAP///wAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjlmZDlhNzYxLTFhMjItM2E0YS1iNWY1LWZmMDQ3NzkxMjYzYiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozN0FERDA4QjFGNTAxMUU3QjFCQUExOEVBRjY0MDMyOCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozN0FERDA4QTFGNTAxMUU3QjFCQUExOEVBRjY0MDMyOCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjBlZDQyZTMtNWJmZi1kYjRlLTg4ZWYtZDhhMmFiNWM0ZmM5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlmZDlhNzYxLTFhMjItM2E0YS1iNWY1LWZmMDQ3NzkxMjYzYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAIALAAAAAAKAAkAAAITjI8hKt22nINMUvlUnRqvjiViAQA7") center center no-repeat; }

#divPn1:hover { opacity: 1; }

/*# sourceMappingURL=main.css.map */</style>
</head>
<body class="">

<header id="header">
	<section id="logo">
		CMS
	</section>
	<div class="ico-more-vert">
		<div id="moreMenu">
			<ul>
				<li id="liFullScreen"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAaVBMVEUAAABtbX9mbn9qantsbHtqcX9nbnxpb3xqb3ppbn1ra3ppbn1obXprb3tobHtqbXtqbXppb3xpbn1qbXtobXtqbn1qbHppbnxrbXppbXtqbntqbXxqbnxpbHppbXtqbnxobHtqbntqbnyQBD1oAAAAI3RSTlMAHB4fISQlKTAzNDU4QEJIT1BmaWtsbm9wdHiotLW6u7zCxZcpySwAAABlSURBVBgZZcHrFoFAAIXRz6UwRiEy45DL+z9krTXnT+zNn1vOLXbKuWcIYYmtQxgQM0JwvlsHYgOPrT1hwUSYKISJQpgohIlJBZ+rfaFCsDvYHoSYEe8Ya2wV44tLSkesSanj1wioVQbQiSp3JgAAAABJRU5ErkJggg==" class="ico-16" alt=""> 全屏切换</li>
				<li id="liAbout"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAApVBMVEUAAABEREBEREBEREACAgIEBAQEBAQEBAMBAQEAAAAAAAAGBgYXFxZEREBEREAAAAAAAAAAAAABAQEKCgpEREABAQEAAAAAAAAAAABEREAAAAABAQESEhFEREAAAAAICAcAAABAQDwFBQU/PzwBAQEBAQEAAAABAQEDAwMAAAAAAAAKCgkAAAAAAAANDQwPDw4AAAAAAAATExEDAwMAAAAAAAAFBQVRPNWqAAAAN3RSTlMAAQQFLIylpIcoApAtDQIijYKGWA9qZVOACSSQMQpJiVAQpw6jiCFRKIEpWZKDRUZYfTApfAGm1tkUfwAAAJ9JREFUGBkFwbFKA0EUQNF7Z98wIcJYbhojWPj/X5PONsQtFBdRHgSf5wAAAAAgAKhVBSAAoeovoMDxb1HV/NEADpoHN9YRD1uDSNOe8L7MqIaa7vEI0+VegepOg1ndWwXqDjBrNIugzu7AqJFdaFTfgBEjjS9o1OVpZY5IX/oVAnh7jvWzvWYICjDnsn58tyuogKe43wrA0yaoVQWg1j9ztDSaSgK7iAAAAABJRU5ErkJggg==" class="ico-16"> 关于 CMS</li>
				<li id="liLogOff"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAulBMVEUAAABEREBEREBEREAAAAAAAAAAAAADAwMEBAQEBAQkJCIAAAAAAABEREBEREBEREABAQEAAAAAAAAAAAAAAABEREAAAABEREAAAAAAAAAAAAABAQELCwoCAgI1NTIGBgYCAgIAAAABAQEFBQUGBgYEBAQBAQEAAAATExIBAQEAAAAJCQkLCwoXFxYLCwoKCgkPDw4AAAAAAAAJCQkBAQEAAAAAAAAlJSIBAQEAAAAAAAAEBAQAAAAAAABdZHKvAAAAPnRSTlMAAQQFHbKoq6+VApYkAg0PfT6sWFQJSQo6OASjVa0RqK5xqa2tys8DLrgXYV4nYl0IFQJjVHZhGawic6uhQQZvQ+AAAACjSURBVBgZBcGHQsIwFADAS4rF9RItVBTBvcCNe/3/b3kHAACQcpMTYLDWtu1wfWMTJLa2RallZxdSphOllhiNEX1Dl0otYTQe7EWZZLq+lmD/YHo4q31iPikB4uh4lnDSh9O2bc/OLy6vrjFPIEq9WSyhA3F7d79Ygg6iPDw+PQPdiij15RUk3t5XUerH5xekzPS7Hf4Mf/8g9Q1SbnICKTf5H9FvC07QB6rMAAAAAElFTkSuQmCC" class="ico-16"> 安全退出</li>
			</ul>
		</div>
	</div>
	<menu id="mainMenu">
	</menu>
</header>
<aside id="sideBar">
	<!--<section class="text-right">
		<img src="/css/ico/arrowleft.gif" id="ico-tgLeft" class="ico-tg" />
		<img src="/css/ico/arrowTop.gif" id="ico-tgTop" class="ico-tg" />
	</section>-->
	<menu id="subMenu">
	</menu>
</aside>
<section id="td">
	<iframe id="mainFrame" name="mainFrame" src="about:blank" frameborder="0" allowfullscreen></iframe>
</section>
<div id="divPn1"></div>
<div id="opgAjaxLoading">
	<div id="opgAjaxLoadingText">
		<div id="square-spin"></div>
		请稍候 ...
	</div>
</div>
<script src="../lib/mod.js"></script>
<script src="../lib/jquery-3.2.1.js"></script>
<script src="../lib/jquery.resizableColumns.js"></script>
<script src="../lib/jquery.pagination.js"></script>
<script src="../js/jquery.plugins.js"></script>
<script type="text/javascript" src="../ts/ui/DisplayOject.js"></script>
<script type="text/javascript" src="../ts/ui/FormControls.js"></script>
<script type="text/javascript" src="../ts/util/store.js"></script>
<script type="text/javascript" src="../ts/app.cfg.js"></script>
<script type="text/javascript" src="../ts/util/utils.js"></script>
<script type="text/javascript" src="../ts/util/api.js"></script>
<script type="text/javascript" src="../ts/ui/Table.js"></script>
<script type="text/javascript" src="../ts/ui/Popup.js"></script>
<script type="text/javascript" src="../ts/ui/Panel.js"></script>
<script type="text/javascript" src="../ts/ui/Combo.js"></script>
<script type="text/javascript" src="../ts/ui/Tree.js"></script>
<script type="text/javascript" src="../ts/ui/TabView.js"></script>
<script type="text/javascript" src="../ts/opg.js"></script>
<script type="text/javascript" src="main.js"></script>
<script>
	require('page/main.ts');
</script>
</body>
</html>