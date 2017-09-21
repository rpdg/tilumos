define("ts/ui/Popup.ts",function(t,o){"use strict";function i(t){var o=this,i=this.titleBar=$('<div class="dg-title">'+t.title+"</div>");this.boxy.append(this.titleBar),i[0].onselectstart=p;var n=$('<div class="dg-title-buttons"></div>').appendTo(i);t.btnMax&&(this.btnMax=$("<b class='dg-btn-max'></b>"),n.append(this.btnMax),this.btnMax.on("click",function(){o.toggle()})),t.btnClose&&(this.btnClose=$("<b class='dg-btn-x'></b>"),n.append(this.btnClose),this.btnClose.on("click",function(){o.close()})),t.drag&&e.call(this,this,t),$('<div class="row tb-row" />').prependTo(this.boxy).append(i)}function e(t){var o=t.titleBar;o.on("mousedown",function(i){t.toTop(),"B"!==i.target.tagName&&(i.button<2&&"max"!==t.state&&o.on("mousemove.boxy",function(i){o.unbind("mousemove.boxy");var e=t.boxy[0];document.onselectstart=p;var n=t.getSize();l.dragging=[e,i.pageX-e.offsetLeft,i.pageY-e.offsetTop,document.body.scrollWidth-n.width,document.body.scrollHeight-n.height],$(document).bind("mousemove.boxy",l._handleDrag).bind("mouseup.boxy",function(){if("max"!==t.state&&l.dragging){$(document).unbind(".boxy"),l.dragging=document.onselectstart=null;var o=t.boxy.position();t.restoreSize.top=o.top,t.restoreSize.left=o.left}})}),o.on("mouseup.boxy",function(){o.unbind(".boxy")}))})}function n(t){var o=this.footBar=$('<div class="dg-footer"></div>'),i=[];for(var e in t.buttons){var n=t.buttons[e],s=i.length,a=void 0,r=void 0;"string"==typeof n?(a=0===s?"btn-primary":"",r=n):(a=n.className||"",r=n.text||"","function"==typeof n.onClick&&(t.callback||(t.callback=function(){}),t.callback[e]=n.onClick)),i.push('<button class="'+a+'" name="'+s+'" data-key="'+e+'">'+r+"</button>")}o.html(i.join(" "));var h=this;o.on("click","button",function(){var o=!1;if(t.callback){var i=this,e=$(this).data("key"),n=null;h.iframe&&(n=h.iframe.contentWindow?h.iframe.contentWindow:h.iframe.contentDocument.defaultView);var s=parseInt(i.name,10);o=e&&"function"==typeof t.callback[e]?t.callback[e].call(h,s,n,i):t.callback.call(h,s,n,i)}o||h.close()}),$('<div class="row tf-row" />').appendTo(this.boxy).append(o)}function s(t,o,i){"function"==typeof o&&(i.callback=o),i.buttons||(i.buttons={}),i.buttons.ok||(i.buttons.ok="确定");var e;return e="string"==typeof t&&t.indexOf("<iframe ")<0?'<div class="dg-alert">'+t+"</div>":t,{html:e,cfg:i}}var a=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var i in o)o.hasOwnProperty(i)&&(t[i]=o[i])};return function(o,i){function e(){this.constructor=o}t(o,i),o.prototype=null===i?Object.create(i):(e.prototype=i.prototype,new e)}}();Object.defineProperty(o,"__esModule",{value:!0});var r=t("ts/ui/DisplayOject.ts"),h=t("ts/util/utils.ts"),c={callback:null,title:null,btnClose:!0,btnMax:!1,drag:!0,modal:!0,show:!0,destroy:!0,onClose:null,onDestroy:null,buttons:null},l={manager:[],managerHash:{},dragging:null,_handleDrag:function(t){var o=l.dragging;if(o){var i=t.pageX-o[1],e=t.pageY-o[2];1>i?i=1:i>o[3]&&(i=o[3]),1>e?e=1:e>o[4]&&(e=o[4]),o[0].style.cssText+=";left:"+i+"px;top:"+e+"px;"}}},u=function(){var t=1e3;return function(){return++t}}(),p=function(){return!1},f=function(t){function o(o,i){var e=this;if(i=$.extend({},c,i),e=t.call(this,o,i)||this,l.manager.push(e),i.popId){if(i.popId in l.managerHash)throw new Error('Duplicated PopId "'+i.popId+'"');l.managerHash[i.popId]=e}return e}return a(o,t),o.prototype.init=function(o,i){t.prototype.init.call(this,o,i),this.cfg=i},o.prototype.create=function(t,o){this.state="normal",this.visible=!1,this.mask=$('<div class="dg-mask"></div>'),this.boxy=$('<div class="dg-wrapper" id="dialog_'+r.DisplayObject.guid()+'"></div>'),this.content=$('<div class="dg-content"></div>'),this.content.append(t),this.boxy.append(this.content).appendTo(document.body);var e=0,s=0;o.title&&(i.call(this,o),e=this.titleBar.outerHeight(),this.boxy.find(".tb-row").css({height:e})),o.buttons&&(n.call(this,o),this.boxy.find(".tf-row").css({height:this.footBar.outerHeight()}),s=this.footBar.outerHeight()),"IFRAME"===this.jq[0].tagName&&(this.iframe=this.jq[0]);var a={width:o.width||this.boxy.outerWidth()||500,height:o.height||this.boxy.outerHeight()||300},h=document.documentElement,c={width:h.clientWidth,height:h.clientHeight},l={width:o.width||this.boxy.outerWidth()||500,height:o.height||this.boxy.outerHeight()||300,top:Math.max(0,(c.height-a.height)/2),left:Math.max(0,(c.width-a.width)/2)};this.boxy.css(l),this.restoreSize=l,this.mask.append(this.boxy.css({visibility:"visible"})).appendTo(document.body),this.toTop(),navigator.userAgent.indexOf("Firefox")>-1&&this.iframe&&t.css({height:a.height-e-s-2}),o.show&&this.open()},o.prototype.getSize=function(){return{width:this.boxy.outerWidth(),height:this.boxy.outerHeight()}},o.prototype.getPosition=function(){var t=this.boxy[0];return{left:t.offsetLeft,top:t.offsetTop}},o.prototype.toTop=function(){return this.mask.css({zIndex:u()}),this},o.prototype.open=function(){if(this.boxy.stop(!0,!0),this.visible)return this.toTop();this.mask.css({display:"block",opacity:1});var t=this.boxy.position().top;return this.boxy.css({top:t-20,opacity:0}).animate({opacity:1,top:t},200),this.visible=!0,this},o.prototype.close=function(t){var o=this,i=this.getPosition();return i.opacity=0,i.top=Math.max(i.top-40,0),this.mask.animate({opacity:0},200),this.boxy.stop(!0,!0).animate(i,300,function(){"function"==typeof o.cfg.onClose&&o.cfg.onClose.call(o),"function"==typeof t&&t.call(o),o.cfg.destroy?o.destroy.call(o):(o.visible=!1,o.boxy.css({top:i.top+40}),o.mask.css({display:"none"}))}),this},o.prototype.max=function(){return this.boxy.stop(!0,!0).css({left:0,top:0,width:"100%",height:"100%"}),this.btnMax&&this.btnMax.toggleClass("dg-btn-max dg-btn-restore"),this.state="max",this},o.prototype.restore=function(){return this.boxy.stop(!0,!0).css(this.restoreSize),this.btnMax&&this.btnMax.toggleClass("dg-btn-max dg-btn-restore"),this.state="normal",this},o.prototype.destroy=function(){if(this.titleBar&&(this.titleBar.off("mousedown"),this.btnMax&&this.btnMax.off("click"),this.btnClose&&this.btnClose.off("click")),this.footBar&&this.footBar.off("click"),this.mask.remove(),h.is.UsingIE){var t=$('<input type="text" style="opacity: 0;" />').appendTo("body").focus();setTimeout(function(){t.remove(),t=null},20)}l.manager.splice(l.manager.indexOf(this),1),this.cfg.popId&&delete l.managerHash[this.cfg.popId],"function"==typeof this.cfg.onDestroy&&this.cfg.onDestroy.call(this)},o.prototype.toggle=function(){return"normal"===this.state?(this.max(),navigator.userAgent.indexOf("Firefox")>-1&&this.iframe&&(this.iframe.style.cssText+="height: "+(this.boxy.outerHeight()-this.titleBar.outerHeight()-2-(this.footBar?this.footBar.outerHeight():0))+"px; ")):(this.restore(),navigator.userAgent.indexOf("Firefox")>-1&&this.iframe&&(this.iframe.style.cssText+="height: "+(this.restoreSize.height-this.titleBar.outerHeight()-2-(this.footBar?this.footBar.outerHeight():0))+"px; ")),this},o.alert=function(t,i,e){void 0===e&&(e={});var n=s(t,i,e),a=n.html,r=n.cfg;return new o($(a),r)},o.confirm=function(t,i,e){void 0===e&&(e={});var n=s(t,i,e),a=n.html,r=n.cfg;return r.buttons.cancel||(r.buttons.cancel="取消"),r.callback=function(t,o){return 0===t?i.call(this,t,o):void 0},new o($(a),r)},o.popTop=function(t,o){return top.opg(t).popup(o)},o.closeLast=function(){if(l.manager.length>0){var t=l.manager[l.manager.length-1];return t.close()}return null},o.closeById=function(t){if(l.managerHash[t]){var o=l.managerHash[t];return o.close()}return null},o}(r.DisplayObject);o.default=f});