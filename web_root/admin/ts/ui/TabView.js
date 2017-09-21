define("ts/ui/TabView.ts",function(e,t){"use strict";var i=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])};return function(t,i){function n(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var n=e("ts/ui/DisplayOject.ts"),a=function(e){function t(t,i){var n=this;return i=$.extend({autoFire:!0,selectedIndex:0,bindOptions:{template:"<li>${label}</li>"}},i),n=e.call(this,t,i)||this}return i(t,e),t.prototype.init=function(e,t){e.css({display:"table"});var i=$('<div class="tabNavigator"></div>');this.bar=$('<ul class="tabUL"></ul>'),$('<div class="tabWrap"></div>').append(this.bar).appendTo(i),this.data=t.bindOptions.list=t.data,this.bar.bindList(t.bindOptions),e.prepend(i),this.items=this.bar.find("li"),this._prevIndex=-1,this._selectedIndex=-1,this._initSelectedIndex=this.items.length>t.selectedIndex?t.selectedIndex:this.items.length?0:-1;var n=this;return this.bar.on("click.opg","li",function(e){n.selectHandler.call(n,e)}),"function"==typeof t.onSelect&&(this.onSelect=t.onSelect),this.createdHandler(this.data),t.autoFire&&t.selectedIndex>-1&&(n.selectedIndex=t.selectedIndex),this},t.prototype.selectHandler=function(e){e.stopImmediatePropagation();var t=e.target,i=this.items.index(t);(i!==this._selectedIndex||-1==this._prevIndex)&&($(t).addClass("current").siblings("li.current").removeClass("current"),this.selectedIndex=i,"function"==typeof this.onSelect&&this.onSelect.call(this,e))},Object.defineProperty(t.prototype,"selectedIndex",{get:function(){return this._selectedIndex},set:function(e){this._selectedIndex!=e&&(this._prevIndex=this._selectedIndex,this._selectedIndex=e,this.bar.find("li:eq("+e+")").trigger("click.opg"))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"prevIndex",{get:function(){return this._prevIndex},enumerable:!0,configurable:!0}),t.prototype.getSelectedData=function(e){var t=this.data[this.selectedIndex];if(e)return t;var i={},n=void 0;for(n in t)-1===n.indexOf(":")&&(i[n]=t[n]);return i},t}(n.DisplayObject);t.TabBar=a;var s=function(e){function t(t,i){return e.call(this,t,i)||this}return i(t,e),t.prototype.create=function(e,t){var i=t.selectedIndex||0,n=this;t.selectedIndex=-1,this.tabBar=new a(e,t),this.iframe=$('<iframe frameborder="0" src="about:blank"></iframe>').appendTo($('<div class="tabStack"></div>').appendTo(e)),this.tabBar.onSelect=function(){n.iframe.attr("src",n.tabBar.getSelectedData().url)},this.tabBar.selectedIndex=i,this.createdHandler()},t}(n.DisplayObject);t.TabNavigator=s;var r=function(e){function t(t,i){return e.call(this,t,i)||this}return i(t,e),t.prototype.create=function(e,t){this.views=[];var i=t.selectedIndex||0,n=this;t.selectedIndex=-1,this.tabBar=new a(e,t),this.stack=$('<div class="tabStack"></div>').appendTo($('<div style="display: table-row;height: 100%;"></div>').appendTo(e));for(var s=0,r=t.data.length;r>s;s++){var d=t.data[s].view;this.addView($(d))}this.tabBar.onSelect=function(){n.views[n.tabBar.prevIndex]&&n.views[n.tabBar.prevIndex].toggle(),n.views[n.tabBar.selectedIndex]&&n.views[n.tabBar.selectedIndex].toggle()},this.tabBar.selectedIndex=i,this.createdHandler()},t.prototype.addView=function(e){this.views.push(e),this.stack.append(e.addClass("tabDivision"))},t}(n.DisplayObject);t.TabView=r});