define('page/main.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var opg_ts_1 = require("ts/opg.ts");
  var store_1 = require("ts/util/store.ts");
  var app_cfg_ts_1 = require("ts/app.cfg.ts");
  var Popup_1 = require("ts/ui/Popup.ts");
  opg_ts_1.default.api({
      backendVersion: 'base/version',
  });
  //opg.api.menu(function (json) {
  var permissions = [{
          'id': 2,
          'parentId': 1,
          'name': '内容生产',
          'children': [{
                  'id': 200,
                  'parentId': 2,
                  'name': '发起生产',
                  'code': '200',
                  'url': 'clickNoteList.aspx',
              }, {
                  'id': 201,
                  'parentId': 2,
                  'name': '内容采集',
                  'code': '201',
                  'url': '/page/collection/acquisition/index.html',
              }],
          'code': '2',
      }];
  var menu = {}, curMainMenuId;
  for (var i = 0, l = permissions.length; i < l; i++) {
      var mn = permissions[i];
      menu['#' + mn.id] = mn;
  }
  var mainMenu = $('#mainMenu'), subMenu = $('#subMenu'), divTd = $('#td'), mainFrame = $('#mainFrame'), mainFrameWindow = mainFrame[0].contentWindow;
  /*if (permissions.length > 6) {
   mainMenu.addClass('small-menu');
   }*/
  $('#divPn1').click(function () {
      var that = $(this);
      if (that.hasClass('ellipse')) {
          that.removeClass('ellipse');
          subMenu.css('width', 180);
          divTd.css('left', 180);
      }
      else {
          that.addClass('ellipse');
          subMenu.css('width', 0);
          divTd.css('left', 0);
      }
  });
  var mainMenuSelector = 'a:eq(0)', subMenuSelector = 'a:eq(0)';
  if (location.hash.length > 1) {
      var ph = location.hash.split('/');
      mainMenuSelector = '#\\' + ph[0];
      if (ph[1]) {
          subMenuSelector = '#\\/' + ph[1];
      }
  }
  subMenu.on('click', 'a', function () {
      var sm = $(this);
      sm.addClass('cur').siblings('.cur').removeClass('cur');
      store_1.Cache.empty();
      //mainFrame.attr('src', sm.attr('href') as string);
      mainFrameWindow.location.replace(sm.attr('href'));
      location.hash = curMainMenuId + sm[0].id;
      if (sm.hasClass('hasChildren')) {
          console.warn(sm.text() + ' has permission control!');
      }
      return false;
  });
  mainMenu.on('click', 'a', function () {
      var cur = $(this), mnId = cur.attr('href');
      curMainMenuId = mnId;
      cur.addClass('cur').siblings('.cur').removeClass('cur');
      subMenu.bindList({
          template: '<a id="/${id}" href="${url}" target="mainFrame" class="${id:=g}">${name}</a>',
          list: menu[mnId].children,
          itemRender: {
              g: function (v, i, row) {
                  if (row.children && row.children.length) {
                      return 'hasChildren';
                  }
              },
          },
      }).find(subMenuSelector).click();
      if (subMenuSelector != 'a:eq(0)')
          subMenuSelector = 'a:eq(0)';
  });
  mainMenu.bindList({
      template: '<a id="#${id}" href="#${id}">${name}</a>',
      list: permissions,
  }).find(mainMenuSelector).click();
  var wViewport = window.document.documentElement.clientWidth, wMenu = mainMenu.outerWidth();
  console.log(wViewport - wMenu);
  if (wViewport - wMenu < 0) {
      mainMenu.addClass('nano-menu');
  }
  if (wViewport - wMenu < 150) {
      mainMenu.addClass('mini-menu');
  }
  else if (wViewport - wMenu < 300) {
      mainMenu.addClass('small-menu');
  }
  $('#liAbout').click(function () {
      var html = "<div style=\"height: 80px; font-size: 12px; color: #555; padding-top: 12px; text-align: center;\">\n\t\t\t\t\t<h2 style=\"font-size: 32px; margin-bottom: 3px;\">CMS v6</h2>\n\t\t\t\t\t<span style=\"font-size: 12px;\"><span style=\"display: inline-block;width: 80px;font-size: 12px;\">front-end\uFF1A</span>" + app_cfg_ts_1.default.version + "</span><br>\n\t\t\t\t</div>";
      opg_ts_1.default.alert(html, $.noop, {
          title: '关于 IMSP',
          width: 500,
      });
  });
  $('#liLogOff').click(function () {
      store_1.store.clear();
      window.location.href = app_cfg_ts_1.default.loginPage;
  });
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate', function () {
      //debugger;
      history.pushState(null, null, document.URL);
      Popup_1.default.closeLast();
  });
  $('#liFullScreen').click(function (evt) {
      // Test for each of the supported versions of full screen APIs and call
      // either requestFullscreen or cancelFullScreen (or exitFullScreen)
      //  Structure:
      //  Does the incoming target support requestFullscreen (or prefaced version)
      //  if (there is a fullscreen element)
      //      then cancel or exit
      //  else request full screen mode
      var divObj = evt.target; //  get the target element
      if (divObj.requestFullscreen)
          if (document.fullScreenElement) {
              document.cancelFullScreen();
          }
          else {
              document.documentElement.requestFullscreen();
          }
      else if (divObj.webkitRequestFullscreen)
          if (document.webkitFullscreenElement) {
              document.webkitCancelFullScreen();
          }
          else {
              document.documentElement.webkitRequestFullscreen();
          }
      else if (divObj.msRequestFullscreen)
          if (document.msFullscreenElement) {
              document.msExitFullscreen();
          }
          else {
              document.body.msRequestFullscreen();
          }
      else if (divObj.mozRequestFullScreen)
          if (document.mozFullScreenElement) {
              document.mozCancelFullScreen();
          }
          else {
              document.documentElement.mozRequestFullScreen();
          }
      //  stop bubbling so we don't get bounce back
      evt.stopPropagation();
  });
  //# sourceMappingURL=/page/main.js.map
  

});
