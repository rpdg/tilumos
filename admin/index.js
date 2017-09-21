define('index.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var store_ts_1 = require("ts/util/store.ts");
  var opg_ts_1 = require("ts/opg.ts");
  //noinspection TypeScriptUnresolvedVariable
  store_ts_1.store.set('apiServer', window.CONFIG.apiServer);
  opg_ts_1.default.api({
      login: 'Bll.Authen/SignIn',
  });
  var form = $('#loginForm');
  var btnLogin = $('#btnLogin').click(function () {
      var param = form.fieldsToJson({
          name: {
              name: '用户名',
              require: true,
          },
          password: {
              name: '密码',
              require: true,
          },
      });
      if (param) {
          opg_ts_1.default.api.login(param, function (data) {
              if (data === 1) {
                  var url_1 = './page/main.aspx';
                  var previousLoginName = store_ts_1.store.get('user');
                  debugger;
                  if (previousLoginName && previousLoginName === param.name) {
                      var hash = opg_ts_1.default.request['ReturnUrl'];
                      if (hash) {
                          url_1 += hash;
                      }
                  }
                  store_ts_1.store.set('user', param.name);
                  $('#cycle').attr('stroke', '#ffffff').addClass('cycle');
                  setTimeout(function () {
                      window.location.replace(url_1);
                  }, 1300);
              }
              else {
                  opg_ts_1.default.err('用户名或密码错误');
              }
          });
      }
  });
  //# sourceMappingURL=/index.js.map
  

});
