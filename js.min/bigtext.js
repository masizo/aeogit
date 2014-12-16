/*! BigText - v0.1.6 - 2014-04-21
 * https://github.com/zachleat/bigtext
 * Copyright (c) 2014 Zach Leatherman (@zachleat)
 * MIT License */
(function(g,e){var a=0,i=e("head"),h=g.BigText,f=e.fn.bigtext,d={DEBUG_MODE:false,DEFAULT_MIN_FONT_SIZE_PX:null,DEFAULT_MAX_FONT_SIZE_PX:528,GLOBAL_STYLE_ID:"bigtext-style",STYLE_ID:"bigtext-id",LINE_CLASS_PREFIX:"bigtext-line",EXEMPT_CLASS:"bigtext-exempt",noConflict:function(j){if(j){e.fn.bigtext=f;g.BigText=h}return d},test:{noFractionalFontSize:(function(){if(!("getComputedStyle" in g)||!("body" in document)){return true}var k=e("<div/>").css({position:"absolute","font-size":"14.1px"}).appendTo(document.body).get(0),j=g.getComputedStyle(k,null);return j?j.getPropertyValue("font-size")==="14px":true})()},init:function(){if(!e("#"+d.GLOBAL_STYLE_ID).length){i.append(d.generateStyleTag(d.GLOBAL_STYLE_ID,[".bigtext * { white-space: nowrap; } .bigtext > * { display: block; }",".bigtext ."+d.EXEMPT_CLASS+", .bigtext ."+d.EXEMPT_CLASS+" * { white-space: normal; }"]))}},bindResize:function(j,k){if(e.throttle){e(g).unbind(j).bind(j,e.throttle(100,k))}else{if(e.fn.smartresize){j="smartresize."+j}e(g).unbind(j).bind(j,k)}},getStyleId:function(j){return d.STYLE_ID+"-"+j},generateStyleTag:function(k,j){return e("<style>"+j.join("\n")+"</style>").attr("id",k)},clearCss:function(k){var j=d.getStyleId(k);e("#"+j).remove()},generateCss:function(r,q,p,o){var n=[];d.clearCss(r);for(var m=0,l=q.length;m<l;m++){n.push("#"+r+" ."+d.LINE_CLASS_PREFIX+m+" {"+(o[m]?" white-space: normal;":"")+(q[m]?" font-size: "+q[m]+"px;":"")+(p[m]?" word-spacing: "+p[m]+"px;":"")+"}")}return d.generateStyleTag(d.getStyleId(r),n)},jQueryMethod:function(j){d.init();j=e.extend({minfontsize:d.DEFAULT_MIN_FONT_SIZE_PX,maxfontsize:d.DEFAULT_MAX_FONT_SIZE_PX,childSelector:"",resize:true},j||{});this.each(function(){var o=e(this).addClass("bigtext"),m=o.width(),n=o.attr("id"),k=j.childSelector?o.find(j.childSelector):o.children();if(!n){n="bigtext-id"+(a++);o.attr("id",n)}if(j.resize){d.bindResize("resize.bigtext-event-"+n,function(){d.jQueryMethod.call(e("#"+n),j)})}d.clearCss(n);k.addClass(function(p,q){return[q.replace(new RegExp("\\b"+d.LINE_CLASS_PREFIX+"\\d+\\b"),""),d.LINE_CLASS_PREFIX+p].join(" ")});var l=b(o,k,m,j.maxfontsize,j.minfontsize);i.append(d.generateCss(n,l.fontSizes,l.wordSpacings,l.minFontSizes))});return this.trigger("bigtext:complete")}};function c(p,r,q,s,k,n,m){var j;m=typeof m==="number"?m:0;p.css(q,s+n);j=p.width();if(j>=r){p.css(q,"");if(j===r){return{match:"exact",size:parseFloat((parseFloat(s)-0.1).toFixed(3))}}var o=r-m,l=j-r;return{match:"estimate",size:parseFloat((parseFloat(s)-(q==="word-spacing"&&m&&(l<o)?0:k)).toFixed(3))}}return j}function b(m,q,r,s,p){var k=m.clone(true).addClass("bigtext-cloned").css({fontFamily:m.css("font-family"),textTransform:m.css("text-transform"),wordSpacing:m.css("word-spacing"),letterSpacing:m.css("letter-spacing"),position:"absolute",left:d.DEBUG_MODE?0:-9999,top:d.DEBUG_MODE?0:-9999}).appendTo(document.body);var l=[],j=[],o=[],n=[];q.css("float","left").each(function(){var C=e(this),x=d.test.noFractionalFontSize?[8,4,1]:[8,4,1,0.1],z,B;if(C.hasClass(d.EXEMPT_CLASS)){l.push(null);n.push(null);o.push(false);return}var D=32,A=parseFloat(C.css("font-size")),y=(C.width()/A).toFixed(6);B=parseInt(r/y,10)-D;outer:for(var u=0,t=x.length;u<t;u++){inner:for(var w=1,v=10;w<=v;w++){if(B+w*x[u]>s){B=s;break outer}z=c(C,r,"font-size",B+w*x[u],x[u],"px",z);if(typeof z!=="number"){B=z.size;if(z.match==="exact"){break outer}break inner}}}n.push(r/B);if(B>s){l.push(s);o.push(false)}else{if(!!p&&B<p){l.push(p);o.push(true)}else{l.push(B);o.push(false)}}}).each(function(u){var y=e(this),x=0,v=1,w;if(y.hasClass(d.EXEMPT_CLASS)){j.push(null);return}y.css("font-size",l[u]+"px");for(var t=1,z=3;t<z;t+=v){w=c(y,r,"word-spacing",t,v,"px",w);if(typeof w!=="number"){x=w.size;break}}y.css("font-size","");j.push(x)}).removeAttr("style");if(!d.DEBUG_MODE){k.remove()}else{k.css({"background-color":"rgba(255,255,255,.4)"})}return{fontSizes:l,wordSpacings:j,ratios:n,minFontSizes:o}}e.fn.bigtext=d.jQueryMethod;g.BigText=d})(this,jQuery);