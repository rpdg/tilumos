define('ts/app.cfg.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var store_1 = require("ts/util/store.ts");
  store_1.store.use('sessionStorage');
  var cfg = {
      apiServer: store_1.store.get('apiServer') || (window.CONFIG ? window.CONFIG.apiServer : null),
      ajaxTimeOut: 30000,
      loginPage: '../index.aspx',
      version: '6.6.2_20170908',
  };
  cfg.onUnauthorizedError = function () {
      var param = '', url = cfg.loginPage;
      if (top.window.location.hash) {
          param = '?ReturnUrl=' + encodeURIComponent(top.window.location.hash);
          url += param;
      }
      top.window.location.href = url;
  };
  var globalErrorCodes = {
      'exception': '服务器内部错误',
      'delete_failure': '删除失败',
      'add_failure': '新增失败',
      'update_failure': '更新失败',
      'query_failure': '查询失败',
      'max_length': '输入超出最大长度',
      'token_exception': 'token验证失败',
  };
  cfg.onServerError = function (errorMsg) {
      if (errorMsg === void 0) { errorMsg = 'unknown error'; }
      console.log(this);
      //debugger;
      if ((errorMsg === 'token_exception' || errorMsg === 'Token验证失败') && location.pathname != cfg.loginPage) {
          cfg.onUnauthorizedError();
      }
      if (this.codes && this.codes[errorMsg]) {
          errorMsg = this.codes[errorMsg];
      }
      else if (globalErrorCodes[errorMsg]) {
          errorMsg = globalErrorCodes[errorMsg];
      }
      /*else {
       errorMsg = '服务端发生错误';
       }*/
      top.opg.err(errorMsg);
  };
  exports.default = cfg;
  //# sourceMappingURL=/ts/app.cfg.js.map
  

});
