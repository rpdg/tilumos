define("ts/opg.ts",function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t("ts/ui/FormControls.ts"),o=t("ts/util/api.ts"),i=t("ts/ui/Table.ts"),r=t("ts/ui/Popup.ts"),a=t("ts/ui/Panel.ts"),s=t("ts/ui/Tree.ts"),u=t("ts/ui/TabView.ts"),p=t("ts/util/utils.ts"),f=function(){function t(t){if(this.jq=$(t),0===this.jq.length)throw new Error("There is no dom object to be processed.")}return t.prototype.table=function(t){return new i.default(this.jq,t)},t.prototype.tree=function(t){return new s.default(this.jq,t)},t.prototype.listBox=function(t){return new n.ListBox(this.jq,t)},t.prototype.checkBox=function(t){return new n.CheckBox(this.jq,t)},t.prototype.radioBox=function(t){return new n.RadioBox(this.jq,t)},t.prototype.popup=function(t){return new r.default(this.jq,t)},t.prototype.panel=function(t){return new a.default(this.jq,t)},t.prototype.tabView=function(t){return new u.TabView(this.jq,t)},t}(),l=function(t){return new f(t)};l.api=o.api,l.request=p.request,l.dateTime=p.dateTime,l.string=p.string,l.is=p.is,l.url=p.url,l.convert=p.convert,l.format=p.format,l.array=p.array,l.popTop=r.default.popTop,l.alert=r.default.alert,l.confirm=r.default.confirm,l.ok=function(t,e,n){void 0===n&&(n={}),r.default.alert('<i class="ico-ok"></i><span>'+t+"</span>",e,n)},l.err=function(t,e,n){void 0===n&&(n={}),r.default.alert('<i class="ico-error"></i><span>'+t+"</span>",e,n)},l.warn=function(t,e,n){void 0===n&&(n={}),r.default.alert('<i class="ico-warn"></i><span>'+t+"</span>",e,n)},l.danger=function(t,e,n){void 0===n&&(n={}),r.default.confirm('<i class="ico-warn"></i><span>'+t+"</span>",e,n)};var c=$({});l.listen=function(){c.on.apply(c,arguments)},l.dispatch=function(){c.trigger.apply(c,arguments)},l.unListen=function(){c.off.apply(c,arguments)},l.wrapPanel=a.default.wrapPanel,window.opg=l,e.default=l});