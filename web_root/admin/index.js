define("index.ts",function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("ts/util/store.ts"),a=e("ts/opg.ts");r.store.set("apiServer",window.CONFIG.apiServer),a.default.api({login:"Bll.Authen/SignIn"});{var n=$("#loginForm");$("#btnLogin").click(function(){var e=n.fieldsToJson({name:{name:"用户名",require:!0},password:{name:"密码",require:!0}});e&&a.default.api.login(e,function(t){if(1===t.data){var n="./page/main.aspx",i=r.store.get("user");if(i&&i===e.name){var s=a.default.request.ReturnUrl;s&&(n+=s)}r.store.set("user",e.name),$("#cycle").attr("stroke","#ffffff").addClass("cycle"),setTimeout(function(){window.location.replace(n)},1300)}else a.default.err("用户名或密码错误")})})}});