var Stage=createjs.Stage,Bitmap=createjs.Bitmap,DisplayObject=createjs.DisplayObject,Container=createjs.Container,Util=function(){function e(){}return e.drawGrid=function(e,r,t){void 0===r&&(r=50),void 0===t&&(t="#fff");var a,i,n,h=e.getBounds(),o={x:h.width,y:h.height},b=new Shape,c=b.graphics;for(c.clear(),c.setStrokeStyle(1),c.beginStroke(t),n=o.x/r-1,i=0;n>i;i++)a=~~((i+1)*r),c.moveTo(a,0).lineTo(a,o.y);for(n=o.y/r-1,i=0;n>i;i++)a=~~((i+1)*r),c.moveTo(0,a).lineTo(o.x,a);c.endStroke(),e.addChild(b)},e.breath=function(r,t,a){void 0===t&&(t=10),void 0===a&&(a=!1),0===e.breathObjs.length&&(e.breathing=!0,createjs.Ticker.addEventListener("tick",e.tickBreath)),r.breath={forward:!0,y:r.y,min:r.y-t,max:r.y+t,remove:-1,revertY:a},e.breathObjs.push(r)},e.unBreath=function(r,t){void 0===t&&(t=!1);var a=e.breathObjs.indexOf(r);return a>-1&&(r.breath.remove=a,r.breath.revertY=t),a},e.tickBreath=function(){if(e.breathing){0===e.breathObjs.length&&(e.breathing=!1,createjs.Ticker.removeEventListener("tick",e.tickBreath));for(var r=.5,t=0,a=e.breathObjs.length;a>t;t++){var i=e.breathObjs[t];-1===i.breath.remove?(i.breath.forward?i.y+=r:i.y-=r,(i.y<i.breath.min||i.y>i.breath.max)&&(i.breath.forward=!i.breath.forward)):(e.breathObjs.splice(i.breath.remove,1),i.breath.revertY&&(i.y=i.breath.y))}}},e.FPS=function(){},e.addImage=function(e,r,t,a){void 0===t&&(t=0);var i=new createjs.Bitmap(r);if(a)for(var n in a)i[n]=a[n];return e.addChildAt(i,t),i},e.breathObjs=[],e.breathing=!1,e.breathCount=0,e.time=0,e.fps=0,e}();