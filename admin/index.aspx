<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<!--<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">-->
	<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
	<meta name="renderer" content="webkit">
	<title>CMS</title>
	    <link rel="stylesheet" href="css/ams.css" />
    <style>
	body {
		background-color: #63cdcd;
		background-image: url("css/img/bg1.jpg");
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	label {
		display: block;
		width: 400px;
		margin-bottom: 10px;
	}
	input[type='text'], input[type='password'] {
		width: 366px;
		height: 33px;
		line-height: 33px;
		font-size: 14px;
		text-indent: 1em;
		border-radius: 0 3px 3px 0;
		border-left: none;
	}
	input[type='text']:focus, input[type='password']:focus {
		border-color: #a3b6bb;
	}
	#loginForm {
		background-color: rgba(255, 255, 255, .28);
		width: 440px;
		height: 160px;
		padding: 20px;
		text-align: center;
		border-radius: 5px;
	}
	#loginPanel {
		position: absolute;
		top: 50%;
		margin-top: -240px;
		left: 50%;
		margin-left: -220px;
		width: 440px;
		height: 260px;
	}
	h1 {
		font-size: 22px;
		font-weight: 100;
		color: #fff;
		text-align: center;
		margin-bottom: 20px;
	}
	#btnLogin {
		font-size: 14px;
		width: 402px;
		height: 38px;
	}
	.box {
		width: 36px;
		height: 33px;
		display: inline-block;
		background-color: #38a5a5;
		vertical-align: bottom;
		background-position: center center;
		background-repeat: no-repeat;
		border-radius: 3px 0 0 3px;
	}
	#b0 {
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAgVBMVEUAAAC7u7+7u7+7u7/8/Pz////5+fr////////k5Ob////////9/f75+fn////a2tz////////9/f3////7+/v+/v7x8fHs7O7////8/Pz7+/v7+/z////+/v7////+/v7////39/f19fb////+/v7////////////NzdD////7+/w2aMXbAAAAKXRSTlMABA0JDZieXTojuGY/NC0Z4MGUh3ZEQhHi4Nq/q6elgntwWVhVRikZEnAihoMAAACYSURBVBjTdY/XEoQgDEUxKEgR1LVs7y38/wcuEGd8Wh4YckjunLB/pyisdXJDxccxzufOjMOZQIsNQFlRZ7pOewWMAE9gVkoxApDBLgR0GQDwNHUIiKWV+jkNIsf0iC2rH/o+3foMDKKOGQJgcaoRo5AXSx3/ECUDL1btbRLz1Qqa8RtNO/O6Hsk0bsJjVP2WF17QpsTz6wf32wfFqyeAowAAAABJRU5ErkJggg==");
	}
	#b1 {
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAVFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////8wXzyWAAAAG3RSTlMAPAfx29PCEqNjTjkzIhsB7MmOjHNsU1ItKhDkzeEhAAAAYElEQVQY023MNwKAIBBEUZSkksxp739PFZbFgt/NK4bVC3vXHeEHM7wtZZ8Quwj6BD3BkGAgaMW3RcsopwCUYyVttbZ32V4A5yA9XUiIyXyyArYhTBkUAs8wIpgGM6zSA02jCE/ps8jDAAAAAElFTkSuQmCC");
	}
	#b2 {
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////9SnXPCAAAAFnRSTlMAVviF5dG5rHZwTCUbEggC6efHvbNbEcZkxAAAAE1JREFUGNOtjUkOgDAMA5MUylZ28P+fSolkceDYzs2WPJY63K01YfnygJdzZZ4Ndu1AUCfJCPQygeiv8EncfHLknCiNWdoBrlXesijmAbtVBUCGtoSyAAAAAElFTkSuQmCC");
	}
	#avanda {
		width: 80px;
		height: 80px;
		border-radius: 200px;
	}
	/* https://codepen.io/discipled/pen/XjbNvW */
	.loader {
		position: absolute;
		top: 0;
		left: 50%;
		width: 130px;
		margin-left: -65px;
		height: 130px;
		transform: rotate(-90deg);
	}
	.loader:before {
		content: '';
		display: block;
		padding-top: 100%;
	}
	.loader .circular {
		position: absolute;
		top: 0;
		left: 0;
		/*animation: rotate 2 s linear infinite;*/
	}
	.loader .cycle {
		animation: circle-dash 1.5s ease-in-out 1;
		color: #9df6f6;
	}
	@keyframes circle-dash {
		0% {
			stroke-dasharray: 1, 350;
			stroke-dashoffset: 0;
		}
		40% {
			stroke-dasharray: 200, 350;
			stroke-dashoffset: 0;
		}
		70% {
			stroke-dasharray: 330, 350;
			stroke-dashoffset: 0;
		}
		100% {
			stroke-dasharray: 350, 350;
			stroke-dashoffset: 0;
		}
	}
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
</head>
<body class="">
<script src="js/config.js"></script>

<div id="loginPanel">
	<p class="text-center" style="padding-top: 2.5em; padding-bottom: 2em;"><img src="css/img/account-128.png"
	                                                                             id="avanda"></p>
	<h1>CMS 登录</h1>
	<form id="loginForm" action="#" onsubmit="return false">
		<label><b id="b1" class="box"></b><input id="loginName" name="name" type="text" maxlength="20"
		                                         placeholder="用户名"></label>
		<label><b id="b2" class="box"></b><input id="password" name="password" type="password" maxlength="18"
		                                         placeholder="登录密码"></label>
		<button id="btnLogin" class="btn-warning">　登录 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAMAAABstdySAAAAVFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////8wXzyWAAAAG3RSTlMA8fvmh43syYH12WdQOywI9sq4n3ZuXDo1JBYi599IAAAAUUlEQVQI1z3KVw7AIAwD0JAQNnTP3P+eRYjir2fLAHAa9LRPVVGWI1q8AR5Za39zXS/J0LN5dsxaswMlPapRO/xZyjxWPQ4pDVrbGAwRIpEJH32UBjnBvsqfAAAAAElFTkSuQmCC" alt="">　
		</button>
	</form>
	<div class="loader">
		<svg class="circular" viewBox="0 0 130 130">
			<circle id="cycle" cx="65" cy="65" r="55" fill="none" stroke="#89d4d4" stroke-width="1%"
			        stroke-linecap="round"></circle>
		</svg>
	</div>
</div>
<!--[if lt IE 10]>
<style type="text/css">
	#ie6wraning {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99999999;
		background-color: #911f0c;
		color: #fff;
		line-height: 30px;
		height: 30px;
		width: 100%;
		text-align: center;
	}
	#ie6wraning a {
		color: #ff0;
	}
	#ie6wraning a:hover {
		color: #fff;
	}
	* html #ie6wraning {
		position: absolute;
	}
</style>
<div id="ie6wraning">
	您使用的浏览器是旧版IE，无法正常使用本系统，请升级您的浏览器至新版本。
	推荐您使用：
	<a target="_blank" href="https://www.google.com/chrome/browser/desktop/index.html">谷歌浏览器</a>、
	<a target="_blank" href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads">新版IE</a>、
	<a target="_blank" href="http://se.360.cn/">360浏览器</a>、
	<a target="_blank" href="http://www.maxthon.cn/">遨游浏览器</a>
</div>
<![endif]-->
<div id="opgAjaxLoading">
	<div id="opgAjaxLoadingText">
		<div id="square-spin"></div>
		请稍候 ...
	</div>
</div>
<script src="lib/mod.js"></script>
<script src="lib/jquery-3.2.1.js"></script>
<script src="lib/jquery.resizableColumns.js"></script>
<script src="lib/jquery.pagination.js"></script>
<script src="js/jquery.plugins.js"></script>
<script type="text/javascript" src="ts/util/store.js"></script>
<script type="text/javascript" src="ts/ui/DisplayOject.js"></script>
<script type="text/javascript" src="ts/ui/FormControls.js"></script>
<script type="text/javascript" src="ts/app.cfg.js"></script>
<script type="text/javascript" src="ts/util/utils.js"></script>
<script type="text/javascript" src="ts/util/api.js"></script>
<script type="text/javascript" src="ts/ui/Table.js"></script>
<script type="text/javascript" src="ts/ui/Popup.js"></script>
<script type="text/javascript" src="ts/ui/Panel.js"></script>
<script type="text/javascript" src="ts/ui/Combo.js"></script>
<script type="text/javascript" src="ts/ui/Tree.js"></script>
<script type="text/javascript" src="ts/ui/TabView.js"></script>
<script type="text/javascript" src="ts/opg.js"></script>
<script type="text/javascript" src="index.js"></script>
<script>
	require('index.ts');
</script>
</body>
</html>