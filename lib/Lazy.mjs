var t;(t=function(t){void 0===t&&(t="all"),this.direction=t,this.district={lastY:0,lastX:0,height:0,width:0},this.extend=0,this.attr="lazy-img",this.elements=[],this.interval=[],this.listeners=[]}).prototype.setup=function(t){var e=t.y;void 0===e&&(e=window.scrollY);var i=t.x;void 0===i&&(i=window.scrollX);var n=t.h;void 0===n&&(n=window.innerHeight);var r=t.w;void 0===r&&(r=window.innerWidth);var o=t.extend;void 0===o&&(o=100);var s=t.attr;void 0===s&&(s="lazy-img");var a=this.district;a.lastY=e,a.lastX=i,a.width=r,a.height=n,this.attr=s,this.extend=o,this.popularElements()},t.prototype.popularElements=function(){this.elements=[],document.querySelectorAll("["+this.attr+"]").forEach(this.addElements,this)},t.prototype.addElements=function(t){if(t.attributes[this.attr]&&t.attributes[this.attr].value){var e=t.getBoundingClientRect(),i=this.district,n={el:t,location:{top:e.top+i.lastY,bottom:e.bottom+i.lastY,left:e.left+i.lastX,right:e.right+i.lastX}};this.elements.push(n),this.loadImage(n)}else console.error("Lazy err: "+t+" dont have attribute "+this.attr)},t.prototype.loadImage=function(t){var e=t.location;!t.isLoad&&"all"===this.direction&&this.judgeRow(e)&&this.judgeColumn(e)?this.load(t):(t.isLoad||"row"!==this.direction||!this.judgeRow(e))&&(t.isLoad||"column"!==this.direction||!this.judgeColumn(e))||this.load(t)},t.prototype.load=function(t){var e=t.el;e.src=e.attributes[this.attr].value,e.attributes.removeNamedItem(this.attr),t.isLoad=!0},t.prototype.update=function(t){var e=t.y,i=t.x;void 0!==e&&(this.district.lastY=e),void 0!==i&&(this.district.lastX=i),this.elements.forEach(this.loadImage,this)},t.prototype.removeListener=function(t){t&&t.event&&t.fn&&(t.el.removeEventListener(t.event,t.fn),t.isWork=!1)},t.prototype.removeInterval=function(t){var e=this.interval.find(function(e){return e.fn===t.fn});e>-1&&this.interval.splice(e,1)},t.prototype.removeElement=function(t){var e=this.elements.find(function(e){return e.el===t});e>-1&&this.elements.splice(e,1)},t.prototype.destory=function(){for(var t=0;t<this.listeners.length;t++)this.removeListener(this.listeners[t]);this.elements=null,this.listeners=null,this.interval=null},t.prototype.lift=function(t){return t&&t.fn&&t.num&&this.interval.push({fn:t.fn,lastValue:t.fn(),intervalNum:t.num}),this},t.prototype.startO=function(t){var e=t.el;void 0===e&&(e=document);var i=t.event;void 0===i&&(i="scroll");var n=this,r=function(){var t=[],e=n.interval,i=!1;0===e.length&&(i=!0);for(var r=0;r<e.length;r++){var o=e[r].fn();t[r]=o,i=i||Math.abs(o-e[r].lastValue)>=e[r].intervalNum}if(i){for(var s=0;s<e.length;s++)e[s].lastValue=t[s];n.update({y:window.scrollY,x:window.scrollX})}};e.addEventListener(i,r);var o={fn:r,event:i,el:e,isWork:!0};return n.listeners.push(o),function(){return n.removeListener(o)}},t.prototype.start=function(t){var e=t.el;void 0===e&&(e=document);var i=t.event;void 0===i&&(i="scroll");var n=this,r=function(){for(var t=[],e=n.interval,i=!0,r=0;r<e.length;r++){var o=e[r].fn();t[r]=o,i=i&&Math.abs(o-e[r].lastValue)>=e[r].intervalNum}if(i){for(var s=0;s<e.length;s++)e[s].lastValue=t[s];n.update({y:window.scrollY,x:window.scrollX})}};e.addEventListener(i,r);var o={fn:r,event:i,el:e,isWork:!0};return n.listeners.push(o),function(){return n.removeListener(o)}},t.prototype.judgeRow=function(t){var e=this.district;return e.lastX>=t.left-e.width-this.extend&&e.lastX<=t.right+this.extend},t.prototype.judgeColumn=function(t){var e=this.district;return e.lastY>=t.top-e.height-this.extend&&e.lastY<=t.bottom+this.extend},t.create=function(e){void 0===e&&(e={extend:100,attr:"lazy-img"});var i=new t;return i.setup(e),i},"undefined"!=typeof module&&void 0!==module.exports?module.exports=t:window.Lazy=t;
//# sourceMappingURL=Lazy.mjs.map
