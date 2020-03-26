/**
 * Template7 1.4.1
 * Mobile-first HTML template engine
 * 
 * http://www.idangero.us/template7/
 * 
 * Copyright 2019, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: February 5, 2019
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Template7=t()}(this,function(){"use strict";var t7ctx;t7ctx="undefined"!=typeof window?window:"undefined"!=typeof global?global:void 0;var Template7Context=t7ctx,Template7Utils={quoteSingleRexExp:new RegExp("'","g"),quoteDoubleRexExp:new RegExp('"',"g"),isFunction:function(e){return"function"==typeof e},escape:function(e){return void 0===e&&(e=""),e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")},helperToSlices:function(e){var t,i,r,n=Template7Utils.quoteDoubleRexExp,l=Template7Utils.quoteSingleRexExp,a=e.replace(/[{}#}]/g,"").trim().split(" "),s=[];for(i=0;i<a.length;i+=1){var o=a[i],p=void 0,c=void 0;if(0===i)s.push(o);else if(0===o.indexOf('"')||0===o.indexOf("'"))if(p=0===o.indexOf('"')?n:l,c=0===o.indexOf('"')?'"':"'",2===o.match(p).length)s.push(o);else{for(t=0,r=i+1;r<a.length;r+=1)if(o+=" "+a[r],0<=a[r].indexOf(c)){t=r,s.push(o);break}t&&(i=t)}else if(0<o.indexOf("=")){var u=o.split("="),f=u[0],d=u[1];if(p||(p=0===d.indexOf('"')?n:l,c=0===d.indexOf('"')?'"':"'"),2!==d.match(p).length){for(t=0,r=i+1;r<a.length;r+=1)if(d+=" "+a[r],0<=a[r].indexOf(c)){t=r;break}t&&(i=t)}var m=[f,d.replace(p,"")];s.push(m)}else s.push(o)}return s},stringToBlocks:function(e){var t,i,r=[];if(!e)return[];var n=e.split(/({{[^{^}]*}})/);for(t=0;t<n.length;t+=1){var l=n[t];if(""!==l)if(l.indexOf("{{")<0)r.push({type:"plain",content:l});else{if(0<=l.indexOf("{/"))continue;if((l=l.replace(/{{([#/])*([ ])*/,"{{$1").replace(/([ ])*}}/,"}}")).indexOf("{#")<0&&l.indexOf(" ")<0&&l.indexOf("else")<0){r.push({type:"variable",contextName:l.replace(/[{}]/g,"")});continue}var a=Template7Utils.helperToSlices(l),s=a[0],o=">"===s,p=[],c={};for(i=1;i<a.length;i+=1){var u=a[i];Array.isArray(u)?c[u[0]]="false"!==u[1]&&u[1]:p.push(u)}if(0<=l.indexOf("{#")){var f="",d="",m=0,h=void 0,g=!1,x=!1,v=0;for(i=t+1;i<n.length;i+=1)if(0<=n[i].indexOf("{{#")&&(v+=1),0<=n[i].indexOf("{{/")&&(v-=1),0<=n[i].indexOf("{{#"+s))f+=n[i],x&&(d+=n[i]),m+=1;else if(0<=n[i].indexOf("{{/"+s)){if(!(0<m)){h=i,g=!0;break}m-=1,f+=n[i],x&&(d+=n[i])}else 0<=n[i].indexOf("else")&&0===v?x=!0:(x||(f+=n[i]),x&&(d+=n[i]));g&&(h&&(t=h),"raw"===s?r.push({type:"plain",content:f}):r.push({type:"helper",helperName:s,contextName:p,content:f,inverseContent:d,hash:c}))}else 0<l.indexOf(" ")&&(o&&(s="_partial",p[0]&&(0===p[0].indexOf("[")?p[0]=p[0].replace(/[[\]]/g,""):p[0]='"'+p[0].replace(/"|'/g,"")+'"')),r.push({type:"helper",helperName:s,contextName:p,hash:c}))}}return r},parseJsVariable:function(e,r,n){return e.split(/([+ \-*/^()&=|<>!%:?])/g).reduce(function(e,t){if(!t)return e;if(t.indexOf(r)<0)return e.push(t),e;if(!n)return e.push(JSON.stringify("")),e;var i=n;return 0<=t.indexOf(r+".")&&t.split(r+".")[1].split(".").forEach(function(e){i=e in i?i[e]:void 0}),"string"==typeof i&&(i=JSON.stringify(i)),void 0===i&&(i="undefined"),e.push(i),e},[]).join("")},parseJsParents:function(e,n){return e.split(/([+ \-*^()&=|<>!%:?])/g).reduce(function(e,t){if(!t)return e;if(t.indexOf("../")<0)return e.push(t),e;if(!n||0===n.length)return e.push(JSON.stringify("")),e;var i=t.split("../").length-1,r=i>n.length?n[n.length-1]:n[i-1];return t.replace(/..\//g,"").split(".").forEach(function(e){r=void 0!==r[e]?r[e]:"undefined"}),!1===r||!0===r?e.push(JSON.stringify(r)):null===r||"undefined"===r?e.push(JSON.stringify("")):e.push(JSON.stringify(r)),e},[]).join("")},getCompileVar:function(e,t,i){void 0===i&&(i="data_1");var r,n,l=t,a=0;r=0===e.indexOf("../")?(a=e.split("../").length-1,l="ctx_"+(1<=(n=l.split("_")[1]-a)?n:1),e.split("../")[a].split(".")):0===e.indexOf("@global")?(l="Template7.global",e.split("@global.")[1].split(".")):0===e.indexOf("@root")?(l="root",e.split("@root.")[1].split(".")):e.split(".");for(var s=0;s<r.length;s+=1){var o=r[s];if(0===o.indexOf("@")){var p=i.split("_")[1];0<a&&(p=n),0<s?l+="[(data_"+p+" && data_"+p+"."+o.replace("@","")+")]":l="(data_"+p+" && data_"+p+"."+o.replace("@","")+")"}else(Number.isFinite?Number.isFinite(o):Template7Context.isFinite(o))?l+="["+o+"]":"this"===o||0<=o.indexOf("this.")||0<=o.indexOf("this[")||0<=o.indexOf("this(")?l=o.replace("this",t):l+="."+o}return l},getCompiledArguments:function(e,t,i){for(var r=[],n=0;n<e.length;n+=1)/^['"]/.test(e[n])?r.push(e[n]):/^(true|false|\d+)$/.test(e[n])?r.push(e[n]):r.push(Template7Utils.getCompileVar(e[n],t,i));return r.join(", ")}},Template7Helpers={_partial:function(e,t){var i=this,r=Template7Class.partials[e];return!r||r&&!r.template?"":(r.compiled||(r.compiled=new Template7Class(r.template).compile()),Object.keys(t.hash).forEach(function(e){i[e]=t.hash[e]}),r.compiled(i,t.data,t.root))},escape:function(e){if("string"!=typeof e)throw new Error('Template7: Passed context to "escape" helper should be a string');return Template7Utils.escape(e)},if:function(e,t){var i=e;return Template7Utils.isFunction(i)&&(i=i.call(this)),i?t.fn(this,t.data):t.inverse(this,t.data)},unless:function(e,t){var i=e;return Template7Utils.isFunction(i)&&(i=i.call(this)),i?t.inverse(this,t.data):t.fn(this,t.data)},each:function(e,t){var i=e,r="",n=0;if(Template7Utils.isFunction(i)&&(i=i.call(this)),Array.isArray(i)){for(t.hash.reverse&&(i=i.reverse()),n=0;n<i.length;n+=1)r+=t.fn(i[n],{first:0===n,last:n===i.length-1,index:n});t.hash.reverse&&(i=i.reverse())}else for(var l in i)n+=1,r+=t.fn(i[l],{key:l});return 0<n?r:t.inverse(this)},with:function(e,t){var i=e;return Template7Utils.isFunction(i)&&(i=e.call(this)),t.fn(i)},join:function(e,t){var i=e;return Template7Utils.isFunction(i)&&(i=i.call(this)),i.join(t.hash.delimiter||t.hash.delimeter)},js:function js(expression,options){var data=options.data,func,execute=expression;return"index first last key".split(" ").forEach(function(e){if(void 0!==data[e]){var t=new RegExp("this.@"+e,"g"),i=new RegExp("@"+e,"g");execute=execute.replace(t,JSON.stringify(data[e])).replace(i,JSON.stringify(data[e]))}}),options.root&&0<=execute.indexOf("@root")&&(execute=Template7Utils.parseJsVariable(execute,"@root",options.root)),0<=execute.indexOf("@global")&&(execute=Template7Utils.parseJsVariable(execute,"@global",Template7Context.Template7.global)),0<=execute.indexOf("../")&&(execute=Template7Utils.parseJsParents(execute,options.parents)),func=0<=execute.indexOf("return")?"(function(){"+execute+"})":"(function(){return ("+execute+")})",eval(func).call(this)},js_if:function js_if(expression,options){var data=options.data,func,execute=expression;"index first last key".split(" ").forEach(function(e){if(void 0!==data[e]){var t=new RegExp("this.@"+e,"g"),i=new RegExp("@"+e,"g");execute=execute.replace(t,JSON.stringify(data[e])).replace(i,JSON.stringify(data[e]))}}),options.root&&0<=execute.indexOf("@root")&&(execute=Template7Utils.parseJsVariable(execute,"@root",options.root)),0<=execute.indexOf("@global")&&(execute=Template7Utils.parseJsVariable(execute,"@global",Template7Context.Template7.global)),0<=execute.indexOf("../")&&(execute=Template7Utils.parseJsParents(execute,options.parents)),func=0<=execute.indexOf("return")?"(function(){"+execute+"})":"(function(){return ("+execute+")})";var condition=eval(func).call(this);return condition?options.fn(this,options.data):options.inverse(this,options.data)}};Template7Helpers.js_compare=Template7Helpers.js_if;var Template7Options={},Template7Partials={},Template7Class=function(e){this.template=e},staticAccessors={options:{configurable:!0},partials:{configurable:!0},helpers:{configurable:!0}};function Template7(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];var i=e[0],r=e[1];if(2!==e.length)return new Template7Class(i);var n=new Template7Class(i),l=n.compile()(r);return n=null,l}return Template7Class.prototype.compile=function compile(template,depth){void 0===template&&(template=this.template),void 0===depth&&(depth=1);var t=this;if(t.compiled)return t.compiled;if("string"!=typeof template)throw new Error("Template7: Template must be a string");var stringToBlocks=Template7Utils.stringToBlocks,getCompileVar=Template7Utils.getCompileVar,getCompiledArguments=Template7Utils.getCompiledArguments,blocks=stringToBlocks(template),ctx="ctx_"+depth,data="data_"+depth;if(0===blocks.length)return function(){return""};function getCompileFn(e,i){return e.content?t.compile(e.content,i):function(){return""}}function getCompileInverse(e,i){return e.inverseContent?t.compile(e.inverseContent,i):function(){return""}}var resultString="",i;for(resultString+=1===depth?"(function ("+ctx+", "+data+", root) {\n":"(function ("+ctx+", "+data+") {\n",1===depth&&(resultString+="function isArray(arr){return Array.isArray(arr);}\n",resultString+="function isFunction(func){return (typeof func === 'function');}\n",resultString+='function c(val, ctx) {if (typeof val !== "undefined" && val !== null) {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n',resultString+="root = root || ctx_1 || {};\n"),resultString+="var r = '';\n",i=0;i<blocks.length;i+=1){var block=blocks[i];if("plain"!==block.type){var variable=void 0,compiledArguments=void 0;if("variable"===block.type&&(variable=getCompileVar(block.contextName,ctx,data),resultString+="r += c("+variable+", "+ctx+");"),"helper"===block.type){var parents=void 0;if("ctx_1"!==ctx){for(var level=ctx.split("_")[1],parentsString="ctx_"+(level-1),j=level-2;1<=j;j-=1)parentsString+=", ctx_"+j;parents="["+parentsString+"]"}else parents="["+ctx+"]";var dynamicHelper=void 0;if(0===block.helperName.indexOf("[")&&(block.helperName=getCompileVar(block.helperName.replace(/[[\]]/g,""),ctx,data),dynamicHelper=!0),dynamicHelper||block.helperName in Template7Helpers)compiledArguments=getCompiledArguments(block.contextName,ctx,data),resultString+="r += (Template7Helpers"+(dynamicHelper?"["+block.helperName+"]":"."+block.helperName)+").call("+ctx+", "+(compiledArguments&&compiledArguments+", ")+"{hash:"+JSON.stringify(block.hash)+", data: "+data+" || {}, fn: "+getCompileFn(block,depth+1)+", inverse: "+getCompileInverse(block,depth+1)+", root: root, parents: "+parents+"});";else{if(0<block.contextName.length)throw new Error('Template7: Missing helper: "'+block.helperName+'"');variable=getCompileVar(block.helperName,ctx,data),resultString+="if ("+variable+") {",resultString+="if (isArray("+variable+")) {",resultString+="r += (Template7Helpers.each).call("+ctx+", "+variable+", {hash:"+JSON.stringify(block.hash)+", data: "+data+" || {}, fn: "+getCompileFn(block,depth+1)+", inverse: "+getCompileInverse(block,depth+1)+", root: root, parents: "+parents+"});",resultString+="}else {",resultString+="r += (Template7Helpers.with).call("+ctx+", "+variable+", {hash:"+JSON.stringify(block.hash)+", data: "+data+" || {}, fn: "+getCompileFn(block,depth+1)+", inverse: "+getCompileInverse(block,depth+1)+", root: root, parents: "+parents+"});",resultString+="}}"}}}else resultString+="r +='"+block.content.replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/'/g,"\\'")+"';"}return resultString+="\nreturn r;})",1===depth?(t.compiled=eval(resultString),t.compiled):resultString},staticAccessors.options.get=function(){return Template7Options},staticAccessors.partials.get=function(){return Template7Partials},staticAccessors.helpers.get=function(){return Template7Helpers},Object.defineProperties(Template7Class,staticAccessors),Template7.registerHelper=function(e,t){Template7Class.helpers[e]=t},Template7.unregisterHelper=function(e){Template7Class.helpers[e]=void 0,delete Template7Class.helpers[e]},Template7.registerPartial=function(e,t){Template7Class.partials[e]={template:t}},Template7.unregisterPartial=function(e){Template7Class.partials[e]&&(Template7Class.partials[e]=void 0,delete Template7Class.partials[e])},Template7.compile=function(e,t){return new Template7Class(e,t).compile()},Template7.options=Template7Class.options,Template7.helpers=Template7Class.helpers,Template7.partials=Template7Class.partials,Template7});
//# sourceMappingURL=template7.min.js.map

/*!
 * PageXray v2.5.9 - Xray your HAR file and know all about the page - https://github.com/sitespeedio/pagexray
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).PageXray=e()}}(function(){return function(){return function e(t,n,r){function s(o,a){if(!n[o]){if(!t[o]){var h="function"==typeof require&&require;if(!a&&h)return h(o,!0);if(i)return i(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[o]={exports:{}};t[o][0].call(u.exports,function(e){return s(t[o][1][e]||e)},u,u.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}}()({1:[function(e,t,n){"use strict";var r=e("./util"),s=e("./headers");function i(e,t){var n=e.timings[t];return Number.isFinite(n)&&-1!==n?Number(n.toFixed(0)):0}t.exports={asset:function(e){var t=e.response,n=e.request,o=r.getContentType(t.content.mimeType),a=s.flatten(n.headers),h=s.flatten(t.headers),c={blocked:i(e,"blocked"),dns:i(e,"dns"),connect:i(e,"connect"),send:i(e,"send"),wait:i(e,"wait"),receive:i(e,"receive")},u=c.blocked+c.dns+c.connect+c.send+c.wait+c.receive;return{type:o,url:n.url,transferSize:t.bodySize,contentSize:t.content.size<0?t.bodySize:t.content.size,headerSize:t.headersSize,expires:s.getExpires(h),status:t.status,timeSinceLastModified:s.getTimeSinceLastModified(h),httpVersion:r.getHTTPVersion(t.httpVersion),headers:{request:a,response:h},totalTime:u,timings:c,cookies:n.cookies.length}},domainInfo:function(e,t){var n=r.getHostname(e.url),s=t[n]||{transferSize:0,contentSize:0,headerSize:0,requests:0,timings:{blocked:0,dns:0,connect:0,send:0,wait:0,receive:0},totalTime:0};s.transferSize+=e.transferSize,s.contentSize+=e.contentSize,s.headerSize+=e.headerSize,s.requests+=1,s.totalTime+=e.totalTime,s.timings.blocked+=e.timings.blocked,s.timings.dns+=e.timings.dns,s.timings.connect+=e.timings.connect,s.timings.send+=e.timings.send,s.timings.wait+=e.timings.wait,s.timings.receive+=e.timings.receive,t[n]=s},responseCode:function(e,t){var n=t[e.status]||0;t[e.status]=n+1},missingCompression:function(e,t){var n=e.headers.response["content-encoding"],r=["html","plain","json","javascript","css","svg"].includes(e.type),s=["gzip","br","deflate"].includes(n),i=e.contentSize>2e3;r&&i&&!s&&(t.missingCompression+=1)},defaultContentTypes:function(){return{html:{transferSize:0,contentSize:0,headerSize:0,requests:0,timings:{blocked:0,dns:0,connect:0,send:0,wait:0,receive:0},totalTime:0},css:{transferSize:0,contentSize:0,headerSize:0,requests:0,timings:{blocked:0,dns:0,connect:0,send:0,wait:0,receive:0},totalTime:0},javascript:{transferSize:0,contentSize:0,headerSize:0,requests:0,timings:{blocked:0,dns:0,connect:0,send:0,wait:0,receive:0},totalTime:0},image:{transferSize:0,contentSize:0,headerSize:0,requests:0,timings:{blocked:0,dns:0,connect:0,send:0,wait:0,receive:0},totalTime:0},font:{transferSize:0,contentSize:0,headerSize:0,requests:0,timings:{blocked:0,dns:0,connect:0,send:0,wait:0,receive:0},totalTime:0}}},contentType:function(e,t){if(/^2\d{2}/.test(e.status)||304===e.status){var n=t[e.type]||{transferSize:0,contentSize:0,headerSize:0,requests:0,timings:{blocked:0,dns:0,connect:0,send:0,wait:0,receive:0},totalTime:0};n.requests+=1,n.transferSize+=Math.max(e.transferSize,0),n.contentSize+=Math.max(e.contentSize,0),n.headerSize+=Math.max(e.headerSize,0),t[e.type]=n}}}},{"./headers":2,"./util":6}],2:[function(e,t,n){"use strict";function r(e){if(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun).+/.test(e)){var t=Date.parse(e);if(isFinite(t))return t}}t.exports={flatten:function(e){return e.reduce(function(e,t){return e[t.name.toLowerCase()]=t.value,e},{})},getExpires:function(e){var t=0;if(e["cache-control"]){if(-1!==e["cache-control"].indexOf("no-cache")||-1!==e["cache-control"].indexOf("no-store"))return 0;var n=e["cache-control"].match(/max-age=(\d+)/);if(n)return parseInt(n[1],10)}else if(e.expires){var s=r(e.expires);isFinite(s)&&(t=(s-Date.now())/1e3)}return t},getTimeSinceLastModified:function(e){var t=r(e["last-modified"]);if(!isFinite(t))return-1;var n=r(e.date);return isFinite(n)||(n=Date.now()),(n-t)/1e3}}},{}],3:[function(e,t,n){"use strict";var r=e("./util"),s=e("./collect"),i=e("./sitespeed"),o=e("./webpagetest"),a=e("./statistics").Statistics;t.exports={convertIndex:function(e,n,r){return t.exports.convert(e,r)[n]},convert:function(e,t){var n,h=[],c={},u={};((t=t||{}).firstParty||e.log.pages[0]._meta&&e.log.pages[0]._meta.firstParty)&&(n=t.firstParty||e.log.pages[0]._meta.firstParty);var l=Array.from(e.log.entries);"WebPagetest"!==e.log.creator.name&&l.sort(function(e,t){return new Date(e.startedDateTime).getTime()-new Date(t.startedDateTime).getTime()});var f={},p={},d=!0,m=!1,g=void 0;try{for(var v,y=e.log.pages[Symbol.iterator]();!(d=(v=y.next()).done);d=!0){var S=v.value,b=new Date(S.startedDateTime).getTime();f[S.id]={onLoad:b+S.pageTimings.onLoad,onContentLoad:b+S.pageTimings.onContentLoad},S._url&&(p[S.id]=S._url)}}catch(e){m=!0,g=e}finally{try{d||null==y.return||y.return()}finally{if(m)throw g}}return l.forEach(function(i){if(u[i.pageref])c=u[i.pageref];else{var o=r.getDocumentRequests(l,i.pageref),d=o.pop(),m=o.map(function(e){return e.request.url}),g=d.response.httpVersion,v=d.request.url,y=r.getHostname(v);if(!n){var S=r.getMainDomain(y);n="wikipedia"===S?"(.*wikipedia.*||.*wikimedia.*)":".*"+S+".*"}c={url:p[i.pageref]?p[i.pageref]:i.request.url,meta:{browser:{},startedDateTime:i.startedDateTime},finalUrl:v,baseDomain:y,firstPartyRegEx:n,documentRedirects:m.length,redirectChain:m,transferSize:0,contentSize:0,headerSize:0,requests:0,missingCompression:0,fullyLoaded:r.getFullyLoaded(i.pageref,l,i.startedDateTime),httpType:r.getConnectionType(g),httpVersion:r.getHTTPVersion(g),contentTypes:s.defaultContentTypes(),assets:[],responseCodes:{},firstParty:{cookieStats:new a,contentTypes:s.defaultContentTypes()},thirdParty:{cookieStats:new a,contentTypes:s.defaultContentTypes()},domains:{},expireStats:new a,lastModifiedStats:new a,cookieStats:new a,afterOnContentLoad:{requests:0,transferSize:0,contentTypes:s.defaultContentTypes()},afterOnLoad:{requests:0,transferSize:0,contentTypes:s.defaultContentTypes()}},e.log.browser&&e.log.browser.name&&(c.meta.browser.name=e.log.browser.name),e.log.browser&&e.log.browser.version&&(c.meta.browser.version=e.log.browser.version),u[i.pageref]=c,h.push(c)}var b=s.asset(i);c.expireStats.add(b.expires),-1!==b.timeSinceLastModified&&c.lastModifiedStats.add(b.timeSinceLastModified),c.cookieStats.add(b.cookies),c.assets.push(b),s.domainInfo(b,c.domains,t),s.responseCode(b,c.responseCodes),s.contentType(b,c.contentTypes),s.missingCompression(b,c),c.transferSize+=i.response.bodySize,c.contentSize+=i.response.content.size<0?i.response.bodySize:i.response.content.size,c.headerSize+=Math.max(i.response.headersSize,0);var x=new Date(i.startedDateTime).getTime();if(f[i.pageref]&&x>f[i.pageref].onLoad&&(c.afterOnLoad.requests+=1,c.afterOnLoad.transferSize+=i.response.bodySize,s.contentType(b,c.afterOnLoad.contentTypes)),f[i.pageref]&&x>f[i.pageref].onContentLoad&&(c.afterOnContentLoad.requests+=1,c.afterOnContentLoad.transferSize+=i.response.bodySize,s.contentType(b,c.afterOnContentLoad.contentTypes)),n){var w=c.thirdParty;r.getHostname(b.url).match(n)&&(w=c.firstParty),w.requests=w.requests+1||1,w.transferSize=w.transferSize+b.transferSize||b.transferSize,w.contentSize=w.contentSize+b.contentSize||b.contentSize,w.headerSize=w.headerSize+b.headerSize||b.headerSize,w.cookieStats.add(b.cookies),s.contentType(b,w.contentTypes)}c.requests+=1}),function(e,t,n){e.forEach(function(e){e.expireStats=e.expireStats.summarize(),e.lastModifiedStats=e.lastModifiedStats.summarize(),e.cookieStats=e.cookieStats.summarize(),e.totalDomains=Object.keys(e.domains).length,t.includeAssets||(e.assets=[]),n?(e.firstParty.cookieStats=e.firstParty.cookieStats.summarize(),e.thirdParty.cookieStats=e.thirdParty.cookieStats.summarize()):(e.firstParty={},e.thirdParty={})})}(h,t,n),e.log.pages[0]._meta?i.addMetrics(e,h):"WebPagetest"===e.log.creator.name&&o.addMetrics(e,h),h}}},{"./collect":1,"./sitespeed":4,"./statistics":5,"./util":6,"./webpagetest":7}],4:[function(e,t,n){"use strict";t.exports={addMetrics:function(e,t){for(var n=0;n<e.log.pages.length;n++){var r=e.log.pages[n],s=t[n];if(s){for(var i=0,o=Object.keys(r._meta);i<o.length;i++){var a=o[i];s.meta[a]=r._meta[a]}s.visualMetrics=r._visualMetrics,s.meta.title=r.title,r._cpu&&(s.cpu=r._cpu)}}}}},{}],5:[function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.values=[],this.total=0}var t,n,s;return t=e,(n=[{key:"add",value:function(e){return this.values.push(e),this.total+=e,this}},{key:"summarize",value:function(){var e=this.values;if(0!==e.length){e.sort(function(e,t){return e-t});var t,n=Math.floor(e.length/2);return t=e.length%2==0?Number(((e[n]+e[n-1])/2).toFixed(0)):Number(e[n].toFixed(0)),{min:Number(e[0].toFixed(0)),median:t,max:Number(e[e.length-1].toFixed(0)),total:Number(this.total.toFixed(0)),values:e.length}}}}])&&r(t.prototype,n),s&&r(t,s),e}();t.exports={Statistics:s}},{}],6:[function(e,t,n){"use strict";var r=e("url"),s=[[/^text\/html/,"html"],[/^text\/plain/,"plain"],[/^text\/css/,"css"],[/^text\/xml/,"xml"],[/javascript/,"javascript"],[/flash/,"flash"],[/^image\/x-icon/,"favicon"],[/^image\/vnd.microsoft.icon/,"favicon"],[/svg/,"svg"],[/^image/,"image"],[/^application\/.*font/,"font"],[/^font\/.*/,"font"],[/^application\/json/,"json"],[/^application\/xml/,"xml"],[/^application\/pdf/,"pdf"],[/^audio\/.*/,"audio"],[/^video\/.*/,"video"],[/^application\/ocsp-response/,"oscp"],[/.*/,"other"]];t.exports={getContentType:function(e){return s.find(function(t){return t[0].test(e)})[1]},getHTTPVersion:function(e){return"h2"===e||"HTTP/2.0"===e?"HTTP/2.0":e.indexOf("spdy")>-1?e.toUpperCase():""===e?"Unknown":e.toUpperCase()},getConnectionType:function(e){return"h2"===e||"HTTP/2.0"===e?"h2":e.indexOf("spdy")>-1?"spdy":""===e?"Unknown":"h1"},getHostname:function(e){return e&&r.parse(e).hostname||""},getMainDomain:function(e){var t=e;if(null!=e){var n=e.split(".").reverse();null!=n&&n.length>1&&(t=n[1]+"."+n[0],-1!=e.toLowerCase().indexOf(".co.uk")&&n.length>2&&(t=n[2]+"."+t))}return t.split(".")[0]},getFullyLoaded:function(e,t,n){var r=Array.from(t);r=Array.from(r.filter(function(t){return t.pageref===e}));var s=0,i=!0,o=!1,a=void 0;try{for(var h,c=r[Symbol.iterator]();!(i=(h=c.next()).done);i=!0){var u=h.value,l=new Date(u.startedDateTime).getTime()+u.time-new Date(n).getTime();l>s&&(s=l)}}catch(e){o=!0,a=e}finally{try{i||null==c.return||c.return()}finally{if(o)throw a}}return s},getDocumentRequests:function(e,t){var n=Array.from(e);t&&(n=Array.from(e.filter(function(e){return e.pageref===t})));var r,s=[];do{r=n.shift(),s.push(r)}while(r.response.redirectURL);return s}}},{url:12}],7:[function(e,t,n){"use strict";t.exports={addMetrics:function(e,t){for(var n=function(n){var r=e.log.pages[n],s=t[n];if(s){s.visualMetrics={},r._lastVisualChange&&(s.visualMetrics.LastVisualChange=r._lastVisualChange),r._SpeedIndex&&(s.visualMetrics.SpeedIndex=r._SpeedIndex),r.pageTimings._startRender&&(s.visualMetrics.FirstVisualChange=r.pageTimings._startRender),r._visualComplete85&&(s.visualMetrics.VisualComplete85=r._visualComplete85),s.meta.title=r.title;var i=Object.keys(r).filter(function(e){return 0===e.indexOf("_cpu")}).reduce(function(e,t){return e[t.split(".")[1]]=r[t],e},{});Object.keys(i).length>0&&(s.cpu={},s.cpu.events=i)}},r=0;r<e.log.pages.length;r++)n(r)}}},{}],8:[function(e,t,n){(function(e){!function(r){var s="object"==typeof n&&n&&!n.nodeType&&n,i="object"==typeof t&&t&&!t.nodeType&&t,o="object"==typeof e&&e;o.global!==o&&o.window!==o&&o.self!==o||(r=o);var a,h,c=2147483647,u=36,l=1,f=26,p=38,d=700,m=72,g=128,v="-",y=/^xn--/,S=/[^\x20-\x7E]/,b=/[\x2E\u3002\uFF0E\uFF61]/g,x={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},w=u-l,z=Math.floor,T=String.fromCharCode;function C(e){throw new RangeError(x[e])}function O(e,t){for(var n=e.length,r=[];n--;)r[n]=t(e[n]);return r}function j(e,t){var n=e.split("@"),r="";return n.length>1&&(r=n[0]+"@",e=n[1]),r+O((e=e.replace(b,".")).split("."),t).join(".")}function q(e){for(var t,n,r=[],s=0,i=e.length;s<i;)(t=e.charCodeAt(s++))>=55296&&t<=56319&&s<i?56320==(64512&(n=e.charCodeAt(s++)))?r.push(((1023&t)<<10)+(1023&n)+65536):(r.push(t),s--):r.push(t);return r}function k(e){return O(e,function(e){var t="";return e>65535&&(t+=T((e-=65536)>>>10&1023|55296),e=56320|1023&e),t+=T(e)}).join("")}function A(e,t){return e+22+75*(e<26)-((0!=t)<<5)}function L(e,t,n){var r=0;for(e=n?z(e/d):e>>1,e+=z(e/t);e>w*f>>1;r+=u)e=z(e/w);return z(r+(w+1)*e/(e+p))}function M(e){var t,n,r,s,i,o,a,h,p,d,y,S=[],b=e.length,x=0,w=g,T=m;for((n=e.lastIndexOf(v))<0&&(n=0),r=0;r<n;++r)e.charCodeAt(r)>=128&&C("not-basic"),S.push(e.charCodeAt(r));for(s=n>0?n+1:0;s<b;){for(i=x,o=1,a=u;s>=b&&C("invalid-input"),((h=(y=e.charCodeAt(s++))-48<10?y-22:y-65<26?y-65:y-97<26?y-97:u)>=u||h>z((c-x)/o))&&C("overflow"),x+=h*o,!(h<(p=a<=T?l:a>=T+f?f:a-T));a+=u)o>z(c/(d=u-p))&&C("overflow"),o*=d;T=L(x-i,t=S.length+1,0==i),z(x/t)>c-w&&C("overflow"),w+=z(x/t),x%=t,S.splice(x++,0,w)}return k(S)}function P(e){var t,n,r,s,i,o,a,h,p,d,y,S,b,x,w,O=[];for(S=(e=q(e)).length,t=g,n=0,i=m,o=0;o<S;++o)(y=e[o])<128&&O.push(T(y));for(r=s=O.length,s&&O.push(v);r<S;){for(a=c,o=0;o<S;++o)(y=e[o])>=t&&y<a&&(a=y);for(a-t>z((c-n)/(b=r+1))&&C("overflow"),n+=(a-t)*b,t=a,o=0;o<S;++o)if((y=e[o])<t&&++n>c&&C("overflow"),y==t){for(h=n,p=u;!(h<(d=p<=i?l:p>=i+f?f:p-i));p+=u)w=h-d,x=u-d,O.push(T(A(d+w%x,0))),h=z(w/x);O.push(T(A(h,0))),i=L(n,b,r==s),n=0,++r}++n,++t}return O.join("")}if(a={version:"1.4.1",ucs2:{decode:q,encode:k},decode:M,encode:P,toASCII:function(e){return j(e,function(e){return S.test(e)?"xn--"+P(e):e})},toUnicode:function(e){return j(e,function(e){return y.test(e)?M(e.slice(4).toLowerCase()):e})}},s&&i)if(t.exports==s)i.exports=a;else for(h in a)a.hasOwnProperty(h)&&(s[h]=a[h]);else r.punycode=a}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],9:[function(e,t,n){"use strict";function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.exports=function(e,t,n,i){t=t||"&",n=n||"=";var o={};if("string"!=typeof e||0===e.length)return o;var a=/\+/g;e=e.split(t);var h=1e3;i&&"number"==typeof i.maxKeys&&(h=i.maxKeys);var c=e.length;h>0&&c>h&&(c=h);for(var u=0;u<c;++u){var l,f,p,d,m=e[u].replace(a,"%20"),g=m.indexOf(n);g>=0?(l=m.substr(0,g),f=m.substr(g+1)):(l=m,f=""),p=decodeURIComponent(l),d=decodeURIComponent(f),r(o,p)?s(o[p])?o[p].push(d):o[p]=[o[p],d]:o[p]=d}return o};var s=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},{}],10:[function(e,t,n){"use strict";var r=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};t.exports=function(e,t,n,a){return t=t||"&",n=n||"=",null===e&&(e=void 0),"object"==typeof e?i(o(e),function(o){var a=encodeURIComponent(r(o))+n;return s(e[o])?i(e[o],function(e){return a+encodeURIComponent(r(e))}).join(t):a+encodeURIComponent(r(e[o]))}).join(t):a?encodeURIComponent(r(a))+n+encodeURIComponent(r(e)):""};var s=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};function i(e,t){if(e.map)return e.map(t);for(var n=[],r=0;r<e.length;r++)n.push(t(e[r],r));return n}var o=Object.keys||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}},{}],11:[function(e,t,n){"use strict";n.decode=n.parse=e("./decode"),n.encode=n.stringify=e("./encode")},{"./decode":9,"./encode":10}],12:[function(e,t,n){"use strict";var r=e("punycode"),s=e("./util");function i(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}n.parse=S,n.resolve=function(e,t){return S(e,!1,!0).resolve(t)},n.resolveObject=function(e,t){return e?S(e,!1,!0).resolveObject(t):t},n.format=function(e){s.isString(e)&&(e=S(e));return e instanceof i?e.format():i.prototype.format.call(e)},n.Url=i;var o=/^([a-z0-9.+-]+:)/i,a=/:[0-9]*$/,h=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,c=["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r","\n","\t"]),u=["'"].concat(c),l=["%","/","?",";","#"].concat(u),f=["/","?","#"],p=/^[+a-z0-9A-Z_-]{0,63}$/,d=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,m={javascript:!0,"javascript:":!0},g={javascript:!0,"javascript:":!0},v={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},y=e("querystring");function S(e,t,n){if(e&&s.isObject(e)&&e instanceof i)return e;var r=new i;return r.parse(e,t,n),r}i.prototype.parse=function(e,t,n){if(!s.isString(e))throw new TypeError("Parameter 'url' must be a string, not "+typeof e);var i=e.indexOf("?"),a=-1!==i&&i<e.indexOf("#")?"?":"#",c=e.split(a);c[0]=c[0].replace(/\\/g,"/");var S=e=c.join(a);if(S=S.trim(),!n&&1===e.split("#").length){var b=h.exec(S);if(b)return this.path=S,this.href=S,this.pathname=b[1],b[2]?(this.search=b[2],this.query=t?y.parse(this.search.substr(1)):this.search.substr(1)):t&&(this.search="",this.query={}),this}var x=o.exec(S);if(x){var w=(x=x[0]).toLowerCase();this.protocol=w,S=S.substr(x.length)}if(n||x||S.match(/^\/\/[^@\/]+@[^@\/]+/)){var z="//"===S.substr(0,2);!z||x&&g[x]||(S=S.substr(2),this.slashes=!0)}if(!g[x]&&(z||x&&!v[x])){for(var T,C,O=-1,j=0;j<f.length;j++){-1!==(q=S.indexOf(f[j]))&&(-1===O||q<O)&&(O=q)}-1!==(C=-1===O?S.lastIndexOf("@"):S.lastIndexOf("@",O))&&(T=S.slice(0,C),S=S.slice(C+1),this.auth=decodeURIComponent(T)),O=-1;for(j=0;j<l.length;j++){var q;-1!==(q=S.indexOf(l[j]))&&(-1===O||q<O)&&(O=q)}-1===O&&(O=S.length),this.host=S.slice(0,O),S=S.slice(O),this.parseHost(),this.hostname=this.hostname||"";var k="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!k)for(var A=this.hostname.split(/\./),L=(j=0,A.length);j<L;j++){var M=A[j];if(M&&!M.match(p)){for(var P="",I=0,D=M.length;I<D;I++)M.charCodeAt(I)>127?P+="x":P+=M[I];if(!P.match(p)){var _=A.slice(0,j),U=A.slice(j+1),F=M.match(d);F&&(_.push(F[1]),U.unshift(F[2])),U.length&&(S="/"+U.join(".")+S),this.hostname=_.join(".");break}}}this.hostname.length>255?this.hostname="":this.hostname=this.hostname.toLowerCase(),k||(this.hostname=r.toASCII(this.hostname));var R=this.port?":"+this.port:"",N=this.hostname||"";this.host=N+R,this.href+=this.host,k&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==S[0]&&(S="/"+S))}if(!m[w])for(j=0,L=u.length;j<L;j++){var E=u[j];if(-1!==S.indexOf(E)){var H=encodeURIComponent(E);H===E&&(H=escape(E)),S=S.split(E).join(H)}}var V=S.indexOf("#");-1!==V&&(this.hash=S.substr(V),S=S.slice(0,V));var $=S.indexOf("?");if(-1!==$?(this.search=S.substr($),this.query=S.substr($+1),t&&(this.query=y.parse(this.query)),S=S.slice(0,$)):t&&(this.search="",this.query={}),S&&(this.pathname=S),v[w]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){R=this.pathname||"";var W=this.search||"";this.path=R+W}return this.href=this.format(),this},i.prototype.format=function(){var e=this.auth||"";e&&(e=(e=encodeURIComponent(e)).replace(/%3A/i,":"),e+="@");var t=this.protocol||"",n=this.pathname||"",r=this.hash||"",i=!1,o="";this.host?i=e+this.host:this.hostname&&(i=e+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(i+=":"+this.port)),this.query&&s.isObject(this.query)&&Object.keys(this.query).length&&(o=y.stringify(this.query));var a=this.search||o&&"?"+o||"";return t&&":"!==t.substr(-1)&&(t+=":"),this.slashes||(!t||v[t])&&!1!==i?(i="//"+(i||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):i||(i=""),r&&"#"!==r.charAt(0)&&(r="#"+r),a&&"?"!==a.charAt(0)&&(a="?"+a),t+i+(n=n.replace(/[?#]/g,function(e){return encodeURIComponent(e)}))+(a=a.replace("#","%23"))+r},i.prototype.resolve=function(e){return this.resolveObject(S(e,!1,!0)).format()},i.prototype.resolveObject=function(e){if(s.isString(e)){var t=new i;t.parse(e,!1,!0),e=t}for(var n=new i,r=Object.keys(this),o=0;o<r.length;o++){var a=r[o];n[a]=this[a]}if(n.hash=e.hash,""===e.href)return n.href=n.format(),n;if(e.slashes&&!e.protocol){for(var h=Object.keys(e),c=0;c<h.length;c++){var u=h[c];"protocol"!==u&&(n[u]=e[u])}return v[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n}if(e.protocol&&e.protocol!==n.protocol){if(!v[e.protocol]){for(var l=Object.keys(e),f=0;f<l.length;f++){var p=l[f];n[p]=e[p]}return n.href=n.format(),n}if(n.protocol=e.protocol,e.host||g[e.protocol])n.pathname=e.pathname;else{for(var d=(e.pathname||"").split("/");d.length&&!(e.host=d.shift()););e.host||(e.host=""),e.hostname||(e.hostname=""),""!==d[0]&&d.unshift(""),d.length<2&&d.unshift(""),n.pathname=d.join("/")}if(n.search=e.search,n.query=e.query,n.host=e.host||"",n.auth=e.auth,n.hostname=e.hostname||e.host,n.port=e.port,n.pathname||n.search){var m=n.pathname||"",y=n.search||"";n.path=m+y}return n.slashes=n.slashes||e.slashes,n.href=n.format(),n}var S=n.pathname&&"/"===n.pathname.charAt(0),b=e.host||e.pathname&&"/"===e.pathname.charAt(0),x=b||S||n.host&&e.pathname,w=x,z=n.pathname&&n.pathname.split("/")||[],T=(d=e.pathname&&e.pathname.split("/")||[],n.protocol&&!v[n.protocol]);if(T&&(n.hostname="",n.port=null,n.host&&(""===z[0]?z[0]=n.host:z.unshift(n.host)),n.host="",e.protocol&&(e.hostname=null,e.port=null,e.host&&(""===d[0]?d[0]=e.host:d.unshift(e.host)),e.host=null),x=x&&(""===d[0]||""===z[0])),b)n.host=e.host||""===e.host?e.host:n.host,n.hostname=e.hostname||""===e.hostname?e.hostname:n.hostname,n.search=e.search,n.query=e.query,z=d;else if(d.length)z||(z=[]),z.pop(),z=z.concat(d),n.search=e.search,n.query=e.query;else if(!s.isNullOrUndefined(e.search)){if(T)n.hostname=n.host=z.shift(),(k=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@"))&&(n.auth=k.shift(),n.host=n.hostname=k.shift());return n.search=e.search,n.query=e.query,s.isNull(n.pathname)&&s.isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n}if(!z.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n;for(var C=z.slice(-1)[0],O=(n.host||e.host||z.length>1)&&("."===C||".."===C)||""===C,j=0,q=z.length;q>=0;q--)"."===(C=z[q])?z.splice(q,1):".."===C?(z.splice(q,1),j++):j&&(z.splice(q,1),j--);if(!x&&!w)for(;j--;j)z.unshift("..");!x||""===z[0]||z[0]&&"/"===z[0].charAt(0)||z.unshift(""),O&&"/"!==z.join("/").substr(-1)&&z.push("");var k,A=""===z[0]||z[0]&&"/"===z[0].charAt(0);T&&(n.hostname=n.host=A?"":z.length?z.shift():"",(k=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@"))&&(n.auth=k.shift(),n.host=n.hostname=k.shift()));return(x=x||n.host&&z.length)&&!A&&z.unshift(""),z.length?n.pathname=z.join("/"):(n.pathname=null,n.path=null),s.isNull(n.pathname)&&s.isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=e.auth||n.auth,n.slashes=n.slashes||e.slashes,n.href=n.format(),n},i.prototype.parseHost=function(){var e=this.host,t=a.exec(e);t&&(":"!==(t=t[0])&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)}},{"./util":13,punycode:8,querystring:11}],13:[function(e,t,n){"use strict";t.exports={isString:function(e){return"string"==typeof e},isObject:function(e){return"object"==typeof e&&null!==e},isNull:function(e){return null===e},isNullOrUndefined:function(e){return null==e}}},{}]},{},[3])(3)});

/*! github.com/micmro/PerfCascade Version:2.7.0 (07/10/2019) */

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).perfCascade=e()}}(function(){return function o(a,s,l){function u(t,e){if(!s[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(d)return d(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var i=s[t]={exports:{}};a[t][0].call(i.exports,function(e){return u(a[t][1][e]||e)},i,i.exports,o,a,s,l)}return s[t].exports}for(var d="function"==typeof require&&require,e=0;e<l.length;e++)u(l[e]);return u}({1:[function(e,t,n){"use strict";function r(e,t,n){t in e.style?e.style[t]=n:console.warn(new Error("Trying to set non-existing style "+t+" = "+n+" on a <"+e.tagName.toLowerCase()+">."))}function i(e,t,n){t in e||console.warn(new Error("Trying to set non-existing attribute "+t+" = "+n+" on a <"+e.tagName.toLowerCase()+">.")),e.setAttributeNS("",t,n)}function o(t,n){Object.keys(n).forEach(function(e){r(t,e,n[e].toString())})}Object.defineProperty(n,"__esModule",{value:!0}),n.addClass=function(e,t){var n=e.classList;return n?t.split(" ").forEach(function(e){return n.add(e)}):e.setAttribute("class",e.getAttribute("class")+" "+t),e},n.removeClass=function(e,t){var n=e.classList;return n?n.remove(t):e.setAttribute("class",(e.getAttribute("class")||"").replace(new RegExp("(\\s|^)"+t+"(\\s|$)","g"),"$2")),e},n.getParentByClassName=function(e,t){if("function"==typeof e.closest)return e.closest("."+t);for(;e;){if(e.classList.contains(t))return e;e=e.parentElement}return null},n.removeChildren=function(e){for(;e.hasChildNodes();)e.removeChild(e.lastChild);return e},n.getLastItemOfNodeList=function(e){if(e&&0!==e.length)return e.item(e.length-1)},n.forEachNodeList=function(e,t){Array.prototype.forEach.call(e,t)},n.safeSetStyle=r,n.safeSetAttribute=i,n.safeSetStyles=o,n.safeSetAttributes=function(t,n){Object.keys(n).forEach(function(e){i(t,e,n[e].toString())})},n.makeHtmlEl=function(){var e=document.createElement("html");return e.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns","http://www.w3.org/2000/xmlns/"),e},n.makeBodyEl=function(e,t){void 0===e&&(e={}),void 0===t&&(t="");var n=document.createElement("body");return n.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),o(n,e),n.innerHTML=t,n}},{}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(t){return function(e){return e.name.toLowerCase()===t}};n.hasHeader=function(e,t){var n=i(t.toLowerCase());return e.some(n)};var o=!!Array.prototype.find;n.getHeader=function(e,t){var n,r=i(t.toLowerCase());return(n=o?e.find(r):e.map(r).pop())?n.value:void 0},n.getHeaders=function(e,t){var n=i(t.toLowerCase());return e.filter(n).map(function(e){return[t,e.value]})}},{}],3:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i,o,a,s,l,u,d,c,p,h,f,v,m,g,y=e("./svg"),b=function(e,t,n,r,i,o){var a=y.newSvg("",{x:e,y:t}),s=y.newG("icon "+r,{transform:"scale("+i+")"});return s.appendChild(o),s.appendChild(y.newTitle(n)),a.appendChild(s),a};function w(e,t,n,r){if(void 0===r&&(r=1),void 0===u){u=y.newPath("M6 6q0 .75-.525 1.275Q4.95 7.8 4.2 7.8q-.75 0-1.275-.525Q2.4 6.75 2.4\n  6q0-.75.525-1.275Q3.45 4.2 4.2 4.2q.75 0 1.275.525Q6 5.25 6 6zm9.6 3.6v4.2H2.4V12l3-3\n  1.5 1.5 4.8-4.8zm.9-6.6h-15q-.122 0-.21.09-.09.088-.09.21v11.4q0\n  .122.09.21.088.09.21.09h15q.122 0 .21-.09.09-.088.09-.21V3.3q0-.122-.09-.21Q16.623\n  3 16.5 3zm1.5.3v11.4q0 .62-.44 1.06-.44.44-1.06.44h-15q-.62 0-1.06-.44Q0 15.32 0\n  14.7V3.3q0-.62.44-1.06.44-.44 1.06-.44h15q.62 0 1.06.44.44.44.44 1.06z")}return b(e,t,n,"icon-image",r,u.cloneNode(!1))}function C(e,t,n,r){if(void 0===r&&(r=1),void 0===p){p=y.newPath("M6 6q0 .75-.525 1.275Q4.95 7.8 4.2 7.8q-.75 0-1.275-.525Q2.4 6.75 2.4\n  6q0-.75.525-1.275Q3.45 4.2 4.2 4.2q.75 0 1.275.525Q6 5.25 6 6zm9.6 3.6v4.2H2.4V12l3-3\n  1.5 1.5 4.8-4.8zm.9-6.6h-15q-.122 0-.21.09-.09.088-.09.21v11.4q0\n  .122.09.21.088.09.21.09h15q.122 0 .21-.09.09-.088.09-.21V3.3q0-.122-.09-.21Q16.623\n  3 16.5 3zm1.5.3v11.4q0 .62-.44 1.06-.44.44-1.06.44h-15q-.62 0-1.06-.44Q0 15.32 0\n  14.7V3.3q0-.62.44-1.06.44-.44 1.06-.44h15q.62 0 1.06.44.44.44.44 1.06z")}return b(e,t,n,"icon-warning",r,p.cloneNode(!1))}n.noTls=function(e,t,n,r){void 0===r&&(r=1),void 0===i&&(i=y.newPath("M18 6.216v2.77q0 .28-.206.486-.205.206-.486.206h-.693q-.28 0-.486-.206-.21-.205-.21\n  -.487v-2.77q0-1.145-.81-1.957-.813-.81-1.96-.81-1.146 0-1.957.81-.81.812-.81 1.958v2.077h1.037q.434\n  0 .737.303.302.303.302.736v6.23q0 .433-.305.736t-.737.303H1.038q-.433 0-.736-.3Q0 15.996 0\n  15.56V9.33q0-.433.303-.736t.735-.303h7.27V6.218q0-2 1.422-3.423 1.423-1.423 3.424-1.423 2\n  0 3.424 1.424Q18 4.214 18 6.216"));return b(e,t,n,"icon-no-tls",r,i.cloneNode(!1))},n.err3xx=function(e,t,n,r){void 0===r&&(r=1),void 0===o&&(o=y.newPath("M17 2.333V7q0 .27-.198.47-.198.197-.47.197h-4.665q-.438 0-.615-.417-.177-.406.146-.72l1.437-1.436Q11.095\n  3.667 9 3.667q-1.083 0-2.068.422-.984.42-1.703 1.14-.72.715-1.14 1.7-.426.984-.426 2.07 0 1.08.422 2.065.42.984\n  1.14 1.703.718.72 1.702 1.14.984.422 2.067.422 1.24 0 2.344-.54 1.104-.543 1.864-1.533.073-.105.24-.126.146 0\n  .26.095l1.427 1.436q.095.084.1.214.006.13-.08.234-1.133 1.376-2.75 2.13Q10.793 17 9 17q-1.625\n  0-3.104-.635-1.48-.636-2.552-1.71-1.073-1.072-1.71-2.55Q1 10.625 1 9t.635-3.104q.636-1.48 1.71-2.552\n  1.072-1.073 2.55-1.71Q7.375 1 9 1q1.53 0 2.964.578 1.432.578 2.546\n  1.63l1.355-1.343q.302-.323.73-.146.405.173.405.61z"));return b(e,t,n,"icon-redirect",r,o.cloneNode(!1))},n.err4xx=function(e,t,n,r){return void 0===r&&(r=1),C(e,t,n,r)},n.err5xx=function(e,t,n,r){return void 0===r&&(r=1),C(e,t,n,r)},n.plain=function(e,t,n,r){void 0===r&&(r=1),void 0===a&&(a=y.newPath("M15.247 4.393q.25.25.43.678.177.43.177.79v10.287q0\n  .357-.25.607t-.607.25h-12q-.357 0-.607-.25t-.25-.606V1.858q0-.358.25-.608T2.997 1h8q.357 0\n  .786.18.428.177.678.427zm-3.964-2.18V5.57h3.357q-.09-.256-.196-.364L11.65 2.41q-.108-.106-.367\n  -.196zm3.428 13.644V6.714H11q-.357 0-.607-.25t-.25-.607V2.143h-6.86v13.714H14.71zM5.57\n  8.143q0-.125.08-.205.08-.08.204-.08h6.286q.125 0 .205.08.08.08.08.205v.57q0 .126-.08.207-.08.08\n  -.205.08H5.854q-.125 0-.205-.08-.08-.08-.08-.206v-.57zm6.57 2q.125 0 .205.08.08.08.08.206V11q0\n  .125-.08.205-.08.08-.205.08H5.854q-.125 0-.205-.08-.08-.08-.08-.205v-.57q0-.126.08-.207.08-.08.2\n  -.08h6.286zm0 2.286q.125 0 .205.08.08.08.08.2v.572q0 .125-.08.205-.08.08-.205.08H5.854q-.125 0-.205\n  -.08-.08-.08-.08-.205v-.572q0-.124.08-.204.08-.08.2-.08h6.286z"));return b(e,t,n,"icon-plain",r,a.cloneNode(!1))},n.other=function(e,t,n,r){void 0===r&&(r=1),void 0===s&&(s=y.newPath("M10.8 13.5v3q0 .2-.15.35-.15.15-.35.15h-3q-.2 0-.35-.15-.15-.15-.15-.35v-3q0-.2.15-.35.15\n  -.15.35-.15h3q.2 0 .35.15.15.15.15.35zM14.75 6q0 .675-.193 1.262-.193.588-.437.957-.244.365\n  -.688.74-.443.375-.718.543-.275.17-.763.444-.51.286-.852.81-.344.526-.344.84 0 .21-.15.405-.15.194\n  -.35.194h-3q-.186 0-.318-.23-.13-.234-.13-.47v-.564q0-1.037.812-1.956.812-.917 1.787-1.355.74-.336\n  1.05-.7.314-.362.314-.95 0-.524-.583-.924-.58-.4-1.343-.4-.814 0-1.35.362-.44.312-1.34 1.437-.16.2\n  -.386.2-.15 0-.313-.1L3.4 4.987q-.16-.124-.193-.312-.03-.188.07-.35Q5.277 1 9.077 1q1 0 2.01.387\n  1.01.388 1.825 1.038.812.65 1.325 1.594.51.94.51 1.98z"));return b(e,t,n,"icon-other",r,s.cloneNode(!1))},n.javascript=function(e,t,n,r){void 0===r&&(r=1),void 0===l&&(l=y.newPath("M13.516 2.9c-2.766 0-4.463 1.522-4.463 3.536 0 1.733 1.295 2.82 3.256 3.52\n  1.413.49 1.973.926 1.973 1.644 0 .787-.647 1.296-1.873 1.296-1.137 0-2.26-.368-2.96-.736l-.54\n  2.19c.665.367 1.996.734 3.344.734 3.238 0 4.744-1.68 4.744-3.658\n  0-1.68-.966-2.767-3.05-3.537-1.54-.6-2.186-.93-2.186-1.68 0-.6.56-1.14 1.714-1.14\n  1.137 0 1.996.33 2.45.56l.596-2.138c-.7-.332-1.663-.596-3.01-.596zm-9.032.192v7.44c0\n  1.822-.702 2.33-1.822 2.33-.525 0-.997-.09-1.365-.212L1 14.805c.525.175 1.33.28 1.96.28\n  2.574 0 4.185-1.173 4.185-4.534V3.097h-2.66z"));return b(e,t,n,"icon-js",r,l.cloneNode(!1))},n.image=w,n.svg=function(e,t,n,r){return void 0===r&&(r=1),w(e,t,n,r)},n.html=function(e,t,n,r){void 0===r&&(r=1),void 0===d&&(d=y.newPath("M5.626 13.31l-.492.492q-.098.098-.226.098t-.226-.098L.098 9.22Q0 9.12 0\n  8.99q0-.127.098-.226L4.682 4.18q.098-.097.226-.097t.226.098l.492.49q.1.1.1.23t-.1.23L1.76\n  8.99l3.866 3.866q.1.098.1.226t-.1.226zM11.44 2.815l-3.67\n  12.7q-.04.127-.152.19-.113.065-.23.026l-.61-.162q-.13-.04-.193-.152-.064-.112-.024-.24l3.67-12.698q.04\n  -.128.157-.192.113-.064.23-.025l.61.167q.13.04.193.152.063.113.023.24zM17.9\n  9.22l-4.582 4.58q-.098.098-.226.098t-.226-.098l-.492-.492q-.1-.098-.1-.226t.1-.226L16.24\n  8.99l-3.867-3.865q-.1-.098-.1-.226t.1-.23l.492-.49q.098-.1.226-.1t.23.1l4.58 4.583q.1.1.1.226 0 .13-.1.23z"));return b(e,t,n,"icon-html",r,d.cloneNode(!1))},n.css=function(e,t,n,r){void 0===r&&(r=1),void 0===c&&(c=y.newPath("M15.436.99q.625 0 1.095.416.47.415.47 1.04 0 .564-.4 1.35-2.97 5.624-4.16 6.724-.865.814\n  -1.946.814-1.127 0-1.935-.827-.81-.827-.81-1.962 0-1.144.822-1.895l5.705-5.175Q14.8.99\n  15.435.99zM7.31 10.232q.35.68.953 1.162.603.483 1.345.68l.01.634q.035 1.904-1.16 3.102-1.192\n  1.198-3.114 1.198-1.1 0-1.948-.416-.85-.415-1.364-1.14-.514-.723-.773-1.635Q1 12.905 1\n  11.85l.366.268q.304.224.555.398.25.175.53.327.277.15.41.15.368 0 .493-.33.224-.59.515-1.005.29\n  -.415.62-.68.332-.263.788-.424.455-.16.92-.228.465-.066 1.118-.094z"));return b(e,t,n,"icon-css",r,c.cloneNode(!1))},n.warning=C,n.error=function(e,t,n,r){void 0===r&&(r=1),void 0===h&&(h=y.newPath("M9 1q2.177 0 4.016 1.073 1.838 1.073 2.91 2.91Q17 6.823 17 9q0 2.177-1.073 4.016-1.073\n  1.838-2.91 2.91Q11.177 17 9 17q-2.177 0-4.016-1.073-1.838-1.073-2.91-2.91Q1 11.177 1 9q0-2.177 1.073-4.016\n  1.073-1.838 2.91-2.91Q6.823 1 9 1zm1.333 12.99v-1.98q0-.145-.093-.244-.094-.1-.23-.1h-2q-.135 0-.24.105\n  -.103.106-.103.24v1.98q0 .136.104.24.106.104.24.104h2q.137 0 .23-.1.094-.098.094-.243zm-.02-3.584l.187\n  -6.468q0-.125-.104-.188-.104-.084-.25-.084H7.854q-.146 0-.25.084-.104.062-.104.188l.177 6.468q0\n  .104.104.183.106.076.25.076h1.93q.146 0 .245-.078.1-.08.11-.184z"));return b(e,t,n,"icon-no-gzip",r,h.cloneNode(!1))},n.font=function(e,t,n,r){void 0===r&&(r=1),void 0===f&&(f=y.newPath("M7.97 5.754L6.338 10.08q.317 0 1.312.02.994.02 1.542.02.183 0 .548-.02-.836-2.432-1.77\n  -4.345zM1 16.38l.02-.76q.22-.068.538-.12.317-.053.548-.102.23-.048.476-.14.245-.09.428-.278.182\n  -.187.298-.485l2.28-5.923 2.69-6.962H9.51q.077.135.105.202l1.972 4.615q.317.75 1.02 2.476.7 1.726\n  1.095 2.64.144.327.558 1.39.413 1.062.692 1.62.192.432.336.547.183.145.847.284.663.14.807.197.058.37.058.55\n  0 .04-.005.13t-.005.128q-.605 0-1.827-.076-1.22-.08-1.836-.08-.73 0-2.067.07-1.337.067-1.712.076 0-.412.04\n  -.75l1.258-.27q.01 0 .12-.022l.15-.033q.038-.01.14-.044.1-.034.143-.06l.1-.08q.06-.048.082-.106.024-.056.024\n  -.133 0-.152-.298-.926t-.693-1.71q-.392-.93-.402-.96l-4.325-.02q-.25.56-.734 1.88-.487 1.32-.487 1.56 0\n  .213.136.362.134.15.418.235.285.087.467.13.185.044.55.08.366.04.395.04.01.183.01.558 0 .087-.02.26-.558\n  0-1.678-.095-1.12-.098-1.678-.098-.08 0-.26.04-.18.037-.208.037-.77.136-1.808.136Z"));return b(e,t,n,"icon-font",r,f.cloneNode(!1))},n.flash=function(e,t,n,r){void 0===r&&(r=1),void 0===v&&(v=y.newPath("M13.724 4.738q.195.216.076.476L7.96 17.73q-.142.27-.456.27-.043 0-.15-.022-.185-.054-.277\n  -.205-.092-.15-.05-.325l2.132-8.74L4.765 9.8q-.044.01-.13.01-.195 0-.336-.118-.193-.162-.14-.422L6.337.346q.043\n  -.15.173-.25Q6.64 0 6.81 0h3.548q.206 0 .346.135.14.135.14.32 0 .086-.053.194L8.94 5.654l4.285\n  -1.06q.086-.02.13-.02.205 0 .367.16z"));return b(e,t,n,"icon-flash",r,v.cloneNode(!1))},n.video=function(e,t,n,r){void 0===r&&(r=1),void 0===m&&(m=y.newPath("M17 4.107v9.714q0 .38-.348.53-.116.05-.223.05-.25 0-.41-.17l-3.6-3.6v1.48q0 1.067-.757 1.82-.754.756\n  -1.817.756H3.57q-1.06 0-1.816-.753Q1 13.17 1 12.106V5.82q0-1.06.754-1.816.755-.754 1.817-.754h6.29q1.07 0\n  1.82.754.76.755.76 1.817V7.3l3.597-3.59q.16-.17.4-.17.107 0 .22.045.35.153.35.528z"));return b(e,t,n,"icon-video",r,m.cloneNode(!1))},n.audio=function(e,t,n,r){void 0===r&&(r=1),void 0===g&&(g=y.newPath("M8.385 3.756v10.46q0 .252-.183.434-.183.183-.433.183t-.44-.183l-3.2-3.202H1.61q-.25\n  0-.43-.183-.18-.182-.18-.432V7.14q0-.25.182-.432.182-.183.432-.183h2.52l3.202-3.202q.182-.183.432\n  -.183t.43.183q.182.183.182.433zm3.692 5.23q0 .73-.41 1.36-.407.63-1.08.9-.097.048-.24.048-.25 0\n  -.434-.178-.182-.177-.182-.437 0-.21.12-.35.12-.14.28-.24.16-.1.33-.22.166-.12.28-.34.117-.22.117\n  -.55 0-.33-.115-.55-.115-.224-.28-.344-.163-.12-.326-.22-.165-.1-.28-.24-.116-.14-.116-.34 0-.26.183\n  -.44t.43-.176q.146 0 .24.048.676.26 1.08.894.41.636.41 1.367zm2.46 0q0 1.472-.816 2.717t-2.16 1.813q\n  -.12.048-.24.048-.26 0-.44-.183-.18-.18-.18-.43 0-.37.378-.56.54-.28.73-.42.713-.52 1.11-1.302.4\n  -.783.4-1.667 0-.886-.4-1.67-.4-.783-1.11-1.303-.192-.145-.73-.424-.376-.192-.376-.567 0-.25.183\n  -.434.183-.18.433-.18.123 0 .25.047 1.344.567 2.16 1.812.82 1.244.82 2.716zm2.463 0q0 2.212\n  -1.22 4.063-1.222 1.85-3.25 2.72-.126.05-.25.05-.25 0-.434-.19-.183-.183-.183-.433 0-.346.375\n  -.568.068-.04.217-.1.15-.064.216-.1.45-.244.79-.494 1.19-.875 1.85-2.183.67-1.306.67-2.777 0\n  -1.47-.663-2.78-.664-1.304-1.846-2.18-.346-.25-.79-.49-.065-.035-.214-.1-.15-.06-.22-.1\n  -.375-.22-.375-.57 0-.25.183-.43.183-.182.433-.182.123 0 .25.047 2.027.876 3.25 2.727Q17 6.775 17 8.99Z"));return b(e,t,n,"icon-audio",r,g.cloneNode(!1))}},{"./svg":6}],4:[function(e,t,n){"use strict";function r(e,t){var n=0;if(e&&!(e.length<1))for(var r=e.length;n<r;){if(t(e[n],n))return n;n++}}Object.defineProperty(n,"__esModule",{value:!0}),n.contains=function(e,t){return e.some(function(e){return e===t})},n.findIndex=r,n.find=function(e,t){var n=r(e,t);if(void 0!==n)return e[n]},n.resourceUrlFormatter=function(e,t){if(e.length<t)return e.replace(/https?:\/\//,"");var n,r,i,o=(n=e,r=RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?"),{authority:(i=n.match(r)||[])[4],fragment:i[9],path:i[5],query:i[7],scheme:i[2]});if((o.authority+o.path).length<t)return o.authority+o.path;var a=Math.floor(t/2)-3,s=Math.floor(t/2)-5,l=o.path.split("/");return o.authority.length>a?o.authority.substr(0,a)+"..."+l[l.length-1].substr(-s):o.authority+"..."+l[l.length-1].substr(-s)},n.roundNumber=function(e,t){return void 0===t&&(t=2),Math.round(e*Math.pow(10,t))/Math.pow(10,t)},n.isInStatusCodeRange=function(e,t,n){return t<=e&&e<=n};var i=/[^a-z-]/g;n.toCssClass=function(e){return e.toLowerCase().replace(i,"")},n.pluralize=function(e,t){return e+(1<t?"s":"")},n.isTabUp=function(e){return 9===e.which&&e.shiftKey},n.isTabDown=function(e){return 9===e.which&&!e.shiftKey}},{}],5:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e("./misc");function i(e){if("function"==typeof e.toString)return e.toString();throw TypeError("Can't convert type "+typeof e+" to string")}function o(e,t){var n=function(e){return t(e)?e:void 0};if("string"!=typeof e)return n(e);var r=parseInt(e,10);return isFinite(r)?n(r):void 0}n.parseAndFormat=function(e,t,n){if(void 0===n&&(n=i),void 0!==e){var r=t(e);if(void 0!==r)return n(r)}},n.parseNonEmpty=function(e){return 0<e.trim().length?e:void 0},n.parseDate=function(e){var t=new Date(e);if(!isNaN(t.getTime()))return t},n.parseNonNegative=function(e){if(null!=e)return o(e,function(e){return 0<=e})},n.parsePositive=function(e){if(null!=e)return o(e,function(e){return 0<e})},n.formatMilliseconds=function(e){return void 0!==e?r.roundNumber(e,3)+" ms":void 0};n.formatSeconds=function(e){if(void 0!==e){var t=r.roundNumber(e,3)+" s";return 86400<e?t+" (~"+r.roundNumber(e/86400,0)+" days)":3600<e?t+" (~"+r.roundNumber(e/3600,0)+" hours)":60<e?t+" (~"+r.roundNumber(e/60,0)+" minutes)":t}},n.formatDateLocalized=function(e){return void 0!==e?e.toUTCString()+"<br/>(local time: "+e.toLocaleString()+")":void 0};n.formatBytes=function(e){if(void 0===e)return"";var t=e+" bytes";return 1048576<=e?t+" (~"+r.roundNumber(e/1048576,1)+" MB)":1024<=e?t+" (~"+r.roundNumber(e/1024,0)+" kB)":t};var a={'"':"&quot","&":"&amp","'":"&#039","<":"&lt",">":"&gt"},s=new RegExp(Object.keys(a).join("|"),"g");n.escapeHtml=function(e){if(void 0===e&&(e=""),null==e)return"";if("string"!=typeof e){if("function"!=typeof e.toString)throw TypeError("Invalid parameter");e=e.toString()}return e.replace(s,function(e){return a[e]})};var l=new RegExp("[^-A-Za-z0-9+&@#/%?=~_|!:,.;()]","g");n.sanitizeUrlForLink=function(e){var t=e.replace(l,"_");return 0===t.indexOf("http://")||0===t.indexOf("https://")?t:(console.warn("skipped link, due to potentially unsafe url",e),"")};var u=new RegExp("[^a-zA-Z0-9]","g");function d(e){return"number"==typeof e?e:"string"==typeof e?parseInt(e,10):void 0}n.sanitizeAlphaNumeric=function(e){return e.toString().replace(u,"")},n.toInt=d,n.validateOptions=function(n){var e=function(e){var t=d(n[e]);if(void 0===t)throw TypeError('option "'+e+'" needs to be a number');n[e]=t},t=function(e){n[e]=!!n[e]};return e("leftColumnWidth"),e("rowHeight"),e("selectedPage"),t("showAlignmentHelpers"),t("showIndicatorIcons"),t("showMimeTypeIcon"),n}},{"./misc":4}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var p=e("./dom"),h="http://www.w3.org/2000/svg";function r(e,t){var n=void 0===t?{}:t,r=n.attributes,i=void 0===r?{}:r,o=n.css,a=void 0===o?{}:o,s=n.text,l=void 0===s?"":s,u=n.className,d=void 0===u?"":u,c=document.createElementNS(h,e);return d&&p.addClass(c,d),l&&(c.textContent=l),p.safeSetStyles(c,a),p.safeSetAttributes(c,i),c}function i(e,t,n){return void 0===n&&(n={}),r("svg",{className:e,attributes:t,css:n})}n.newSvg=i,n.newG=function(e,t,n){return void 0===t&&(t={}),void 0===n&&(n={}),r("g",{className:e,attributes:t,css:n})},n.newClipPath=function(e){return r("clipPath",{attributes:{id:e}})},n.newForeignObject=function(e,t,n){return void 0===t&&(t=""),void 0===n&&(n={}),r("foreignObject",{attributes:e,className:t,css:n})},n.newA=function(e){return r("a",{className:e})},n.newRect=function(e,t,n){return void 0===t&&(t=""),void 0===n&&(n={}),r("rect",{attributes:e,className:t,css:n})},n.newLine=function(e,t){return void 0===t&&(t=""),r("line",{className:t,attributes:e})},n.newTitle=function(e){var t=document.createElementNS(h,"title");return t.setAttribute("text",e),t},n.newTextEl=function(e,t,n){return void 0===t&&(t={}),void 0===n&&(n={}),r("text",{text:e,attributes:t,css:n})},n.newPath=function(e){var t=document.createElementNS(h,"path");return t.setAttribute("d",e),t};var o,a,s=function(){void 0===o&&(o=i("water-fall-chart temp",{className:"water-fall-chart temp",width:"9999px"},{left:"0px",position:"absolute",top:"0px",visibility:"hidden","z-index":"99999"}));return void 0===o.parentElement&&window.document.body.appendChild(o),clearTimeout(a),a=setTimeout(function(){o.parentNode.removeChild(o)},500),o};n.getNodeTextWidth=function(e,t){if(void 0===t&&(t=!1),0===(e.textContent||"").length)return 0;var n,r,i=s();t?(r=e.style.textShadow,n=e):((n=e.cloneNode(!0)).setAttribute("x","0"),n.setAttribute("y","0")),n.style.textShadow="0",i.appendChild(n),window.document.body.appendChild(i);var o=n.getComputedTextLength();return t&&void 0!==r&&(e.style.textShadow=r),o}},{"./dom":1}],7:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.makeLegend=function(){var e=document.createElement("ul");return e.className="resource-legend",e.innerHTML='\n        <li class="legend-blocked" title="Time spent in a queue waiting for a network connection.">Blocked</li>\n        <li class="legend-dns" title="DNS resolution time.">DNS</li>\n        <li class="legend-connect" title="Time required to create TCP connection.">Connect</li>\n        <li class="legend-ssl" title="Time required for SSL/TLS negotiation.">SSL (TLS)</li>\n        <li class="legend-send" title="Time required to send HTTP request to the server.">Send</li>\n        <li class="legend-wait" title="Waiting for a response from the server.">Wait</li>\n        <li class="legend-receive"\n        title="Time required to read entire response from the server (or cache).">Receive</li>',e}},{}],8:[function(e,t,n){"use strict";var a=this&&this.__assign||function(){return(a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};Object.defineProperty(n,"__esModule",{value:!0});var s=e("./helpers/parse"),l=e("./legend/legend"),u=e("./paging/paging"),i=e("./transformers/har"),d=e("./waterfall/svg-chart"),c={leftColumnWidth:25,legendHolder:void 0,onParsed:void 0,pageSelector:void 0,rowHeight:23,selectedPage:0,showAlignmentHelpers:!0,showIndicatorIcons:!0,showMimeTypeIcon:!0},o={showUserTiming:!1,showUserTimingEndMarker:!1};n.makeLegend=function(){return l.makeLegend()},n.fromHar=function(e,t){void 0===t&&(t={});var n=a({},o,t),r=i.transformDoc(e,n);return"function"==typeof t.onParsed&&t.onParsed(r),function(e,t){void 0===t&&(t={}),void 0!==t.leftColumnWith&&(console.warn("Depreciation Warning: The option 'leftColumnWith' has been fixed to 'leftColumnWidth', please update your code as this will get deprecated in the future"),t.leftColumnWidth=t.leftColumnWith);var i=s.validateOptions(a({},c,t)),n=new u.default(e,i.selectedPage),o=d.createWaterfallSvg(n.getSelectedPage(),i);return n.onPageUpdate(function(e,t){var n=o.parentElement,r=d.createWaterfallSvg(t,i);n.replaceChild(r,o),o=r}),i.pageSelector&&n.initPagingSelectBox(i.pageSelector),i.legendHolder&&(i.legendHolder.innerHTML="",i.legendHolder.appendChild(l.makeLegend())),o}(r,t)}},{"./helpers/parse":5,"./legend/legend":7,"./paging/paging":9,"./transformers/har":13,"./waterfall/svg-chart":27}],9:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=e("../helpers/dom"),r=function(){function e(e,t){void 0===t&&(t=0),this.doc=e,this.selectedPageIndex=t,this.onPageUpdateCbs=[],t>=this.doc.pages.length&&(this.selectedPageIndex=this.doc.pages.length-1)}return e.prototype.getPageCount=function(){return this.doc.pages.length},e.prototype.getSelectedPage=function(){return this.doc.pages[this.selectedPageIndex]},e.prototype.getSelectedPageIndex=function(){return this.selectedPageIndex},e.prototype.setSelectedPageIndex=function(e){var t=this;if(this.selectedPageIndex!==e){if(e<0||e>=this.getPageCount())throw new Error("Page does not exist - Invalid pageIndex selected");this.selectedPageIndex=e;var n=this.doc.pages[this.selectedPageIndex];this.onPageUpdateCbs.forEach(function(e){e(t.selectedPageIndex,n)})}},e.prototype.onPageUpdate=function(e){if(1<this.getPageCount())return this.onPageUpdateCbs.push(e)},e.prototype.initPagingSelectBox=function(r){var i=this,n=this;this.getPageCount()<=1?r.style.display="none":(o.removeChildren(r),this.doc.pages.forEach(function(e,t){var n=new Option(e.title,t.toString(),!1,t===i.selectedPageIndex);r.add(n)}),r.style.display="block",r.addEventListener("change",function(e){var t=parseInt(e.target.value,10);n.setSelectedPageIndex(t)}))},e}();n.default=r},{"../helpers/dom":1}],10:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var w=e("../helpers/har"),C=e("../helpers/parse"),x=e("./helpers"),T=function(e,t){return[e,C.parseAndFormat(t,C.parsePositive,C.formatBytes)]},q=function(e,t){return[e,C.parseAndFormat(t,C.parsePositive)]},S=function(e){return 1<e.length&&void 0!==e[1]&&""!==e[1]};n.getKeys=function(e,t,n,r){var i,o,a,s,l,u,d,c,p,h,f,v,m,g=e.request.headers,y=e.response.headers,b=function(e){return[e.name,e.value]};return{general:(f=e,v=n,m=t,[["Request Number","#"+m],["Started",new Date(f.startedDateTime).toLocaleString()+(0<v?" ("+C.formatMilliseconds(v)+" after page request started)":"")],["Duration",C.formatMilliseconds(f.time)],["Error/Status Code",f.response.status+" "+f.response.statusText],["Server IPAddress",f.serverIPAddress],["Connection",f.connection],["Browser Priority",f._priority||f._initialPriority],["Was pushed",C.parseAndFormat(f._was_pushed,C.parsePositive,function(){return"yes"})],["Initiator (Loaded by)",f._initiator],["Initiator Line",f._initiator_line],["Initiator Type",f._initiator_type],["Host",w.getHeader(f.request.headers,"Host")],["IP",f._ip_addr],["Client Port",C.parseAndFormat(f._client_port,C.parsePositive)],["Expires",f._expires],["Cache Time",C.parseAndFormat(f._cache_time,C.parsePositive,C.formatSeconds)],["CDN Provider",f._cdn_provider],T("ObjectSize",f._objectSize),T("Bytes In (downloaded)",f._bytesIn),T("Bytes Out (uploaded)",f._bytesOut),T("JPEG Scan Count",f._jpeg_scan_count),T("Gzip Total",f._gzip_total),T("Gzip Save",f._gzip_save),T("Minify Total",f._minify_total),T("Minify Save",f._minify_save),T("Image Total",f._image_total),T("Image Save",f._image_save)].filter(S)),request:(c=e,p=c.request,h=function(e){return w.getHeaders(p.headers,e)},x.flattenKvTuple([["Method",p.method],["HTTP Version",p.httpVersion],T("Bytes Out (uploaded)",c._bytesOut),T("Headers Size",p.headersSize),T("Body Size",p.bodySize),["Comment",C.parseAndFormat(p.comment,C.parseNonEmpty)],h("User-Agent"),h("Host"),h("Connection"),h("Accept"),h("Accept-Encoding"),h("Expect"),h("Forwarded"),h("If-Modified-Since"),h("If-Range"),h("If-Unmodified-Since"),q("Querystring parameters count",p.queryString.length),q("Cookies count",p.cookies.length)]).filter(S)),requestHeaders:g.map(b).filter(S),response:function(e){var t,n=e.response,r=n.content,i=n.headers,o=function(e,t){return void 0===t&&(t=e),w.getHeaders(i,t)},a=function(e){var t=w.getHeader(i,e);return[e,C.parseAndFormat(t,C.parseDate,C.formatDateLocalized)]},s=w.getHeader(i,"Content-Length");r.size&&-1!==r.size&&s!==r.size.toString()&&(t=r.size);var l=w.getHeader(i,"Content-Type");return e._contentType&&e._contentType!==l&&(l=l+" | "+e._contentType),x.flattenKvTuple([["Status",n.status+" "+n.statusText],["HTTP Version",n.httpVersion],T("Bytes In (downloaded)",e._bytesIn),T("Headers Size",n.headersSize),T("Body Size",n.bodySize),["Content-Type",l],o("Cache-Control"),o("Content-Encoding"),a("Expires"),a("Last-Modified"),o("Pragma"),T("Content-Length",s),T("Content Size",t),T("Content Compression",r.compression),o("Connection"),o("ETag"),o("Accept-Patch"),["Age",C.parseAndFormat(w.getHeader(i,"Age"),C.parseNonNegative,C.formatSeconds)],o("Allow"),o("Content-Disposition"),o("Location"),o("Strict-Transport-Security"),o("Trailer (for chunked transfer coding)","Trailer"),o("Transfer-Encoding"),o("Upgrade"),o("Vary"),o("Timing-Allow-Origin"),["Redirect URL",C.parseAndFormat(n.redirectURL,C.parseNonEmpty)],["Comment",C.parseAndFormat(n.comment,C.parseNonEmpty)]]).filter(S)}(e),responseHeaders:y.map(b).filter(S),timings:(i=e,o=n,a=r,s=i.timings,l=function(e){return C.parseAndFormat(e,C.parseNonNegative,C.formatMilliseconds)},u="number"!=typeof o||"number"!=typeof a?void 0:a-o,d=l(s.connect),s.ssl&&0<s.ssl&&s.connect&&(d=d+" (without TLS: "+l(s.connect-s.ssl)+")"),[["Total",C.formatMilliseconds(u)],["Blocked",l(s.blocked)],["DNS",l(s.dns)],["Connect",d],["SSL (TLS)",l(s.ssl)],["Send",C.formatMilliseconds(s.send)],["Wait",C.formatMilliseconds(s.wait)],["Receive",C.formatMilliseconds(s.receive)]].filter(S))}}},{"../helpers/har":2,"../helpers/parse":5,"./helpers":14}],11:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=e("../helpers/har"),l=e("../helpers/misc"),u=e("../helpers/parse");function d(e,t){var n=e.response.headers;return!s.hasHeader(n,"Content-Encoding")&&function(e,t){if(e.response.bodySize<1e3)return!1;if(l.contains(["html","css","javascript","svg","plain"],t))return!0;var n=e.response.content.mimeType;return!(!l.contains(["text"],n.split("/")[0])&&!l.contains(["application/vnd.ms-fontobject","application/x-font-opentype","application/x-font-truetype","application/x-font-ttf","application/xml","font/eot","font/opentype","font/otf","image/vnd.microsoft.icon"],n.split(";")[0]))}(e,t)}function c(e){return 0===e.request.url.indexOf("https://")}n.documentIsSecure=function(e){var t=e.filter(function(e){return!e.response.redirectURL})[0];return void 0===t?0<e.length&&c(e[0]):c(t)},n.collectIndicators=function(e,t,n,r){var i,o,a=[];return void 0!==(i=e)._was_pushed&&null!==i._was_pushed&&1===u.toInt(i._was_pushed)&&a.push({description:"Response was pushed by the server using HTTP2 push.",displayType:"inline",icon:"push",id:"push",title:"Response was pushed by the server",type:"info"}),!n||c(e)||(o=e,0===t&&o.response.redirectURL)||a.push({description:"Insecure request, it should use HTTPS.",displayType:"icon",id:"noTls",title:"Insecure Connection",type:"error"}),function(e){if(!e.request.method||"get"!==e.request.method.toLowerCase())return!1;if(204===e.response.status||!l.isInStatusCodeRange(e.response.status,200,299))return!1;var t=e.response.headers;return!(s.hasHeader(t,"Cache-Control")||s.hasHeader(t,"Expires"))}(e)&&a.push({description:"The response is not allow to be cached on the client. Consider setting 'Cache-Control' headers.",displayType:"icon",id:"noCache",title:"Response not cached",type:"error"}),d(e,r)&&a.push({description:"The response is not compressed. Consider enabling HTTP compression on your server.",displayType:"icon",id:"noGzip",title:"no gzip",type:"error"}),!e.response.content.mimeType&&l.isInStatusCodeRange(e.response.status,200,299)&&204!==e.response.status&&a.push({description:"Response doesn't contain a 'Content-Type' header.",displayType:"icon",id:"warning",title:"No MIME Type defined",type:"warning"}),a}},{"../helpers/har":2,"../helpers/misc":4,"../helpers/parse":5}],12:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var y=e("../helpers/misc"),b=e("../helpers/parse"),w=e("./extract-details-keys"),C=e("./helpers"),x=/\\n/g,T=/\n/g,q=/\\t/g;function S(e,t,n){return void 0===n&&(n=""),{content:t,tabClass:n,title:e}}function E(e,t,n){return void 0===n&&(n=""),{renderContent:t,tabClass:n,title:e}}n.makeTabs=function(e,t,n,r,i,o){var a,s,l,u,d,c,p,h,f,v,m=[],g=w.getKeys(e,t,r,i);return m.push(function(e,t){var n=C.makeDefinitionList(e);if(0===t.length)return S("General",n);var r="<h2>General</h2>\n<dl>"+n+"<dl>",i="",o=t.filter(function(e){return"error"===e.type}).map(function(e){return[e.title,e.description]}),a=t.filter(function(e){return"warning"===e.type}).map(function(e){return[e.title,e.description]}),s=t.filter(function(e){return"error"!==e.type&&"warning"!==e.type}).map(function(e){return[e.title,e.description]});return 0<o.length&&(i+='<h2 class="no-border">'+y.pluralize("Error",o.length)+"</h2>\n    <dl>"+C.makeDefinitionList(o)+"</dl>"),0<a.length&&(i+='<h2 class="no-border">'+y.pluralize("Warning",a.length)+"</h2>\n    <dl>"+C.makeDefinitionList(a)+"</dl>"),0<s.length&&(i+='<h2 class="no-border">Info</h2>\n    <dl>'+C.makeDefinitionList(s)+"</dl>"),S("General",i+r)}(g.general,o)),m.push((a=g.request,s=g.requestHeaders,S("Request","<dl>\n      "+C.makeDefinitionList(a)+"\n    </dl>\n    <h2>All Request Headers</h2>\n    <dl>\n      "+C.makeDefinitionList(s)+"\n    </dl>"))),m.push((l=g.response,u=g.responseHeaders,S("Response","<dl>\n      "+C.makeDefinitionList(l)+"\n    </dl>\n    <h2>All Response Headers</h2>\n    <dl>\n      "+C.makeDefinitionList(u)+"\n    </dl>"))),m.push(S("Timings",C.makeDefinitionList(g.timings,!0))),m.push((d=e,E("Raw Data",function(){return'\n      <button class="copy-tab-data">Copy Raw Data to Clipboard</button>\n      <pre><code>'+b.escapeHtml(JSON.stringify(d,null,2))+"</code></pre>\n      "},"raw-data rendered-data"))),"image"===n&&m.push((c=e,E("Preview",function(e){return'<img class="preview" style="max-height:'+(e-100)+'px"\n    data-src="'+b.sanitizeUrlForLink(c.request.url)+'" />'}))),e.response.content&&0===e.response.content.mimeType.indexOf("text/")&&e.response.content.text&&m.push((p=e.response.content.text||"",h=p.replace(x,"\n").replace(q,"\t"),f=p.match(T),E("Content ("+(v=f?f.length:1)+" Line"+(1<v?"s":"")+")",function(){return'\n    <button class="copy-tab-data">Copy Content to Clipboard</button>\n    <pre><code>'+b.escapeHtml(h)+"</code></pre>\n    "},"content rendered-data"))),m.filter(function(e){return void 0!==e})}},{"../helpers/misc":4,"../helpers/parse":5,"./extract-details-keys":10,"./helpers":14}],13:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=e("../helpers/misc"),p=e("../helpers/parse"),h=e("./har-heuristics"),f=e("./har-tabs"),v=e("./helpers");n.transformDoc=function(e,n){var r=void 0!==e.log?e.log:e;return{pages:m(r).map(function(e,t){return i(r,t,n)})}};var m=function(e){return e.pages&&0<e.pages.length?e.pages:[{id:"",pageTimings:{},startedDateTime:e.entries.reduce(function(e,t){var n=Date.parse(t.startedDateTime);return Date.parse(e)<n?e:t.startedDateTime},e.entries[0].startedDateTime),title:"n/a"}]};function i(e,t,n){void 0===t&&(t=0);var r=void 0!==e.log?e.log:e,i=m(r),o=i[t];if(!o.startedDateTime)throw new TypeError('Invalid HAR document: "log.pages['+t+'].startedDateTime" is not set');var a=new Date(o.startedDateTime).getTime(),s=o.pageTimings,l=0,u=h.documentIsSecure(r.entries),d=r.entries.filter(function(e){return 0!==e.request.url.indexOf("data:")&&0!==e.request.url.indexOf("javascript:")&&(1===i.length&&""===o.id||e.pageref===o.id)}).map(function(e,t){var n=new Date(e.startedDateTime).getTime()-a;return isNaN(n)?console.warn("Entry has no valid 'startedDateTime' time",e.request.url,e):l=Math.max(l,n+e.time),function(e,t,n,r){n=Math.round(n);var i=Math.round(p.toInt(e._all_end)||n+e.time),o=v.mimeToRequestType(e.response.content.mimeType),a=h.collectIndicators(e,t,r,o),s=b(e,a);return v.createWaterfallEntry(e.request.url,n,i,y(n,e),s,f.makeTabs(e,t+1,o,n,i,a))}(e,t,n,u)}),c=g(s,o,n);return c.forEach(function(e){e.startTime>l&&(l=e.startTime)}),n.fixedLengthMs&&(l=n.fixedLengthMs),{docIsTLS:u,durationMs:l+=100,entries:d,marks:c,title:o.title}}n.transformPage=i;var g=function(t,e,n){if(void 0===t)return[];var r=function(e,t){return e.startTime-t.startTime},i=Object.keys(t).filter(function(e){return"number"==typeof t[e]&&0<=t[e]}).map(function(e){return{name:p.escapeHtml(e.replace(/^[_]/,""))+" ("+o.roundNumber(t[e],0)+" ms)",startTime:t[e]}});return n.showUserTiming?a(e,n).concat(i).sort(r):i.sort(r)},a=function(o,a){var t=a.showUserTimingEndMarker?function(e){return 0===e.indexOf("_userTime.")}:function(e){return 0===e.indexOf("_userTime.")&&0!==e.indexOf("_userTime.endTimer-")},e=t;if(Array.isArray(a.showUserTiming)){var n=a.showUserTiming;e=function(e){return t(e)&&0<=n.indexOf(e.replace(/^_userTime\./,""))}}var s=/^_userTime\.((?:startTimer-)?(.+))$/;return Object.keys(o).filter(e).map(function(e){var t,n,r,i;return r=(t=s.exec(e)||[,void 0,void 0])[1],n=t[2],(r=p.escapeHtml(r))!==(n=p.escapeHtml(n))&&o["_userTime.endTimer-"+n]?{duration:i=o["_userTime.endTimer-"+n]-o[e],name:(a.showUserTimingEndMarker?r:n)+" ("+o[e]+" - "+(o[e]+i)+" ms)",startTime:o[e]}:{name:r,startTime:o[e]}})},y=function(a,s){var l=s.timings;return["blocked","dns","connect","send","wait","receive"].reduce(function(e,t){var n=u(t,s,e,a);if(n.end&&n.start>=n.end)return e;if("connect"===t&&l.ssl&&-1!==l.ssl){var r=parseInt(""+s._ssl_start,10)||n.start,i=parseInt(""+s._ssl_end,10)||n.start+l.ssl,o=parseInt(""+s._ssl_start,10)?n.start:i;return e.concat([v.createWaterfallEntryTiming("ssl",Math.round(r),Math.round(i))]).concat([v.createWaterfallEntryTiming(t,Math.round(o),Math.round(n.end))])}return e.concat([v.createWaterfallEntryTiming(t,Math.round(n.start),Math.round(n.end))])},[])},u=function(e,t,n,r){var i;switch(e){case"wait":i="ttfb";break;case"receive":i="download";break;default:i=e}var o=parseInt(t["_"+i+"_start"],10),a=parseInt(t["_"+i+"_end"],10),s=isNaN(o)?0<n.length?n[n.length-1].end:r:o,l=isNaN(a)?s+t.timings[e]:a;return{end:Math.round(l),start:Math.round(s)}},b=function(e,t){var n=v.mimeToRequestType(e.response.content.mimeType),r=p.toInt(e.response.status)||0;return{icon:v.makeMimeTypeIcon(r,e.response.statusText,n,e.response.redirectURL),indicators:t,requestType:n,rowClass:v.makeRowCssClasses(r),statusCode:r}}},{"../helpers/misc":4,"../helpers/parse":5,"./har-heuristics":11,"./har-tabs":12,"./helpers":14}],14:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=e("../helpers/misc"),a=e("../helpers/parse"),s=e("../waterfall/row/svg-indicators"),r=function(e){return a.escapeHtml(e).replace("&ltbr/&gt","<br/>")};n.makeDefinitionList=function(e,n){return void 0===n&&(n=!1),e.map(function(e){return"\n      <dt "+(t=e[0],n?'class="'+(o.toCssClass(t)||"no-colour")+'"':"")+">"+r(e[0])+"</dt>\n      <dd>"+r(e[1])+"</dd>\n    ";var t}).join("")},n.mimeToRequestType=function(e){if(void 0===e)return"other";var t=e.split("/"),n=t[1];switch(void 0!==n&&(n=-1<n.indexOf(";")?n.split(";")[0]:n),t[0]){case"image":return"svg+xml"===n?"svg":"image";case"font":return"font";case"video":return"video";case"audio":return"audio"}switch(n){case"xml":case"html":return"html";case"plain":return"plain";case"css":return"css";case"vnd.ms-fontobject":case"font-woff":case"font-woff2":case"x-font-truetype":case"x-font-opentype":case"x-font-woff":return"font";case"javascript":case"x-javascript":case"script":case"json":return"javascript";case"x-shockwave-flash":return"flash";default:return"other"}},n.createWaterfallEntry=function(e,t,n,r,i,o){return void 0===r&&(r=[]),{end:n,responseDetails:i,segments:r,start:t,tabs:o,total:"number"!=typeof t||"number"!=typeof n?NaN:n-t,url:e}},n.createWaterfallEntryTiming=function(e,t,n){return{end:n,start:t,total:"number"!=typeof t||"number"!=typeof n?NaN:n-t,type:a.sanitizeAlphaNumeric(e)}},n.makeRowCssClasses=function(e){var t=["row-item"];return o.isInStatusCodeRange(e,500,599)?t.push("status5xx"):o.isInStatusCodeRange(e,400,499)?t.push("status4xx"):304!==e&&o.isInStatusCodeRange(e,300,399)&&t.push("status3xx"),t.join(" ")},n.makeMimeTypeIcon=function(e,t,n,r){if(void 0===r&&(r=""),r){var i=encodeURI(r.split("?")[0]||"");return s.makeIcon("err3xx",e+" response status: Redirect to "+a.escapeHtml(i)+"...")}return o.isInStatusCodeRange(e,400,499)?s.makeIcon("err4xx",e+" response status: "+a.escapeHtml(t)):o.isInStatusCodeRange(e,500,599)?s.makeIcon("err5xx",e+" response status: "+a.escapeHtml(t)):204===e?s.makeIcon("plain","No content"):s.makeIcon(a.sanitizeAlphaNumeric(n),a.escapeHtml(n))},n.flattenKvTuple=function(e){var t=[];return e.forEach(function(e){void 0!==e&&0!==e.length&&(Array.isArray(e[0])?t.push.apply(t,e):t.push(e))}),t}},{"../helpers/misc":4,"../helpers/parse":5,"../waterfall/row/svg-indicators":20}],15:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.requestTypeToCssClass=function(e){return"block-"+e},n.timingTypeToCssClass=function(e){return"block-"+e}},{}],16:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=e("../../helpers/dom"),l=e("../../helpers/parse");n.createDetailsBody=function(e,r,t){var n=s.makeHtmlEl(),i=s.makeBodyEl(),o=t.tabs.map(function(e){return'<li><button class="tab-button">'+e.title+"</button></li>"}).join("\n"),a=t.tabs.map(function(e){var t="tab";e.tabClass&&(t+=" "+e.tabClass);var n="";if(e.content)n=e.content;else{if("function"!=typeof e.renderContent)throw TypeError("Invalid Details Tab");n=e.renderContent(r),e.content=n}return'<div class="tab '+t+'">'+n+"</div>"}).join("\n");return i.innerHTML='\n    <div class="wrapper">\n      <header class="type-'+t.responseDetails.requestType+'">\n        <h3><strong>#'+e+'</strong> <a href="'+l.sanitizeUrlForLink(t.url)+'">\n          '+l.escapeHtml(t.url)+'\n        </a></h3>\n        <nav class="tab-nav">\n          <ul>\n            '+o+"\n          </ul>\n        </nav>\n      </header>\n      "+a+"\n    </div>\n    ",n.appendChild(i),n}},{"../../helpers/dom":1,"../../helpers/parse":5}],17:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var b=e("../../helpers/dom"),w=e("../../helpers/misc"),C=e("./svg-details-overlay"),r=function(){function y(e){this.context=e,this.openOverlays=[],this.realignRow=function(e,t){e.setAttribute("transform","translate(0, "+t+")")}}return y.prototype.getCombinedOverlayHeight=function(){return this.openOverlays.reduce(function(e,t){return e+(t.height||0)},0)},y.prototype.openOverlay=function(t,e,n,r,i){if(!this.openOverlays.some(function(e){return e.index===t})){var o=this,a={defaultY:e,entry:r,index:t,onClose:function(){o.closeOverlay(t,n,i)},openTabIndex:0};this.openOverlays.push(a),this.openOverlays=this.openOverlays.sort(function(e,t){return e.index>t.index?1:-1}),this.renderOverlays(n,i),this.context.pubSub.publishToOverlayChanges({changedIndex:t,combinedOverlayHeight:o.getCombinedOverlayHeight(),type:"open"})}},y.prototype.toggleOverlay=function(t,e,n,r,i){this.openOverlays.some(function(e){return e.index===t})?this.closeOverlay(t,n,i):this.openOverlay(t,e,n,r,i)},y.prototype.closeOverlay=function(r,e,t){this.openOverlays.splice(this.openOverlays.reduce(function(e,t,n){return t.index===r?n:e},-1),1),this.renderOverlays(e,t),this.context.pubSub.publishToOverlayChanges({changedIndex:r,combinedOverlayHeight:this.getCombinedOverlayHeight(),type:"closed"})},y.prototype.renderOverlays=function(f,e){var v=this,m=0,g=function(e,t,n){m+=n,e.actualY=t,e.height=n};e.forEach(function(e,t){var n=w.find(v.openOverlays,function(e){return e.index===t}),r=e.nextElementSibling,i=r.firstElementChild;if(v.realignRow(e,m),void 0!==n){if(i&&void 0!==n.actualY){var o=i.querySelector(".info-overlay-bg"),a=i.querySelector("foreignObject"),s=i.querySelector(".info-overlay-close-btn rect"),l=i.querySelector(".info-overlay-close-btn text");return g(n,n.defaultY+m,n.height),o.setAttribute("y",n.actualY.toString()),a.setAttribute("y",n.actualY.toString()),l.setAttribute("y",n.actualY.toString()),void s.setAttribute("y",n.actualY.toString())}var u,d,c,p,h;u=e.nextElementSibling,c=(d=n).defaultY+m,p=C.createRowInfoOverlay(d,c,f),(h=p.querySelector("img.preview"))&&!h.src&&h.setAttribute("src",(h.attributes.getNamedItem("data-src")||{value:""}).value),p.querySelector("a").addEventListener("keydown",y.firstElKeypress),b.getLastItemOfNodeList(p.querySelectorAll("button")).addEventListener("keydown",y.lastElKeypress),u.appendChild(p),g(d,c,p.getBoundingClientRect().height)}else i&&null!==r&&(r.querySelector("a").removeEventListener("keydown",y.firstElKeypress),b.getLastItemOfNodeList(r.querySelectorAll("button")).removeEventListener("keydown",y.lastElKeypress),b.removeChildren(r))})},y.showFullName=function(e){e.getElementsByClassName("row-fixed").item(0).dispatchEvent(new MouseEvent("mouseenter"))},y.firstElKeypress=function(e){if(w.isTabUp(e)){var t=b.getParentByClassName(e.target,"row-overlay-holder");t&&t.previousElementSibling&&y.showFullName(t.previousElementSibling)}},y.lastElKeypress=function(e){if(w.isTabDown(e)){var t=b.getParentByClassName(e.target,"row-overlay-holder");t&&t.nextElementSibling&&y.showFullName(t.nextElementSibling)}},y}();n.OverlayManager=r,n.default=r},{"../../helpers/dom":1,"../../helpers/misc":4,"./svg-details-overlay":19}],18:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(){this.subscribers=[]}return e.prototype.subscribeToOverlayChanges=function(e){this.subscribers.push(e)},e.prototype.subscribeToSpecificOverlayChanges=function(t,n){this.subscribers.push(function(e){e.changedIndex===t&&n(e)})},e.prototype.publishToOverlayChanges=function(t){this.subscribers.forEach(function(e){return e(t)})},e}();n.PubSub=r,n.default=r},{}],19:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var m=e("../../helpers/dom"),g=e("../../helpers/svg"),y=e("./html-details-body");var b=function(e){var t=e.target;if("button"===t.tagName.toLowerCase()&&t.classList.contains("copy-tab-data")){var n=document.createElement("textarea");n.value=t.nextElementSibling?t.nextElementSibling.innerText:"",document.body.appendChild(n),n.select(),n.setSelectionRange(0,99999),document.execCommand("copy"),document.body.removeChild(n)}};n.createRowInfoOverlay=function(e,t,n){var r,i,o,a,s,l,u=e.index+1,d=(r=t,i=n,o=g.newG("info-overlay-holder"),a=g.newRect({height:i,rx:2,ry:2,width:"100%",x:"0",y:r},"info-overlay-bg"),o.appendChild(a),o),c=g.newForeignObject({height:n,width:"100%",x:"0",y:t}),p=y.createDetailsBody(u,n,e.entry),h=(s=t,(l=g.newA("info-overlay-close-btn")).appendChild(g.newRect({height:23,width:23,x:"100%",y:s})),l.appendChild(g.newTextEl("✕",{dx:7,dy:16,x:"100%",y:s})),l.appendChild(g.newTitle("Close Overlay")),l);h.addEventListener("click",function(){e.onClose(e.index),p.removeEventListener("click",b)}),p.addEventListener("click",b);var f=function(){return p.getElementsByClassName("tab-button")},v=function(n){e.openTabIndex=n,m.forEachNodeList(p.getElementsByClassName("tab"),function(e,t){e.style.display=n===t?"block":"none",f().item(t).classList.toggle("active",n===t)})};return m.forEachNodeList(f(),function(e,t){e.addEventListener("click",function(){return v(t)})}),v(e.openTabIndex),c.appendChild(p),d.appendChild(c),d.appendChild(h),d}},{"../../helpers/dom":1,"../../helpers/svg":6,"./html-details-body":16}],20:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=e("../../helpers/misc");function l(e,t){return{type:e,title:t,width:20}}n.makeIcon=l,n.getIndicatorIcons=function(e){var t=e.responseDetails.indicators.filter(function(e){return"icon"===e.displayType});if(0===t.length)return[];var n=[],r="",i=t.filter(function(e){return"error"===e.type}),o=t.filter(function(e){return"warning"===e.type}),a=t.filter(function(e){return"error"!==e.type&&"warning"!==e.type});return 0<i.length&&(n.push(s.pluralize("Error",i.length)+":\n "+i.map(function(e){return e.title}).join("\n")),r="error"),0<o.length&&(n.push(s.pluralize("Warning",o.length)+":\n"+o.map(function(e){return e.title}).join("\n")),r=r||"warning"),0<a.length&&(n.push("Info:\n"+a.map(function(e){return e.title}).join("\n")),r=r||1!==a.length?r||"info":a[0].icon||a[0].type),[l(r,n.join("\n"))]}},{"../../helpers/misc":4}],21:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var l=e("../../helpers/dom"),g=e("../../helpers/misc"),y=e("../../helpers/svg"),b=e("../../transformers/styling-converters"),u=e("./svg-tooltip");function w(e,t){var n,r,i=y.newG(""),o=e.height-1,a=g.roundNumber(e.x/e.unit)+"%",s=y.newRect({height:o,width:g.roundNumber(e.width/e.unit)+"%",x:a,y:e.y},t);(i.appendChild(s),e.label)&&(s.addEventListener("mouseenter",function(){r||(r=l.getParentByClassName(s,"water-fall-chart").querySelector(".tooltip")),n=setTimeout(function(){n=null,u.onHoverInShowTooltip(s,e,r)},100)}),s.addEventListener("mouseleave",function(){n?clearTimeout(n):u.onHoverOutShowTooltip(s)}));return e.showOverlay&&e.hideOverlay&&(s.addEventListener("mouseenter",e.showOverlay(e)),s.addEventListener("mouseleave",e.hideOverlay(e))),i}function a(e,t,n,r){var i=g.resourceUrlFormatter(n,125);t=t+Math.round(r/2)+5;var o=y.newTextEl(i,{x:e,y:t});return o.appendChild(y.newTitle(n)),o.style.opacity=n.match(/js.map$/)?"0.5":"1",o}n.createRect=function(a,e){var t,n,r,i,o,s,l,u,d,c,p,h=e.segments,f=w(a,"time-block "+a.cssClass),v=y.newG("rect-holder"),m=a.x;return v.appendChild(f),h&&0<h.length&&(h.forEach(function(e){if(!isNaN(e.total)&&0<e.total&&"number"==typeof e.start){var t=(r=e,i=a,o=isNaN(r.total)?"":"<br/>total: "+Math.round(r.total)+"ms",{cssClass:b.timingTypeToCssClass(r.type),height:i.height-6,hideOverlay:i.hideOverlay,label:"<strong>"+r.type+"</strong><br/>"+Math.round(r.start)+"ms - "+Math.round(r.end)+"ms"+o,showOverlay:i.showOverlay,unit:i.unit,width:r.total,x:r.start||.001,y:i.y}),n=w(t,"segment "+t.cssClass);m=Math.min(m,t.x),v.appendChild(n)}var r,i,o}),g.find(e.responseDetails.indicators,function(e){return"push"===e.id})&&v.appendChild((d=(u=a).y+u.height/1.5,c=g.roundNumber(u.x/u.unit)+"%",(p=y.newG("http2-inidicator-holder")).appendChild(y.newTextEl("→",{transform:"translate(-5)",x:c,y:d},{fillOpacity:"0.6","text-anchor":"end"})),p.appendChild(y.newTitle("http2 Push")),p)),v.appendChild((t=a,n=e.total,r=m,i=t.y+t.height/1.5,o=Math.round(n)+" ms",s=(t.x+t.width)/t.unit+1,l=y.newTextEl(o,{x:g.roundNumber(s)+"%",y:i}),100<s+8*o.length/500*100&&(s=r/t.unit-1,l=y.newTextEl(o,{x:g.roundNumber(s)+"%",y:i},{textAnchor:"end"})),l))),v},n.createRequestNumberLabel=function(e,t,n,r,i){return t+=Math.round(r/2)+5,e+=i,y.newTextEl(n,{x:e,y:t},{"text-anchor":"end"})},n.createRequestLabelClipped=function(e,t,n,r){var i=a(e,t,n,r);return i.style.clipPath="url(#titleClipPath)",i},n.createRequestLabelFull=function(e,t,n,r){var i=a(e,t,n,r),o=y.newG("full-label",{},{clipPath:"url(#titleFullClipPath)"});return o.appendChild(y.newRect({height:r-4,rx:5,ry:5,width:500,x:e-3,y:t+3},"label-full-bg")),o.appendChild(i),o};var d="function"==typeof window.requestAnimationFrame&&"function"==typeof window.cancelAnimationFrame;n.appendRequestLabels=function(e,t,n,r){var i=r.getElementsByTagName("rect")[0],o=r.getElementsByTagName("text")[0];r.style.display="none",r.style.visibility="hidden",e.appendChild(t),e.appendChild(n),e.appendChild(r);var a,s=!1;e.addEventListener("mouseenter",function(){r.style.display="block",n.style.display="none",r.style.visibility="visible";var e=function(){var e=o.getComputedTextLength()+10;i.setAttribute("width",e.toString()),s=!0,a=void 0};s||(d?a=window.requestAnimationFrame(e):e())}),e.addEventListener("mouseleave",function(){n.style.display="block",r.style.display="none",r.style.visibility="hidden",d&&void 0!==a&&cancelAnimationFrame(a)})},n.createBgStripe=function(e,t,n){var r=n?"even":"odd";return y.newRect({height:t,width:"100%",x:0,y:e},r)},n.createNameRowBg=function(e,t){var n=y.newG("row row-fixed");return n.appendChild(y.newRect({height:t,width:"100%",x:"0",y:e},"",{opacity:0})),n},n.createRowBg=function(e,t){var n=y.newG("row row-flex");return n.appendChild(y.newRect({height:t,width:"100%",x:"0",y:e},"",{opacity:0})),n}},{"../../helpers/dom":1,"../../helpers/misc":4,"../../helpers/svg":6,"../../transformers/styling-converters":15,"./svg-tooltip":23}],22:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var S=e("../../helpers/icons"),E=e("../../helpers/misc"),L=e("../../helpers/svg"),M=e("./svg-indicators"),_=e("./svg-row-subcomponents"),N=L.newClipPath("titleClipPath");N.appendChild(L.newRect({height:"100%",width:"100%"}));var O=L.newClipPath("titleFullClipPath");O.appendChild(L.newRect({height:"100%",width:"100%"}));n.createRow=function(e,n,t,r,i,o,a){var s=i.y,l=i.height,u=e.options.leftColumnWidth,d=L.newA(o.responseDetails.rowClass||"");d.setAttribute("tabindex","0"),d.setAttribute("xlink:href","javascript:void(0)");var c=L.newSvg("left-fixed-holder",{width:u+"%",x:"0"}),p=L.newSvg("flex-scale-waterfall",{width:100-u+"%",x:u+"%"}),h=_.createRect(i,o),f=_.createNameRowBg(s,l),v=_.createRowBg(s,l),m=_.createBgStripe(s,l,n%2==0),g=3+t;if(e.options.showMimeTypeIcon){var y=o.responseDetails.icon;g-=y.width,f.appendChild(S[y.type](g,s+3,y.title))}e.options.showIndicatorIcons&&M.getIndicatorIcons(o).forEach(function(e){g-=e.width,f.appendChild(S[e.type](g,s+3,e.title))}),g=3+t;var b=""+(n+1),w=_.createRequestNumberLabel(g,s,b,l,r);g+=r+4;var C,x,T=_.createRequestLabelClipped(g,s,E.resourceUrlFormatter(o.url,40),l),q=_.createRequestLabelFull(g,s,o.url,l);return v.appendChild(h),_.appendRequestLabels(f,w,T,q),e.pubSub.subscribeToSpecificOverlayChanges(n,function(e){C="open"===e.type}),0<n&&e.pubSub.subscribeToSpecificOverlayChanges(n-1,function(e){x="open"===e.type}),d.addEventListener("click",function(e){e.preventDefault(),a(e)}),d.addEventListener("keydown",function(e){var t=e;if(32===t.which||13===t.which)return t.preventDefault(),a(t);E.isTabUp(t)&&!x&&0<n?d.previousSibling&&d.previousSibling.previousSibling&&d.previousSibling.previousSibling.lastChild&&d.previousSibling.previousSibling.lastChild.lastChild&&d.previousSibling.previousSibling.lastChild.lastChild.dispatchEvent(new MouseEvent("mouseenter")):!E.isTabDown(t)||C||d.nextSibling&&d.nextSibling.nextSibling&&d.nextSibling.nextSibling.lastChild&&d.nextSibling.nextSibling.lastChild.lastChild&&d.nextSibling.nextSibling.lastChild.lastChild.dispatchEvent(new MouseEvent("mouseenter"))}),d.addEventListener("focusout",function(){f.dispatchEvent(new MouseEvent("mouseleave"))}),p.appendChild(v),c.appendChild(N.cloneNode(!0)),c.appendChild(f),d.appendChild(O.cloneNode(!0)),d.appendChild(m),d.appendChild(p),d.appendChild(c),d}},{"../../helpers/icons":3,"../../helpers/misc":4,"../../helpers/svg":6,"./svg-indicators":20,"./svg-row-subcomponents":21}],23:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var g=e("../../helpers/dom"),a=e("../../helpers/svg"),y=/(?:translate)\(.+[, ]+(.+)\)/;n.onHoverInShowTooltip=function(e,t,n){var r=n.querySelector(".tooltip-payload"),i=function(e){void 0===e&&(e=""),e=null===e?"":e;var t=y.exec(e);return t&&2<=t.length?parseInt(t[1],10):0}(g.getParentByClassName(e,"row-item").getAttribute("transform")),o=parseInt(e.getAttribute("y")||"",10),a=e.getAttribute("x")||"",s=parseFloat(a),l=50,u=e.width.baseVal.value||e.getBoundingClientRect().width,d=u/(t.width/t.unit),c=t.width/t.unit/u,p=50<s&&(95-s)*d<200;r.innerHTML=t.label||"",g.addClass(r,"no-anim"),n.style.display="block",r.style.opacity="0.01";var h=r.clientHeight+5;if(l=0<o+i-h?i-h:i+t.height+10,p){var f=s-(r.clientWidth+5)*c,v=parseInt(n.querySelector("body").style.left||"",10);v*=1/(.01*(100-v)),r.style.left=-v<f?f+"%":-v+"%"}else r.style.left=a;n.setAttribute("y",""+(o+l)),n.setAttribute("height",h.toString()),g.removeClass(r,"no-anim"),r.style.opacity="1";var m=r.clientHeight+5-h;0!==m&&(n.setAttribute("height",(h+m).toString()),n.setAttribute("y",""+(o+l-m)))},n.onHoverOutShowTooltip=function(e){var t=g.getParentByClassName(e,"water-fall-chart").querySelector(".tooltip"),n=t.querySelector(".tooltip-payload");t.style.display="none",t.setAttribute("height","250"),n.style.opacity="0"},n.makeTooltip=function(e){var t=e.leftColumnWidth,n=a.newSvg("tooltip-holder",{width:"100%",x:"0",y:"0"}),r=a.newForeignObject({width:"100%",x:"0",y:t+"%"},"tooltip",{display:"none"}),i=g.makeHtmlEl(),o=g.makeBodyEl({left:t+"%",width:100-t+"%"},'<div class="tooltip-payload" style="max-width: 200px; opacity: 0;"></div>');return i.appendChild(o),r.appendChild(i),n.appendChild(r),n}},{"../../helpers/dom":1,"../../helpers/svg":6}],24:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=e("../../helpers/dom"),r=e("../../helpers/svg");n.createAlignmentLines=function(e){return{endline:r.newLine({x1:"0",x2:"0",y1:"0",y2:e},"line-end"),startline:r.newLine({x1:"0",x2:"0",y1:"0",y2:e},"line-start")}},n.makeHoverEvtListeners=function(i){return{onMouseEnterPartial:function(){return function(e){var t=e.target;o.addClass(t,"active");var n=t.x.baseVal.valueInSpecifiedUnits+t.width.baseVal.valueInSpecifiedUnits+"%",r=t.x.baseVal.valueInSpecifiedUnits+"%";i.endline.x1.baseVal.valueAsString=n,i.endline.x2.baseVal.valueAsString=n,i.startline.x1.baseVal.valueAsString=r,i.startline.x2.baseVal.valueAsString=r,o.addClass(i.endline,"active"),o.addClass(i.startline,"active")}},onMouseLeavePartial:function(){return function(e){var t=e.target;o.removeClass(t,"active"),o.removeClass(i.endline,"active"),o.removeClass(i.startline,"active")}}}}},{"../../helpers/dom":1,"../../helpers/svg":6}],25:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var h=e("../../helpers/misc"),f=e("../../helpers/svg"),l=function(e,t,n,r,i){void 0===i&&(i=!1);var o,a,s=e.diagramHeight,l=100/n,u="sub-second-line";if(i){var d=n-.2<r;u="second-line",a=h.roundNumber(l*r)+.5+"%";var c={};d&&(a=h.roundNumber(l*r)-.5+"%",c["text-anchor"]="end"),o=f.newTextEl(r+"s",{x:a,y:s},c)}a=h.roundNumber(l*r)+"%";var p=f.newLine({x1:a,x2:a,y1:0,y2:s},u);e.pubSub.subscribeToOverlayChanges(function(e){var t=e.combinedOverlayHeight,n=(s+t)/s;p.setAttribute("transform","scale(1, "+n+")"),i&&o.setAttribute("transform","translate(0, "+t+")")}),t.appendChild(p),i&&t.appendChild(o)};n.createTimeScale=function(e,t){for(var n=f.newG("time-scale full-width"),r=200*Math.ceil(t/1e4),i=1e3/r,o=t/1e3,a=t/r,s=0;s<=a;s++)l(e,n,o,s/i,s%i<1e-9);return n}},{"../../helpers/misc":4,"../../helpers/svg":6}],26:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var g=e("../../helpers/dom"),y=e("../../helpers/misc"),b=e("../../helpers/svg");function w(e,t){var n=b.newG("line-mark-holder line-marker-"+y.toCssClass(t.name));return n.appendChild(b.newTitle(t.name.replace(/^startTimer-/,""))),n.appendChild(b.newRect({height:e.diagramHeight,width:(t.duration||1)/e.unit+"%",x:(t.startTime||.001)/e.unit+"%",y:0},"line-mark")),n}n.createMarks=function(h,f){var v=h.diagramHeight,m=b.newG("marker-holder",{transform:"scale(1, 1)"});return f.forEach(function(e,t){var r,n=y.roundNumber(e.startTime/h.unit),i=b.newG("mark-holder type-"+e.name.toLowerCase().replace(/([0-9]+[ ]?ms)|\W/g,"")),o=b.newG("line-holder"),a=b.newG("line-label-holder"),s=b.newTextEl(e.name,{x:n+"%",y:v+25});s.setAttribute("writing-mode","tb"),e.x=n;var l=b.newLine({x1:n+"%",x2:n+"%",y1:0,y2:v}),u=f[t-1];u&&void 0!==u.x&&e.x-u.x<2.5&&(s.setAttribute("x",u.x+2.5+"%"),e.x=u.x+2.5);var d=b.newLine({x1:n+"%",x2:e.x+"%",y1:v,y2:v+23});o.appendChild(l),o.appendChild(d),e.duration&&(r=w(h,e),o.appendChild(r)),h.pubSub.subscribeToOverlayChanges(function(e){var t=e.combinedOverlayHeight,n=(v+t)/v;l.setAttribute("transform","scale(1, "+n+")"),a.setAttribute("transform","translate(0, "+t+")"),d.setAttribute("transform","translate(0, "+t+")"),r&&r.setAttribute("transform","translate(0, "+t+")")});var c=!1,p=!1;s.addEventListener("mouseenter",function(){c||(i.parentNode.appendChild(i),c=!0,"function"==typeof window.requestAnimationFrame?window.requestAnimationFrame(function(){return g.addClass(o,"active")}):g.addClass(o,"active"))}),s.addEventListener("mouseleave",function(){c=!1,p||g.removeClass(o,"active")}),s.addEventListener("click",function(){p?(c=!1,g.removeClass(o,"active")):c?c=!1:g.addClass(o,"active"),p=!p}),a.appendChild(s),i.appendChild(b.newTitle(e.name)),i.appendChild(o),i.appendChild(a),m.appendChild(i)}),m},n.createLineRect=w},{"../../helpers/dom":1,"../../helpers/misc":4,"../../helpers/svg":6}],27:[function(e,t,n){"use strict";var E=this&&this.__assign||function(){return(E=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};Object.defineProperty(n,"__esModule",{value:!0});var L=e("../helpers/svg"),M=e("../transformers/styling-converters"),_=e("./details-overlay/overlay-manager"),N=e("./details-overlay/pub-sub"),O=e("./row/svg-row"),P=e("./row/svg-tooltip"),I=e("./sub-components/svg-alignment-helper"),H=e("./sub-components/svg-general-components"),A=e("./sub-components/svg-marks");n.createWaterfallSvg=function(e,s){var t,n,r,i,o,a,l,u,d,c=e.entries.filter(function(e){return"number"==typeof e.start&&"number"==typeof e.total}).sort(function(e,t){return(e.start||0)-(t.start||0)}),p=L.newG("overlays"),h=L.newG("rows-holder"),f=(t=s,n=c,r=e.durationMs/100,i={diagramHeight:(n.length+1)*t.rowHeight,options:t,pubSub:new N.PubSub,unit:r},E({},i,{overlayManager:new _.default(i)})),v=(o=e.marks,a=f.diagramHeight,l=o.reduce(function(e,t){return Math.max(e,L.getNodeTextWidth(L.newTextEl(t.name,{x:0,y:0}),!0))},0),Math.floor(a+l+35)),m=L.newSvg("water-fall-chart",{height:v}),g=L.newSvg("scale-and-marks-holder",{width:100-s.leftColumnWidth+"%",x:s.leftColumnWidth+"%"});if(s.showAlignmentHelpers){u=L.newG("hover-overlays");var y=I.createAlignmentLines(f.diagramHeight);u.appendChild(y.startline),u.appendChild(y.endline),d=I.makeHoverEvtListeners(y)}g.appendChild(H.createTimeScale(f,e.durationMs)),g.appendChild(A.createMarks(f,e.marks));var b=c[0].responseDetails.icon.width,w=0;if(s.showMimeTypeIcon&&(w+=1),s.showIndicatorIcons){var C=c.map(function(e){return 0<e.responseDetails.indicators.filter(function(e){return"icon"===e.displayType}).length?1:0});w+=Math.max.apply(null,C)}var x=w*b,T=function(e){for(var t=Math.floor(Math.log(e)/Math.LN10)+1,n="",r=0;r<t;r++)n+="0";return n}(c.length),q=L.getNodeTextWidth(L.newTextEl(""+T),!0),S=[];return f.pubSub.subscribeToOverlayChanges(function(){var e=v+f.overlayManager.getCombinedOverlayHeight();m.classList.toggle("closing",e<m.clientHeight),m.style.height=e+"px"}),c.forEach(function(e,t){var n=e.total||1,r=s.rowHeight*t,i=e.start||.001,o={cssClass:M.requestTypeToCssClass(e.responseDetails.requestType),height:s.rowHeight,hideOverlay:s.showAlignmentHelpers?d.onMouseLeavePartial:void 0,label:"<strong>"+e.url+"</strong><br/>"+Math.round(e.start)+"ms - "+Math.round(e.end)+"ms<br/>total: "+(isNaN(e.total)?"n/a ":Math.round(e.total))+"ms",showOverlay:s.showAlignmentHelpers?d.onMouseEnterPartial:void 0,unit:f.unit,width:n,x:i,y:r},a=O.createRow(f,t,x,q,o,e,function(){f.overlayManager.toggleOverlay(t,r+s.rowHeight,450,e,S)});S.push(a),h.appendChild(a),h.appendChild(L.newG("row-overlay-holder"))}),s.showAlignmentHelpers&&void 0!==u&&g.appendChild(u),m.appendChild(g),m.appendChild(h),m.appendChild(p),m.appendChild(P.makeTooltip(s)),m}},{"../helpers/svg":6,"../transformers/styling-converters":15,"./details-overlay/overlay-manager":17,"./details-overlay/pub-sub":18,"./row/svg-row":22,"./row/svg-tooltip":23,"./sub-components/svg-alignment-helper":24,"./sub-components/svg-general-components":25,"./sub-components/svg-marks":26}]},{},[8])(8)});
/** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */(function() {'use strict';function n(e){throw e;}var q=void 0,aa=this;function r(e,c){var d=e.split("."),b=aa;!(d[0]in b)&&b.execScript&&b.execScript("var "+d[0]);for(var a;d.length&&(a=d.shift());)!d.length&&c!==q?b[a]=c:b=b[a]?b[a]:b[a]={}};var u="undefined"!==typeof Uint8Array&&"undefined"!==typeof Uint16Array&&"undefined"!==typeof Uint32Array&&"undefined"!==typeof DataView;new (u?Uint8Array:Array)(256);var v;for(v=0;256>v;++v)for(var w=v,ba=7,w=w>>>1;w;w>>>=1)--ba;function x(e,c,d){var b,a="number"===typeof c?c:c=0,f="number"===typeof d?d:e.length;b=-1;for(a=f&7;a--;++c)b=b>>>8^z[(b^e[c])&255];for(a=f>>3;a--;c+=8)b=b>>>8^z[(b^e[c])&255],b=b>>>8^z[(b^e[c+1])&255],b=b>>>8^z[(b^e[c+2])&255],b=b>>>8^z[(b^e[c+3])&255],b=b>>>8^z[(b^e[c+4])&255],b=b>>>8^z[(b^e[c+5])&255],b=b>>>8^z[(b^e[c+6])&255],b=b>>>8^z[(b^e[c+7])&255];return(b^4294967295)>>>0}
var A=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,
2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,
2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,
2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,
3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,
936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],z=u?new Uint32Array(A):A;function B(){}B.prototype.getName=function(){return this.name};B.prototype.getData=function(){return this.data};B.prototype.H=function(){return this.I};r("Zlib.GunzipMember",B);r("Zlib.GunzipMember.prototype.getName",B.prototype.getName);r("Zlib.GunzipMember.prototype.getData",B.prototype.getData);r("Zlib.GunzipMember.prototype.getMtime",B.prototype.H);function D(e){var c=e.length,d=0,b=Number.POSITIVE_INFINITY,a,f,g,k,m,p,t,h,l,y;for(h=0;h<c;++h)e[h]>d&&(d=e[h]),e[h]<b&&(b=e[h]);a=1<<d;f=new (u?Uint32Array:Array)(a);g=1;k=0;for(m=2;g<=d;){for(h=0;h<c;++h)if(e[h]===g){p=0;t=k;for(l=0;l<g;++l)p=p<<1|t&1,t>>=1;y=g<<16|h;for(l=p;l<a;l+=m)f[l]=y;++k}++g;k<<=1;m<<=1}return[f,d,b]};var E=[],F;for(F=0;288>F;F++)switch(!0){case 143>=F:E.push([F+48,8]);break;case 255>=F:E.push([F-144+400,9]);break;case 279>=F:E.push([F-256+0,7]);break;case 287>=F:E.push([F-280+192,8]);break;default:n("invalid literal: "+F)}
var ca=function(){function e(a){switch(!0){case 3===a:return[257,a-3,0];case 4===a:return[258,a-4,0];case 5===a:return[259,a-5,0];case 6===a:return[260,a-6,0];case 7===a:return[261,a-7,0];case 8===a:return[262,a-8,0];case 9===a:return[263,a-9,0];case 10===a:return[264,a-10,0];case 12>=a:return[265,a-11,1];case 14>=a:return[266,a-13,1];case 16>=a:return[267,a-15,1];case 18>=a:return[268,a-17,1];case 22>=a:return[269,a-19,2];case 26>=a:return[270,a-23,2];case 30>=a:return[271,a-27,2];case 34>=a:return[272,
a-31,2];case 42>=a:return[273,a-35,3];case 50>=a:return[274,a-43,3];case 58>=a:return[275,a-51,3];case 66>=a:return[276,a-59,3];case 82>=a:return[277,a-67,4];case 98>=a:return[278,a-83,4];case 114>=a:return[279,a-99,4];case 130>=a:return[280,a-115,4];case 162>=a:return[281,a-131,5];case 194>=a:return[282,a-163,5];case 226>=a:return[283,a-195,5];case 257>=a:return[284,a-227,5];case 258===a:return[285,a-258,0];default:n("invalid length: "+a)}}var c=[],d,b;for(d=3;258>=d;d++)b=e(d),c[d]=b[2]<<24|b[1]<<
16|b[0];return c}();u&&new Uint32Array(ca);function G(e,c){this.i=[];this.j=32768;this.d=this.f=this.c=this.n=0;this.input=u?new Uint8Array(e):e;this.o=!1;this.k=H;this.z=!1;if(c||!(c={}))c.index&&(this.c=c.index),c.bufferSize&&(this.j=c.bufferSize),c.bufferType&&(this.k=c.bufferType),c.resize&&(this.z=c.resize);switch(this.k){case I:this.a=32768;this.b=new (u?Uint8Array:Array)(32768+this.j+258);break;case H:this.a=0;this.b=new (u?Uint8Array:Array)(this.j);this.e=this.F;this.q=this.B;this.l=this.D;break;default:n(Error("invalid inflate mode"))}}
var I=0,H=1;
G.prototype.g=function(){for(;!this.o;){var e=J(this,3);e&1&&(this.o=!0);e>>>=1;switch(e){case 0:var c=this.input,d=this.c,b=this.b,a=this.a,f=c.length,g=q,k=q,m=b.length,p=q;this.d=this.f=0;d+1>=f&&n(Error("invalid uncompressed block header: LEN"));g=c[d++]|c[d++]<<8;d+1>=f&&n(Error("invalid uncompressed block header: NLEN"));k=c[d++]|c[d++]<<8;g===~k&&n(Error("invalid uncompressed block header: length verify"));d+g>c.length&&n(Error("input buffer is broken"));switch(this.k){case I:for(;a+g>b.length;){p=
m-a;g-=p;if(u)b.set(c.subarray(d,d+p),a),a+=p,d+=p;else for(;p--;)b[a++]=c[d++];this.a=a;b=this.e();a=this.a}break;case H:for(;a+g>b.length;)b=this.e({t:2});break;default:n(Error("invalid inflate mode"))}if(u)b.set(c.subarray(d,d+g),a),a+=g,d+=g;else for(;g--;)b[a++]=c[d++];this.c=d;this.a=a;this.b=b;break;case 1:this.l(da,ea);break;case 2:fa(this);break;default:n(Error("unknown BTYPE: "+e))}}return this.q()};
var K=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],L=u?new Uint16Array(K):K,N=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],O=u?new Uint16Array(N):N,P=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],Q=u?new Uint8Array(P):P,R=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],ga=u?new Uint16Array(R):R,ha=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,
13,13],U=u?new Uint8Array(ha):ha,V=new (u?Uint8Array:Array)(288),W,ia;W=0;for(ia=V.length;W<ia;++W)V[W]=143>=W?8:255>=W?9:279>=W?7:8;var da=D(V),X=new (u?Uint8Array:Array)(30),Y,ja;Y=0;for(ja=X.length;Y<ja;++Y)X[Y]=5;var ea=D(X);function J(e,c){for(var d=e.f,b=e.d,a=e.input,f=e.c,g=a.length,k;b<c;)f>=g&&n(Error("input buffer is broken")),d|=a[f++]<<b,b+=8;k=d&(1<<c)-1;e.f=d>>>c;e.d=b-c;e.c=f;return k}
function Z(e,c){for(var d=e.f,b=e.d,a=e.input,f=e.c,g=a.length,k=c[0],m=c[1],p,t;b<m&&!(f>=g);)d|=a[f++]<<b,b+=8;p=k[d&(1<<m)-1];t=p>>>16;e.f=d>>t;e.d=b-t;e.c=f;return p&65535}
function fa(e){function c(a,c,b){var d,e=this.w,f,g;for(g=0;g<a;)switch(d=Z(this,c),d){case 16:for(f=3+J(this,2);f--;)b[g++]=e;break;case 17:for(f=3+J(this,3);f--;)b[g++]=0;e=0;break;case 18:for(f=11+J(this,7);f--;)b[g++]=0;e=0;break;default:e=b[g++]=d}this.w=e;return b}var d=J(e,5)+257,b=J(e,5)+1,a=J(e,4)+4,f=new (u?Uint8Array:Array)(L.length),g,k,m,p;for(p=0;p<a;++p)f[L[p]]=J(e,3);if(!u){p=a;for(a=f.length;p<a;++p)f[L[p]]=0}g=D(f);k=new (u?Uint8Array:Array)(d);m=new (u?Uint8Array:Array)(b);e.w=
0;e.l(D(c.call(e,d,g,k)),D(c.call(e,b,g,m)))}G.prototype.l=function(e,c){var d=this.b,b=this.a;this.r=e;for(var a=d.length-258,f,g,k,m;256!==(f=Z(this,e));)if(256>f)b>=a&&(this.a=b,d=this.e(),b=this.a),d[b++]=f;else{g=f-257;m=O[g];0<Q[g]&&(m+=J(this,Q[g]));f=Z(this,c);k=ga[f];0<U[f]&&(k+=J(this,U[f]));b>=a&&(this.a=b,d=this.e(),b=this.a);for(;m--;)d[b]=d[b++-k]}for(;8<=this.d;)this.d-=8,this.c--;this.a=b};
G.prototype.D=function(e,c){var d=this.b,b=this.a;this.r=e;for(var a=d.length,f,g,k,m;256!==(f=Z(this,e));)if(256>f)b>=a&&(d=this.e(),a=d.length),d[b++]=f;else{g=f-257;m=O[g];0<Q[g]&&(m+=J(this,Q[g]));f=Z(this,c);k=ga[f];0<U[f]&&(k+=J(this,U[f]));b+m>a&&(d=this.e(),a=d.length);for(;m--;)d[b]=d[b++-k]}for(;8<=this.d;)this.d-=8,this.c--;this.a=b};
G.prototype.e=function(){var e=new (u?Uint8Array:Array)(this.a-32768),c=this.a-32768,d,b,a=this.b;if(u)e.set(a.subarray(32768,e.length));else{d=0;for(b=e.length;d<b;++d)e[d]=a[d+32768]}this.i.push(e);this.n+=e.length;if(u)a.set(a.subarray(c,c+32768));else for(d=0;32768>d;++d)a[d]=a[c+d];this.a=32768;return a};
G.prototype.F=function(e){var c,d=this.input.length/this.c+1|0,b,a,f,g=this.input,k=this.b;e&&("number"===typeof e.t&&(d=e.t),"number"===typeof e.A&&(d+=e.A));2>d?(b=(g.length-this.c)/this.r[2],f=258*(b/2)|0,a=f<k.length?k.length+f:k.length<<1):a=k.length*d;u?(c=new Uint8Array(a),c.set(k)):c=k;return this.b=c};
G.prototype.q=function(){var e=0,c=this.b,d=this.i,b,a=new (u?Uint8Array:Array)(this.n+(this.a-32768)),f,g,k,m;if(0===d.length)return u?this.b.subarray(32768,this.a):this.b.slice(32768,this.a);f=0;for(g=d.length;f<g;++f){b=d[f];k=0;for(m=b.length;k<m;++k)a[e++]=b[k]}f=32768;for(g=this.a;f<g;++f)a[e++]=c[f];this.i=[];return this.buffer=a};
G.prototype.B=function(){var e,c=this.a;u?this.z?(e=new Uint8Array(c),e.set(this.b.subarray(0,c))):e=this.b.subarray(0,c):(this.b.length>c&&(this.b.length=c),e=this.b);return this.buffer=e};function $(e){this.input=e;this.c=0;this.m=[];this.s=!1}$.prototype.G=function(){this.s||this.g();return this.m.slice()};
$.prototype.g=function(){for(var e=this.input.length;this.c<e;){var c=new B,d=q,b=q,a=q,f=q,g=q,k=q,m=q,p=q,t=q,h=this.input,l=this.c;c.u=h[l++];c.v=h[l++];(31!==c.u||139!==c.v)&&n(Error("invalid file signature:"+c.u+","+c.v));c.p=h[l++];switch(c.p){case 8:break;default:n(Error("unknown compression method: "+c.p))}c.h=h[l++];p=h[l++]|h[l++]<<8|h[l++]<<16|h[l++]<<24;c.I=new Date(1E3*p);c.O=h[l++];c.N=h[l++];0<(c.h&4)&&(c.J=h[l++]|h[l++]<<8,l+=c.J);if(0<(c.h&8)){m=[];for(k=0;0<(g=h[l++]);)m[k++]=String.fromCharCode(g);
c.name=m.join("")}if(0<(c.h&16)){m=[];for(k=0;0<(g=h[l++]);)m[k++]=String.fromCharCode(g);c.K=m.join("")}0<(c.h&2)&&(c.C=x(h,0,l)&65535,c.C!==(h[l++]|h[l++]<<8)&&n(Error("invalid header crc16")));d=h[h.length-4]|h[h.length-3]<<8|h[h.length-2]<<16|h[h.length-1]<<24;h.length-l-4-4<512*d&&(f=d);b=new G(h,{index:l,bufferSize:f});c.data=a=b.g();l=b.c;c.L=t=(h[l++]|h[l++]<<8|h[l++]<<16|h[l++]<<24)>>>0;x(a,q,q)!==t&&n(Error("invalid CRC-32 checksum: 0x"+x(a,q,q).toString(16)+" / 0x"+t.toString(16)));c.M=
d=(h[l++]|h[l++]<<8|h[l++]<<16|h[l++]<<24)>>>0;(a.length&4294967295)!==d&&n(Error("invalid input size: "+(a.length&4294967295)+" / "+d));this.m.push(c);this.c=l}this.s=!0;var y=this.m,s,M,S=0,T=0,C;s=0;for(M=y.length;s<M;++s)T+=y[s].data.length;if(u){C=new Uint8Array(T);for(s=0;s<M;++s)C.set(y[s].data,S),S+=y[s].data.length}else{C=[];for(s=0;s<M;++s)C[s]=y[s].data;C=Array.prototype.concat.apply([],C)}return C};r("Zlib.Gunzip",$);r("Zlib.Gunzip.prototype.decompress",$.prototype.g);r("Zlib.Gunzip.prototype.getMembers",$.prototype.G);}).call(this); //@ sourceMappingURL=gunzip.min.js.map

/*!
  FileDrop Revamped - HTML5 & legacy file upload
  in public domain  | http://filedropjs.org
  by Proger_XP      | http://proger.me

  Supports IE 6+, FF 3.6+, Chrome 7+, Safari 5+, Opera 11+.
  Fork & report problems at https://github.com/ProgerXP/FileDrop
*/
;(function(e,t){typeof define=="function"&&define.amd?define(["exports"],function(n){t(e,n)}):typeof exports!="undefined"?t(e,exports):t(e,e.fd=e.fd||{})})(this,function(t,n){n.randomID=function(e){return(e||"fd")+"_"+(Math.random()*1e4).toFixed()},n.uniqueID=function(e){do var t=n.randomID(e);while(n.byID(t));return t},n.byID=function(e){return n.isTag(e)?e:document.getElementById(e)},n.isTag=function(e,t){return typeof e=="object"&&e&&e.nodeType==1&&(!t||e.tagName.toUpperCase()==t.toUpperCase())},n.newXHR=function(){try{return new XMLHttpRequest}catch(e){var t=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];for(var n=0;n<t.length;n++)try{return new ActiveXObject(t[n])}catch(e){}}throw"Cannot create XMLHttpRequest."},n.isArray=function(e){return Object.prototype.toString.call(e)==="[object Array]"},n.toArray=function(e,t){return e===null||typeof e=="undefined"?[]:(!n.isArray(e)&&(typeof e!="object"||!("callee"in e))&&(e=[e]),Array.prototype.slice.call(e,t||0))},n.addEvent=function(e,t,n){return e&&t&&n&&(e.attachEvent?(e["e"+t+n]=n,e[t+n]=function(){e["e"+t+n](window.event)},e.attachEvent("on"+t,e[t+n])):e.addEventListener(t,n,!1)),e},n.stopEvent=function(e){return e.cancelBubble=!0,e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault(),e},n.setClass=function(e,t,r){return(e=n.byID(e))&&t!=null&&(typeof r!="undefined"&&!r?e.className=e.className.replace(n.classRegExp(t)," "):n.hasClass(e,t)||(e.className+=" "+t)),e},n.hasClass=function(e,t){return n.classRegExp(t).test((n.byID(e)||{}).className)},n.classRegExp=function(e){return e==""||typeof e=="object"?/$o_O/:new RegExp("(^|\\s+)"+e+"(\\s+|$)","gi")},n.extend=function(e,t,n){e=e||{},t=t||{};for(var r in t)if(n||typeof e[r]=="undefined")e[r]=t[r];return e},n.callAll=function(e,t,r){var i;t=n.toArray(t),typeof e=="function"&&(e=[e]);if(n.isArray(e)){for(var s=0;s<e.length;s++)if(typeof e[s]=="function"){i=e[s].apply(r||this,t);if(i!=null)break}}else if(e)throw"FileDrop event list must be either an Array, Function, undefined or null but "+typeof e+" was given.";return i},n.callAllOfObject=function(e,t,r){if(n.logging&&n.hasConsole){var i=e.events[t]?e.events[t].length||0:0;console.info("FileDrop "+t+" event ("+i+") args:"),console.dir([r])}var s=[n.onObjectCall].concat(e.events.any),o=n.callAll(s,[t].concat(n.toArray(r)),e);return o!=null?o:n.callAll(e.events[t],r,e)},n.appendEventsToObject=function(e,t){if(n.addEventsToObject(this,!1,arguments))return this;switch(arguments.length){case 0:return n.extend({},this.events);case 1:if(e===null)return this.events={},this;if(n.isArray(e)){var r={};for(var i=0;i<e.length;i++)r[e[i]]=n.toArray(this.events[e[i]]);return r}if(typeof e=="function")return n.funcNS(e);if(typeof e=="string")return n.toArray(this.events[e]);case 2:e=n.toArray(e);if(t===null){for(var i=0;i<e.length;i++){var s=n.splitNS(e[i]);if(!s[0])for(var o in this.events)arguments.callee.call(this,[o+":"+s[1]],null);else if(!s[1])this.events[s[0]]=[];else if(this.events[s[0]])for(var u=this.events[s[0]].length-1;u>=0;u--)n.funcNS(this.events[s[0]][u])==s[1]&&this.events[s[0]].splice(u,1)}return this}}throw"Bad parameters for FileDrop event()."},n.previewToObject=function(e,t){if(n.addEventsToObject(this,!0,arguments))return this;throw"Bad parameters for FileDrop preview()."},n.addEventsToObject=function(e,t,r){var i=r[0],s=r[1];switch(r.length){case 1:if(i&&typeof i=="object"&&!n.isArray(i)){for(var o in i)arguments.callee(e,t,[o,i[o]]);return!0};case 2:if(typeof s=="function"||n.isArray(s)){i=n.toArray(i),s=n.toArray(s);var u=t?"unshift":"push";for(var a=0;a<i.length;a++){var f=n.splitNS(i[a]);for(var l=0;l<s.length;l++)n.funcNS(s[l],f[1]);e.events[f[0]]=e.events[f[0]]||[],e.events[f[0]][u].apply(e.events[f[0]],s)}return!0}}},n.funcNS=function(e,t){return typeof e!="function"?e:arguments.length==1?(e[n.nsProp]||"").toString():(e[n.nsProp]=(t||"").toString(),e)},n.splitNS=function(e){return(e||"").match(/^([^:]*):?(.*)$/).slice(1)},n.extend(n,{logging:!0,hasConsole:"console"in window&&console.log&&console.dir,onObjectCall:null,all:[],isIE6:!1,isIE9:!1,isChrome:(navigator.vendor||"").indexOf("Google")!=-1,nsProp:"_fdns"}),n.DropHandle=function(e,t){var r=this;r.el=e=n.byID(e);if(!e)throw"Cannot locate DOM node given to new FileDrop class.";r.opt={zoneClass:"fd-zone",inputClass:"fd-file",iframe:{url:"",callbackParam:"fd-callback",fileParam:"fd-file"},input:null,recreateInput:!0,fullDocDragDetect:!1,multiple:!1,dropEffect:"copy"},n.all.push(r),r.filedrop=null;var i=r.opt.iframe;n.extend(r.opt,t,!0),n.extend(r.opt.iframe,i),n.isChrome&&(r.opt.fullDocDragDetect=!0),r.events={any:[],dragEnter:[],dragLeave:[],dragOver:[],dragEnd:[],dragExit:[],upload:[],uploadElsewhere:[],inputSetup:[],iframeSetup:[],iframeDone:[]},r.on=r.events,r.zone=r.el,r.hook=function(e){r.opt.input!=0&&(r.opt.input=r.opt.input||r.prepareInput(e),r.opt.input&&n.callAllOfObject(r,"inputSetup",r.opt.input)),r.hookDragOn(e),r.hookDropOn(e)},r.hookDragOn=function(e){r.opt.fullDocDragDetect?(r.delegate(document.body,"dragEnter"),n.addEvent(document,"dragleave",function(e){if(e.clientX==0&&e.clientY==0||n.isTag(e.relatedTarget,"html"))n.stopEvent(e),n.callAllOfObject(r,"dragLeave",e)})):(r.delegate(e,"dragEnter"),r.delegate(e,"dragLeave")),r.delegate(e,"dragOver"),r.delegate(e,"dragEnd"),r.delegate(e,"dragExit")},r.hookDropOn=function(e){n.isIE9||r.delegate(e,"drop","upload")},r.delegate=function(e,t,i){n.addEvent(e,t.toLowerCase(),function(e){n.stopEvent(e),n.callAllOfObject(r,i||t,e)})},r.prepareInput=function(e){var t=r.findInputRecursive(e)||r.createInputAt(e);if(t){var i=t.parentNode;while(i&&!n.isTag(i,"form"))i=i.parentNode;if(!i)throw"FileDrop file input has no parent form element.";var s=i?i.getAttribute("target"):"";if(s&&n.isTag(n.byID(s),"iframe"))return{file:t,form:i}}return!1},r.findInputRecursive=function(e){for(var t=0
;t<e.childNodes.length;t++){var i=e.childNodes[t];if(n.isTag(i,"input")&&i.getAttribute("type")=="file"&&n.hasClass(i,r.opt.inputClass))return i;if(i=arguments.callee(i))return i}},r.createInputAt=function(e){do var t=n.randomID();while(n.byID(t));var i=document.createElement("div");i.innerHTML='<iframe src="javascript:false" name="'+t+'"></iframe>'+'<form method="post" enctype="multipart/form-data">'+'<input type="hidden" name="'+r.opt.iframe.callbackParam+'" />'+'<input type="file" name="'+r.opt.iframe.fileParam+'" />'+"</form>",i.firstChild.setAttribute("id",t),i.firstChild.style.display="none",i.lastChild.setAttribute("target",t);var s=e.firstChild;while(s&&(!n.isTag(s)||n.isTag(s,"legend")))s=s.nextSibling;return s?e.insertBefore(i,s):e.appendChild(i),i.lastChild.lastChild},r.abortIFrame=function(){if(r.opt.input.form){var e=n.byID(r.opt.input.form.getAttribute("target"));e&&e.setAttribute("src","javascript:false")}},r.sendViaIFrame=function(e){e=e||r.opt.iframe.url;var t=(r.opt.input||{}).form;if(e&&t){do var i=n.randomID();while(i in window);window[i]=function(t){typeof t!="object"&&(t={response:t,responseXML:"",responseText:(t||"").toString(),readyState:4,status:200,statusText:"OK",getAllResponseHeaders:function(){return""},getResponseHeader:function(){return""},setRequestHeader:function(){return this},statusCode:function(){return this},abort:function(){return this}}),n.extend(t,{iframe:!0,url:e}),n.callAllOfObject(r,"iframeDone",t)};var s=t.firstChild;while(s&&(!n.isTag(s,"input")||s.name!=r.opt.iframe.callbackParam))s=s.nextSibling;return s?s.value=i:e=e.replace(/[?&]+$/,"")+(e.indexOf("?")==-1?"?":"&")+r.opt.iframe.callbackParam+"="+i,t.setAttribute("action",e),n.callAllOfObject(r,"iframeSetup",t),t.submit(),setTimeout(r.resetForm,300),!0}},r.resetForm=function(){var e=r.opt.input&&r.opt.input.file;if(e){e.value="";if(r.opt.recreateInput){var t=r.opt.input.file=e.cloneNode(!0);e.parentNode.replaceChild(t,e),n.callAllOfObject(r,"inputSetup",[r.opt.input,e])}}},r.multiple=function(e){return r.opt.input&&typeof e!="undefined"&&(e?r.opt.input.file.setAttribute("multiple","multiple"):r.opt.input.file.removeAttribute("multiple")),r.opt.input&&!!r.opt.input.file.getAttribute("multiple")},r.event=function(e,t){return n.appendEventsToObject.apply(r,arguments)},r.preview=function(e,t){return n.previewToObject.apply(r,arguments)},r.onInputSetup=function(t,i){i?(t.file.clearAttributes&&t.file.clearAttributes(),t.file.mergeAttributes&&t.file.mergeAttributes(i)):r.multiple(r.opt.multiple),n.setClass(t.file,r.opt.inputClass),r.delegate(t.file,"change","upload");var s=t.file.parentNode;s&&s.style.display.match(/^(static)?$/)&&(s.style.position="relative");if(n.isTag(e,"fieldset")){var o=document.createElement("div");o.style.position="relative",o.style.overflow="hidden",e.parentNode.insertBefore(o,e),o.appendChild(e)}},r.onDragOver=function(e){n.stopEvent(e),e.dataTransfer&&(e.dataTransfer.dropEffect=r.opt.dropEffect)},r.onUpload=function(){for(var e=0;e<n.all.length;e++)n.all[e]!==r&&n.all[e].events&&n.callAllOfObject(n.all[e],"uploadElsewhere",r)},r.event({inputSetup:r.onInputSetup,dragOver:r.onDragOver,upload:r.onUpload}),n.setClass(e,r.opt.zoneClass),r.hook(e)},n.FileDrop=function(e,t){function i(t){return function(){n.setClass(e,r.opt.dragOverClass,t)}}var r=this;e=n.byID(e),r.handle=new n.DropHandle(e,t),r.handle.filedrop=r,n.extend(r.handle.opt,{dragOverClass:"over"}),n.extend(r.handle.opt.iframe,{force:!1}),n.extend(r.handle.events,{send:[],fileSetup:[]}),r.onUpload=function(e){var t=!r.opt.iframe.force&&r.eventFiles(e,!0);t?t.length>0&&n.callAllOfObject(r,"send",[t]):!r.handle.sendViaIFrame()&&n.hasConsole&&console.warn("FileDrop fallback upload triggered but iframe options were not configured - doing nothing.")},r.eventFiles=function(e,t){var i=new n.FileList(e);if(e.dataTransfer&&(e.dataTransfer.length||e.dataTransfer.files))var s=e.dataTransfer;else var s=e.target&&e.target.files||e.srcElement&&e.srcElement.files;if(s){var o=s.items||[];s.files&&(s=s.files);var u={};for(var a=0;a<s.length;a++){var f=new n.File(s[a]);if(!u[f.name]||f.name=="image.jpg")u[f.name]=!0,f.setNativeEntry(o[a]),n.callAllOfObject(r,"fileSetup",f),(f.size>0||f.nativeEntry)&&i.push(f)}}else t&&(i=!1);return i},n.extend(r,r.handle),r.event({upload:r.onUpload,send:r.resetForm,dragEnter:i(!0),dragLeave:i(!1),uploadElsewhere:i(!1)}),r.preview({upload:i(!1)})},n.FileList=function(e){var t=this;t.dropEffect=e&&e.dropEffect||"",t.length=0,e=null,t.push=function(e){return t[t.length++]=e,t},t.pop=function(){if(t.length>0){var e=t.last();return delete t[--t.length],e}},t.first=function(){return t[0]},t.last=function(){return t[t.length-1]},t.remove=function(e){for(;e<t.length-1;e++)t[e]=t[e+1];return se.f.pop(),t},t.clear=function(){for(var e=0;e<t.length;e++)delete t[e];return t.length=0,t},t.reverse=function(){for(var e=0;e<Math.floor(t.length/2);e++)t[e]=t[t.length-e-1];return t},t.concat=function(e){var r=new n.FileList;for(var i=0;i<t.length;i++)r[i]=t[i];for(var i=0;e&&i<e.length;i++)r[t.length+i+1]=e[i];return r.length=t.length+(e||[]).length,t},t.sort=function(e,n){for(var r=0;r<t.length;r++)for(var i=0;i<t.length;i++)if(e.call(n||this,t[r],t[i],r,i)<0){var s=t[r];t[r]=t[i],t[i]=s}return t},t.sortBy=function(e,n){var r=[];for(var i=0;i<t.length;i++)r.push([i,e.call(n||this,t[i],i)]);r.sort(function(e,t){return e[1]>t[1]?1:e[1]<t[1]?-1:0});for(var i=0;i<r.length;i++)t[i]=r[i][0];return t},t.find=function(e,n){for(var r=0;r<t.length;r++){var i=e.call(n||this,t[r],r);if(i!=null)return t[r]}},t.each=function(e,n){return t.find(function(){e.apply(this,arguments)},n),t},t.invoke=function(e,t){var r=n.toArray(arguments,1);return this.each(function(t){t[e].apply(t,r)})},t.abort=function(){return this.invoke("abort")},t.findCompare=function(e,n){var r,i=null,s;return t.each(function(t){if(i==null||i<(s=e.call(n,r)))r=t},n),r},t.filter=function(e,r){var i=new n.FileList;return t.each(function(t){e.apply(this,arguments)&&i
.push(t)},r),i},t.largest=function(){return t.findCompare(function(e){return e.size})},t.smallest=function(){return t.findCompare(function(e){return-e.size})},t.oldest=function(){return t.findCompare(function(e){return-e.modDate.getTime()})},t.newest=function(){return t.findCompare(function(e){return e.modDate})},t.ofType=function(e){return e+=e.indexOf("/")==-1?"/":"$",e=new RegExp("^"+e,"i"),t.filter(function(t){return e.test(t.type)})},t.images=function(){return t.ofType("image")},t.named=function(e){return typeof e=="string"?t.find(function(t){return t.name==e}):t.filter(function(t){return e.test(t.name)})}},n.FileList.prototype.length=0,n.FileList.prototype.splice=Array.prototype.splice,n.File=function(t){var r=this;r.nativeFile=t,r.nativeEntry=null,r.name=t.fileName||t.name||"",r.size=t.fileSize||t.size||0,r.type=r.mime=t.fileType||t.type||"",r.modDate=t.lastModifiedDate||new Date,r.xhr=null,r.opt={extraHeaders:!0,xRequestedWith:!0,method:"POST"},r.events={any:[],xhrSetup:[],xhrSend:[],progress:[],done:[],error:[]},r.events.sendXHR=r.events.xhrSend,r.abort=function(){return r.xhr&&r.xhr.abort&&r.xhr.abort(),r},r.sendTo=function(e,t){t=n.extend(t,r.opt),t.url=e;if(!r.size)n.hasConsole&&console.warn("Trying to send an empty FileDrop.File.");else if(window.FileReader){var i=new FileReader;i.onload=function(e){r.sendDataReadyTo(t,e)},i.onerror=function(e){n.callAllOfObject(r,"error",[e])},i.readAsArrayBuffer(r.nativeFile)}else r.sendDataReadyTo(t);return r},r.sendDataReadyTo=function(e,t){r.abort(),r.xhr=n.newXHR(),r.hookXHR(r.xhr),r.xhr.open(e.method,e.url,!0),r.xhr.overrideMimeType&&r.xhr.overrideMimeType("application/octet-stream"),r.xhr.setRequestHeader("Content-Type","application/octet-stream");if(e.extraHeaders){r.xhr.setRequestHeader("X-File-Name",encodeURIComponent(r.name)),r.xhr.setRequestHeader("X-File-Size",r.size),r.xhr.setRequestHeader("X-File-Type",r.type),r.xhr.setRequestHeader("X-File-Date",r.modDate.toGMTString());var i=e.xRequestedWith;if(i===!0){var s=window.FileReader?"FileAPI":"Webkit";i="FileDrop-XHR-"+s}i&&r.xhr.setRequestHeader("X-Requested-With",i)}n.callAllOfObject(r,"xhrSetup",[r.xhr,e]);var o=t&&t.target&&t.target.result?t.target.result:r.nativeFile;return n.callAllOfObject(r,"xhrSend",[r.xhr,o,e]),r.xhr},r.hookXHR=function(e){var t=e.upload||e;e.onreadystatechange=function(t){if(e.readyState==4){try{var i=e.status==200?"done":"error"}catch(t){var i="error"}var s=i=="error"?[t,e]:[e,t];n.callAllOfObject(r,i,s)}},t.onprogress=function(t){var i=t.lengthComputable?t.loaded:null;n.callAllOfObject(r,"progress",[i,t.total||null,e,t])}},r.readData=function(e,t,n){return r.read({onDone:e,onError:t,func:n})},r.readDataURL=function(e,t){return r.readData(e,t||!1,"uri")},r.readDataURI=r.readDataURL,r.read=function(t){function i(e,n){typeof n=="object"||(n.message=n),n.fdError=e,t.onError!==!1&&(t.onError||t.onDone).apply(this,arguments)}n.extend(t,{onDone:new Function,onError:null,blob:r.nativeFile,func:"",start:0,end:null,mime:""});if(!window.FileReader)return i("support",e);if(t.start>0||t.end!=null&&t.end)t.blob.slice?(t.end==null&&(t.end=t.blob.size||t.blob.fileSize),t.blob=t.blob.slice(t.start,t.end,t.mime)):n.hasConsole&&console.warn("File Blob/slice() are unsupported - operating on entire File.");var s=new FileReader;s.onerror=function(e){i("read",e)},s.onload=function(e){e.target&&e.target.result?(t.func=="readAsBinaryString"&&(e.target.result=String.fromCharCode.apply(null,new Uint8Array(e.target.result))),t.onDone(e.target.result)):s.onerror(e)};var o=t.func;if(n.isArray(o)){var u=o[0];return o[0]=t.blob,s[u].apply(s,o)}if(!o||o=="bin")o="readAsBinaryString";else if(o=="url"||o=="uri"||o=="src")o="readAsDataURL";else if(o=="array")o="readAsArrayBuffer";else if(o=="text")o="readAsText";else if(o.substr(0,4)!="read")return s.readAsText(t.blob,o);return o=="readAsBinaryString"&&(o="readAsArrayBuffer"),s[o](t.blob)},r.listEntries=function(e,t){if(r.nativeEntry&&r.nativeEntry.isDirectory){t=t||new Function;var i=r.nativeEntry.createReader(),s=new n.FileList,o=0;function u(t){o-=t,o==0&&e&&(e(s),e=null)}return i.readEntries(function(e){for(var r=0;r<e.length;r++){var a=e[r];a.file?(o++,a.file(function(e){var t=new n.File(e);t.setNativeEntry(a),s.push(t),u(1)},function(){s.push(n.File.fromEntry(a)),u(1),t.apply(this,arguments)})):s.push(n.File.fromEntry(a))}r?i.readEntries(arguments.callee,t):u(0)},t),!0}},r.setNativeEntry=function(e){r.nativeEntry=e&&e.webkitGetAsEntry&&e.webkitGetAsEntry()},r.event=function(e,t){return n.appendEventsToObject.apply(r,arguments)},r.preview=function(e,t){return n.previewToObject.apply(r,arguments)},r.onXhrSend=function(e,t){e.send(t)},r.event({xhrSend:r.onXhrSend})},n.File.fromEntry=function(e){var t=new n.File(e);return t.setNativeEntry(e),t.nativeFile=null,t},n.jQuery=function(e){e=e||jQuery||window.jQuery;if(!e)throw"No window.jQuery object to integrate FileDrop into.";e.fn.filedrop=function(t){function r(e,t){return function(r){var s=(t||[]).concat(n.toArray(arguments,1));return i.triggerHandler((e+r).toLowerCase(),s)}}var i=this,s=this.data("filedrop");if(typeof t=="string")if(!s)e.error("$.filedrop('comment') needs an initialized FilrDrop on this element.");else{if(typeof s[t]!="undefined"){var o=s[t];return typeof o=="function"?o.apply(s,n.toArray(arguments,1)):o}e.error("There's no method or property FileDrop."+t+".")}else if(!t||typeof t=="object")if(!s){var u=new FileDrop(this[0],t);u.$el=e(this),this.first().data("filedrop",u),u.event("any",r("fd")),u.on.fileSetup.push(function(e){e.event("any",r("file",[e]))})}else{if(!t)return s;n.extend(s.opt,t,!0)}else e.error("Invalid $.filedrop() parameter - expected nothing (creates new zone), a string (property to access) or an object (custom zone options).");return i}},t.FileDrop=n.FileDrop});

/* Chartist.js 0.11.0
 * Copyright © 2017 Gion Kunz
 * Free to use under either the WTFPL license or the MIT license.
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-WTFPL
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-MIT
 */

!function(a,b){"function"==typeof define&&define.amd?define("Chartist",[],function(){return a.Chartist=b()}):"object"==typeof module&&module.exports?module.exports=b():a.Chartist=b()}(this,function(){var a={version:"0.11.0"};return function(a,b,c){"use strict";c.namespaces={svg:"http://www.w3.org/2000/svg",xmlns:"http://www.w3.org/2000/xmlns/",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",ct:"http://gionkunz.github.com/chartist-js/ct"},c.noop=function(a){return a},c.alphaNumerate=function(a){return String.fromCharCode(97+a%26)},c.extend=function(a){var b,d,e;for(a=a||{},b=1;b<arguments.length;b++){d=arguments[b];for(var f in d)e=d[f],"object"!=typeof e||null===e||e instanceof Array?a[f]=e:a[f]=c.extend(a[f],e)}return a},c.replaceAll=function(a,b,c){return a.replace(new RegExp(b,"g"),c)},c.ensureUnit=function(a,b){return"number"==typeof a&&(a+=b),a},c.quantity=function(a){if("string"==typeof a){var b=/^(\d+)\s*(.*)$/g.exec(a);return{value:+b[1],unit:b[2]||void 0}}return{value:a}},c.querySelector=function(a){return a instanceof Node?a:b.querySelector(a)},c.times=function(a){return Array.apply(null,new Array(a))},c.sum=function(a,b){return a+(b?b:0)},c.mapMultiply=function(a){return function(b){return b*a}},c.mapAdd=function(a){return function(b){return b+a}},c.serialMap=function(a,b){var d=[],e=Math.max.apply(null,a.map(function(a){return a.length}));return c.times(e).forEach(function(c,e){var f=a.map(function(a){return a[e]});d[e]=b.apply(null,f)}),d},c.roundWithPrecision=function(a,b){var d=Math.pow(10,b||c.precision);return Math.round(a*d)/d},c.precision=8,c.escapingMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"},c.serialize=function(a){return null===a||void 0===a?a:("number"==typeof a?a=""+a:"object"==typeof a&&(a=JSON.stringify({data:a})),Object.keys(c.escapingMap).reduce(function(a,b){return c.replaceAll(a,b,c.escapingMap[b])},a))},c.deserialize=function(a){if("string"!=typeof a)return a;a=Object.keys(c.escapingMap).reduce(function(a,b){return c.replaceAll(a,c.escapingMap[b],b)},a);try{a=JSON.parse(a),a=void 0!==a.data?a.data:a}catch(b){}return a},c.createSvg=function(a,b,d,e){var f;return b=b||"100%",d=d||"100%",Array.prototype.slice.call(a.querySelectorAll("svg")).filter(function(a){return a.getAttributeNS(c.namespaces.xmlns,"ct")}).forEach(function(b){a.removeChild(b)}),f=new c.Svg("svg").attr({width:b,height:d}).addClass(e),f._node.style.width=b,f._node.style.height=d,a.appendChild(f._node),f},c.normalizeData=function(a,b,d){var e,f={raw:a,normalized:{}};return f.normalized.series=c.getDataArray({series:a.series||[]},b,d),e=f.normalized.series.every(function(a){return a instanceof Array})?Math.max.apply(null,f.normalized.series.map(function(a){return a.length})):f.normalized.series.length,f.normalized.labels=(a.labels||[]).slice(),Array.prototype.push.apply(f.normalized.labels,c.times(Math.max(0,e-f.normalized.labels.length)).map(function(){return""})),b&&c.reverseData(f.normalized),f},c.safeHasProperty=function(a,b){return null!==a&&"object"==typeof a&&a.hasOwnProperty(b)},c.isDataHoleValue=function(a){return null===a||void 0===a||"number"==typeof a&&isNaN(a)},c.reverseData=function(a){a.labels.reverse(),a.series.reverse();for(var b=0;b<a.series.length;b++)"object"==typeof a.series[b]&&void 0!==a.series[b].data?a.series[b].data.reverse():a.series[b]instanceof Array&&a.series[b].reverse()},c.getDataArray=function(a,b,d){function e(a){if(c.safeHasProperty(a,"value"))return e(a.value);if(c.safeHasProperty(a,"data"))return e(a.data);if(a instanceof Array)return a.map(e);if(!c.isDataHoleValue(a)){if(d){var b={};return"string"==typeof d?b[d]=c.getNumberOrUndefined(a):b.y=c.getNumberOrUndefined(a),b.x=a.hasOwnProperty("x")?c.getNumberOrUndefined(a.x):b.x,b.y=a.hasOwnProperty("y")?c.getNumberOrUndefined(a.y):b.y,b}return c.getNumberOrUndefined(a)}}return a.series.map(e)},c.normalizePadding=function(a,b){return b=b||0,"number"==typeof a?{top:a,right:a,bottom:a,left:a}:{top:"number"==typeof a.top?a.top:b,right:"number"==typeof a.right?a.right:b,bottom:"number"==typeof a.bottom?a.bottom:b,left:"number"==typeof a.left?a.left:b}},c.getMetaData=function(a,b){var c=a.data?a.data[b]:a[b];return c?c.meta:void 0},c.orderOfMagnitude=function(a){return Math.floor(Math.log(Math.abs(a))/Math.LN10)},c.projectLength=function(a,b,c){return b/c.range*a},c.getAvailableHeight=function(a,b){return Math.max((c.quantity(b.height).value||a.height())-(b.chartPadding.top+b.chartPadding.bottom)-b.axisX.offset,0)},c.getHighLow=function(a,b,d){function e(a){if(void 0!==a)if(a instanceof Array)for(var b=0;b<a.length;b++)e(a[b]);else{var c=d?+a[d]:+a;g&&c>f.high&&(f.high=c),h&&c<f.low&&(f.low=c)}}b=c.extend({},b,d?b["axis"+d.toUpperCase()]:{});var f={high:void 0===b.high?-Number.MAX_VALUE:+b.high,low:void 0===b.low?Number.MAX_VALUE:+b.low},g=void 0===b.high,h=void 0===b.low;return(g||h)&&e(a),(b.referenceValue||0===b.referenceValue)&&(f.high=Math.max(b.referenceValue,f.high),f.low=Math.min(b.referenceValue,f.low)),f.high<=f.low&&(0===f.low?f.high=1:f.low<0?f.high=0:f.high>0?f.low=0:(f.high=1,f.low=0)),f},c.isNumeric=function(a){return null!==a&&isFinite(a)},c.isFalseyButZero=function(a){return!a&&0!==a},c.getNumberOrUndefined=function(a){return c.isNumeric(a)?+a:void 0},c.isMultiValue=function(a){return"object"==typeof a&&("x"in a||"y"in a)},c.getMultiValue=function(a,b){return c.isMultiValue(a)?c.getNumberOrUndefined(a[b||"y"]):c.getNumberOrUndefined(a)},c.rho=function(a){function b(a,c){return a%c===0?c:b(c,a%c)}function c(a){return a*a+1}if(1===a)return a;var d,e=2,f=2;if(a%2===0)return 2;do e=c(e)%a,f=c(c(f))%a,d=b(Math.abs(e-f),a);while(1===d);return d},c.getBounds=function(a,b,d,e){function f(a,b){return a===(a+=b)&&(a*=1+(b>0?o:-o)),a}var g,h,i,j=0,k={high:b.high,low:b.low};k.valueRange=k.high-k.low,k.oom=c.orderOfMagnitude(k.valueRange),k.step=Math.pow(10,k.oom),k.min=Math.floor(k.low/k.step)*k.step,k.max=Math.ceil(k.high/k.step)*k.step,k.range=k.max-k.min,k.numberOfSteps=Math.round(k.range/k.step);var l=c.projectLength(a,k.step,k),m=l<d,n=e?c.rho(k.range):0;if(e&&c.projectLength(a,1,k)>=d)k.step=1;else if(e&&n<k.step&&c.projectLength(a,n,k)>=d)k.step=n;else for(;;){if(m&&c.projectLength(a,k.step,k)<=d)k.step*=2;else{if(m||!(c.projectLength(a,k.step/2,k)>=d))break;if(k.step/=2,e&&k.step%1!==0){k.step*=2;break}}if(j++>1e3)throw new Error("Exceeded maximum number of iterations while optimizing scale step!")}var o=2.221e-16;for(k.step=Math.max(k.step,o),h=k.min,i=k.max;h+k.step<=k.low;)h=f(h,k.step);for(;i-k.step>=k.high;)i=f(i,-k.step);k.min=h,k.max=i,k.range=k.max-k.min;var p=[];for(g=k.min;g<=k.max;g=f(g,k.step)){var q=c.roundWithPrecision(g);q!==p[p.length-1]&&p.push(q)}return k.values=p,k},c.polarToCartesian=function(a,b,c,d){var e=(d-90)*Math.PI/180;return{x:a+c*Math.cos(e),y:b+c*Math.sin(e)}},c.createChartRect=function(a,b,d){var e=!(!b.axisX&&!b.axisY),f=e?b.axisY.offset:0,g=e?b.axisX.offset:0,h=a.width()||c.quantity(b.width).value||0,i=a.height()||c.quantity(b.height).value||0,j=c.normalizePadding(b.chartPadding,d);h=Math.max(h,f+j.left+j.right),i=Math.max(i,g+j.top+j.bottom);var k={padding:j,width:function(){return this.x2-this.x1},height:function(){return this.y1-this.y2}};return e?("start"===b.axisX.position?(k.y2=j.top+g,k.y1=Math.max(i-j.bottom,k.y2+1)):(k.y2=j.top,k.y1=Math.max(i-j.bottom-g,k.y2+1)),"start"===b.axisY.position?(k.x1=j.left+f,k.x2=Math.max(h-j.right,k.x1+1)):(k.x1=j.left,k.x2=Math.max(h-j.right-f,k.x1+1))):(k.x1=j.left,k.x2=Math.max(h-j.right,k.x1+1),k.y2=j.top,k.y1=Math.max(i-j.bottom,k.y2+1)),k},c.createGrid=function(a,b,d,e,f,g,h,i){var j={};j[d.units.pos+"1"]=a,j[d.units.pos+"2"]=a,j[d.counterUnits.pos+"1"]=e,j[d.counterUnits.pos+"2"]=e+f;var k=g.elem("line",j,h.join(" "));i.emit("draw",c.extend({type:"grid",axis:d,index:b,group:g,element:k},j))},c.createGridBackground=function(a,b,c,d){var e=a.elem("rect",{x:b.x1,y:b.y2,width:b.width(),height:b.height()},c,!0);d.emit("draw",{type:"gridBackground",group:a,element:e})},c.createLabel=function(a,d,e,f,g,h,i,j,k,l,m){var n,o={};if(o[g.units.pos]=a+i[g.units.pos],o[g.counterUnits.pos]=i[g.counterUnits.pos],o[g.units.len]=d,o[g.counterUnits.len]=Math.max(0,h-10),l){var p=b.createElement("span");p.className=k.join(" "),p.setAttribute("xmlns",c.namespaces.xhtml),p.innerText=f[e],p.style[g.units.len]=Math.round(o[g.units.len])+"px",p.style[g.counterUnits.len]=Math.round(o[g.counterUnits.len])+"px",n=j.foreignObject(p,c.extend({style:"overflow: visible;"},o))}else n=j.elem("text",o,k.join(" ")).text(f[e]);m.emit("draw",c.extend({type:"label",axis:g,index:e,group:j,element:n,text:f[e]},o))},c.getSeriesOption=function(a,b,c){if(a.name&&b.series&&b.series[a.name]){var d=b.series[a.name];return d.hasOwnProperty(c)?d[c]:b[c]}return b[c]},c.optionsProvider=function(b,d,e){function f(b){var f=h;if(h=c.extend({},j),d)for(i=0;i<d.length;i++){var g=a.matchMedia(d[i][0]);g.matches&&(h=c.extend(h,d[i][1]))}e&&b&&e.emit("optionsChanged",{previousOptions:f,currentOptions:h})}function g(){k.forEach(function(a){a.removeListener(f)})}var h,i,j=c.extend({},b),k=[];if(!a.matchMedia)throw"window.matchMedia not found! Make sure you're using a polyfill.";if(d)for(i=0;i<d.length;i++){var l=a.matchMedia(d[i][0]);l.addListener(f),k.push(l)}return f(),{removeMediaQueryListeners:g,getCurrentOptions:function(){return c.extend({},h)}}},c.splitIntoSegments=function(a,b,d){var e={increasingX:!1,fillHoles:!1};d=c.extend({},e,d);for(var f=[],g=!0,h=0;h<a.length;h+=2)void 0===c.getMultiValue(b[h/2].value)?d.fillHoles||(g=!0):(d.increasingX&&h>=2&&a[h]<=a[h-2]&&(g=!0),g&&(f.push({pathCoordinates:[],valueData:[]}),g=!1),f[f.length-1].pathCoordinates.push(a[h],a[h+1]),f[f.length-1].valueData.push(b[h/2]));return f}}(window,document,a),function(a,b,c){"use strict";c.Interpolation={},c.Interpolation.none=function(a){var b={fillHoles:!1};return a=c.extend({},b,a),function(b,d){for(var e=new c.Svg.Path,f=!0,g=0;g<b.length;g+=2){var h=b[g],i=b[g+1],j=d[g/2];void 0!==c.getMultiValue(j.value)?(f?e.move(h,i,!1,j):e.line(h,i,!1,j),f=!1):a.fillHoles||(f=!0)}return e}},c.Interpolation.simple=function(a){var b={divisor:2,fillHoles:!1};a=c.extend({},b,a);var d=1/Math.max(1,a.divisor);return function(b,e){for(var f,g,h,i=new c.Svg.Path,j=0;j<b.length;j+=2){var k=b[j],l=b[j+1],m=(k-f)*d,n=e[j/2];void 0!==n.value?(void 0===h?i.move(k,l,!1,n):i.curve(f+m,g,k-m,l,k,l,!1,n),f=k,g=l,h=n):a.fillHoles||(f=k=h=void 0)}return i}},c.Interpolation.cardinal=function(a){var b={tension:1,fillHoles:!1};a=c.extend({},b,a);var d=Math.min(1,Math.max(0,a.tension)),e=1-d;return function f(b,g){var h=c.splitIntoSegments(b,g,{fillHoles:a.fillHoles});if(h.length){if(h.length>1){var i=[];return h.forEach(function(a){i.push(f(a.pathCoordinates,a.valueData))}),c.Svg.Path.join(i)}if(b=h[0].pathCoordinates,g=h[0].valueData,b.length<=4)return c.Interpolation.none()(b,g);for(var j,k=(new c.Svg.Path).move(b[0],b[1],!1,g[0]),l=0,m=b.length;m-2*!j>l;l+=2){var n=[{x:+b[l-2],y:+b[l-1]},{x:+b[l],y:+b[l+1]},{x:+b[l+2],y:+b[l+3]},{x:+b[l+4],y:+b[l+5]}];j?l?m-4===l?n[3]={x:+b[0],y:+b[1]}:m-2===l&&(n[2]={x:+b[0],y:+b[1]},n[3]={x:+b[2],y:+b[3]}):n[0]={x:+b[m-2],y:+b[m-1]}:m-4===l?n[3]=n[2]:l||(n[0]={x:+b[l],y:+b[l+1]}),k.curve(d*(-n[0].x+6*n[1].x+n[2].x)/6+e*n[2].x,d*(-n[0].y+6*n[1].y+n[2].y)/6+e*n[2].y,d*(n[1].x+6*n[2].x-n[3].x)/6+e*n[2].x,d*(n[1].y+6*n[2].y-n[3].y)/6+e*n[2].y,n[2].x,n[2].y,!1,g[(l+2)/2])}return k}return c.Interpolation.none()([])}},c.Interpolation.monotoneCubic=function(a){var b={fillHoles:!1};return a=c.extend({},b,a),function d(b,e){var f=c.splitIntoSegments(b,e,{fillHoles:a.fillHoles,increasingX:!0});if(f.length){if(f.length>1){var g=[];return f.forEach(function(a){g.push(d(a.pathCoordinates,a.valueData))}),c.Svg.Path.join(g)}if(b=f[0].pathCoordinates,e=f[0].valueData,b.length<=4)return c.Interpolation.none()(b,e);var h,i,j=[],k=[],l=b.length/2,m=[],n=[],o=[],p=[];for(h=0;h<l;h++)j[h]=b[2*h],k[h]=b[2*h+1];for(h=0;h<l-1;h++)o[h]=k[h+1]-k[h],p[h]=j[h+1]-j[h],n[h]=o[h]/p[h];for(m[0]=n[0],m[l-1]=n[l-2],h=1;h<l-1;h++)0===n[h]||0===n[h-1]||n[h-1]>0!=n[h]>0?m[h]=0:(m[h]=3*(p[h-1]+p[h])/((2*p[h]+p[h-1])/n[h-1]+(p[h]+2*p[h-1])/n[h]),isFinite(m[h])||(m[h]=0));for(i=(new c.Svg.Path).move(j[0],k[0],!1,e[0]),h=0;h<l-1;h++)i.curve(j[h]+p[h]/3,k[h]+m[h]*p[h]/3,j[h+1]-p[h]/3,k[h+1]-m[h+1]*p[h]/3,j[h+1],k[h+1],!1,e[h+1]);return i}return c.Interpolation.none()([])}},c.Interpolation.step=function(a){var b={postpone:!0,fillHoles:!1};return a=c.extend({},b,a),function(b,d){for(var e,f,g,h=new c.Svg.Path,i=0;i<b.length;i+=2){var j=b[i],k=b[i+1],l=d[i/2];void 0!==l.value?(void 0===g?h.move(j,k,!1,l):(a.postpone?h.line(j,f,!1,g):h.line(e,k,!1,l),h.line(j,k,!1,l)),e=j,f=k,g=l):a.fillHoles||(e=f=g=void 0)}return h}}}(window,document,a),function(a,b,c){"use strict";c.EventEmitter=function(){function a(a,b){d[a]=d[a]||[],d[a].push(b)}function b(a,b){d[a]&&(b?(d[a].splice(d[a].indexOf(b),1),0===d[a].length&&delete d[a]):delete d[a])}function c(a,b){d[a]&&d[a].forEach(function(a){a(b)}),d["*"]&&d["*"].forEach(function(c){c(a,b)})}var d=[];return{addEventHandler:a,removeEventHandler:b,emit:c}}}(window,document,a),function(a,b,c){"use strict";function d(a){var b=[];if(a.length)for(var c=0;c<a.length;c++)b.push(a[c]);return b}function e(a,b){var d=b||this.prototype||c.Class,e=Object.create(d);c.Class.cloneDefinitions(e,a);var f=function(){var a,b=e.constructor||function(){};return a=this===c?Object.create(e):this,b.apply(a,Array.prototype.slice.call(arguments,0)),a};return f.prototype=e,f["super"]=d,f.extend=this.extend,f}function f(){var a=d(arguments),b=a[0];return a.splice(1,a.length-1).forEach(function(a){Object.getOwnPropertyNames(a).forEach(function(c){delete b[c],Object.defineProperty(b,c,Object.getOwnPropertyDescriptor(a,c))})}),b}c.Class={extend:e,cloneDefinitions:f}}(window,document,a),function(a,b,c){"use strict";function d(a,b,d){return a&&(this.data=a||{},this.data.labels=this.data.labels||[],this.data.series=this.data.series||[],this.eventEmitter.emit("data",{type:"update",data:this.data})),b&&(this.options=c.extend({},d?this.options:this.defaultOptions,b),this.initializeTimeoutId||(this.optionsProvider.removeMediaQueryListeners(),this.optionsProvider=c.optionsProvider(this.options,this.responsiveOptions,this.eventEmitter))),this.initializeTimeoutId||this.createChart(this.optionsProvider.getCurrentOptions()),this}function e(){return this.initializeTimeoutId?a.clearTimeout(this.initializeTimeoutId):(a.removeEventListener("resize",this.resizeListener),this.optionsProvider.removeMediaQueryListeners()),this}function f(a,b){return this.eventEmitter.addEventHandler(a,b),this}function g(a,b){return this.eventEmitter.removeEventHandler(a,b),this}function h(){a.addEventListener("resize",this.resizeListener),this.optionsProvider=c.optionsProvider(this.options,this.responsiveOptions,this.eventEmitter),this.eventEmitter.addEventHandler("optionsChanged",function(){this.update()}.bind(this)),this.options.plugins&&this.options.plugins.forEach(function(a){a instanceof Array?a[0](this,a[1]):a(this)}.bind(this)),this.eventEmitter.emit("data",{type:"initial",data:this.data}),this.createChart(this.optionsProvider.getCurrentOptions()),this.initializeTimeoutId=void 0}function i(a,b,d,e,f){this.container=c.querySelector(a),this.data=b||{},this.data.labels=this.data.labels||[],this.data.series=this.data.series||[],this.defaultOptions=d,this.options=e,this.responsiveOptions=f,this.eventEmitter=c.EventEmitter(),this.supportsForeignObject=c.Svg.isSupported("Extensibility"),this.supportsAnimations=c.Svg.isSupported("AnimationEventsAttribute"),this.resizeListener=function(){this.update()}.bind(this),this.container&&(this.container.__chartist__&&this.container.__chartist__.detach(),this.container.__chartist__=this),this.initializeTimeoutId=setTimeout(h.bind(this),0)}c.Base=c.Class.extend({constructor:i,optionsProvider:void 0,container:void 0,svg:void 0,eventEmitter:void 0,createChart:function(){throw new Error("Base chart type can't be instantiated!")},update:d,detach:e,on:f,off:g,version:c.version,supportsForeignObject:!1})}(window,document,a),function(a,b,c){"use strict";function d(a,d,e,f,g){a instanceof Element?this._node=a:(this._node=b.createElementNS(c.namespaces.svg,a),"svg"===a&&this.attr({"xmlns:ct":c.namespaces.ct})),d&&this.attr(d),e&&this.addClass(e),f&&(g&&f._node.firstChild?f._node.insertBefore(this._node,f._node.firstChild):f._node.appendChild(this._node))}function e(a,b){return"string"==typeof a?b?this._node.getAttributeNS(b,a):this._node.getAttribute(a):(Object.keys(a).forEach(function(b){if(void 0!==a[b])if(b.indexOf(":")!==-1){var d=b.split(":");this._node.setAttributeNS(c.namespaces[d[0]],b,a[b])}else this._node.setAttribute(b,a[b])}.bind(this)),this)}function f(a,b,d,e){return new c.Svg(a,b,d,this,e)}function g(){return this._node.parentNode instanceof SVGElement?new c.Svg(this._node.parentNode):null}function h(){for(var a=this._node;"svg"!==a.nodeName;)a=a.parentNode;return new c.Svg(a)}function i(a){var b=this._node.querySelector(a);return b?new c.Svg(b):null}function j(a){var b=this._node.querySelectorAll(a);return b.length?new c.Svg.List(b):null}function k(){return this._node}function l(a,d,e,f){if("string"==typeof a){var g=b.createElement("div");g.innerHTML=a,a=g.firstChild}a.setAttribute("xmlns",c.namespaces.xmlns);var h=this.elem("foreignObject",d,e,f);return h._node.appendChild(a),h}function m(a){return this._node.appendChild(b.createTextNode(a)),this}function n(){for(;this._node.firstChild;)this._node.removeChild(this._node.firstChild);return this}function o(){return this._node.parentNode.removeChild(this._node),this.parent()}function p(a){return this._node.parentNode.replaceChild(a._node,this._node),a}function q(a,b){return b&&this._node.firstChild?this._node.insertBefore(a._node,this._node.firstChild):this._node.appendChild(a._node),this}function r(){return this._node.getAttribute("class")?this._node.getAttribute("class").trim().split(/\s+/):[]}function s(a){return this._node.setAttribute("class",this.classes(this._node).concat(a.trim().split(/\s+/)).filter(function(a,b,c){return c.indexOf(a)===b}).join(" ")),this}function t(a){var b=a.trim().split(/\s+/);return this._node.setAttribute("class",this.classes(this._node).filter(function(a){return b.indexOf(a)===-1}).join(" ")),this}function u(){return this._node.setAttribute("class",""),this}function v(){return this._node.getBoundingClientRect().height}function w(){return this._node.getBoundingClientRect().width}function x(a,b,d){return void 0===b&&(b=!0),Object.keys(a).forEach(function(e){function f(a,b){var f,g,h,i={};a.easing&&(h=a.easing instanceof Array?a.easing:c.Svg.Easing[a.easing],delete a.easing),a.begin=c.ensureUnit(a.begin,"ms"),a.dur=c.ensureUnit(a.dur,"ms"),h&&(a.calcMode="spline",a.keySplines=h.join(" "),a.keyTimes="0;1"),b&&(a.fill="freeze",i[e]=a.from,this.attr(i),g=c.quantity(a.begin||0).value,a.begin="indefinite"),f=this.elem("animate",c.extend({attributeName:e},a)),b&&setTimeout(function(){try{f._node.beginElement()}catch(b){i[e]=a.to,this.attr(i),f.remove()}}.bind(this),g),d&&f._node.addEventListener("beginEvent",function(){d.emit("animationBegin",{element:this,animate:f._node,params:a})}.bind(this)),f._node.addEventListener("endEvent",function(){d&&d.emit("animationEnd",{element:this,animate:f._node,params:a}),b&&(i[e]=a.to,this.attr(i),f.remove())}.bind(this))}a[e]instanceof Array?a[e].forEach(function(a){f.bind(this)(a,!1)}.bind(this)):f.bind(this)(a[e],b)}.bind(this)),this}function y(a){var b=this;this.svgElements=[];for(var d=0;d<a.length;d++)this.svgElements.push(new c.Svg(a[d]));Object.keys(c.Svg.prototype).filter(function(a){return["constructor","parent","querySelector","querySelectorAll","replace","append","classes","height","width"].indexOf(a)===-1}).forEach(function(a){b[a]=function(){var d=Array.prototype.slice.call(arguments,0);return b.svgElements.forEach(function(b){c.Svg.prototype[a].apply(b,d)}),b}})}c.Svg=c.Class.extend({constructor:d,attr:e,elem:f,parent:g,root:h,querySelector:i,querySelectorAll:j,getNode:k,foreignObject:l,text:m,empty:n,remove:o,replace:p,append:q,classes:r,addClass:s,removeClass:t,removeAllClasses:u,height:v,width:w,animate:x}),c.Svg.isSupported=function(a){return b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#"+a,"1.1")};var z={easeInSine:[.47,0,.745,.715],easeOutSine:[.39,.575,.565,1],easeInOutSine:[.445,.05,.55,.95],easeInQuad:[.55,.085,.68,.53],easeOutQuad:[.25,.46,.45,.94],easeInOutQuad:[.455,.03,.515,.955],easeInCubic:[.55,.055,.675,.19],easeOutCubic:[.215,.61,.355,1],easeInOutCubic:[.645,.045,.355,1],easeInQuart:[.895,.03,.685,.22],easeOutQuart:[.165,.84,.44,1],easeInOutQuart:[.77,0,.175,1],easeInQuint:[.755,.05,.855,.06],easeOutQuint:[.23,1,.32,1],easeInOutQuint:[.86,0,.07,1],easeInExpo:[.95,.05,.795,.035],easeOutExpo:[.19,1,.22,1],easeInOutExpo:[1,0,0,1],easeInCirc:[.6,.04,.98,.335],easeOutCirc:[.075,.82,.165,1],easeInOutCirc:[.785,.135,.15,.86],easeInBack:[.6,-.28,.735,.045],easeOutBack:[.175,.885,.32,1.275],easeInOutBack:[.68,-.55,.265,1.55]};c.Svg.Easing=z,c.Svg.List=c.Class.extend({constructor:y})}(window,document,a),function(a,b,c){"use strict";function d(a,b,d,e,f,g){var h=c.extend({command:f?a.toLowerCase():a.toUpperCase()},b,g?{data:g}:{});d.splice(e,0,h)}function e(a,b){a.forEach(function(c,d){u[c.command.toLowerCase()].forEach(function(e,f){b(c,e,d,f,a)})})}function f(a,b){this.pathElements=[],this.pos=0,this.close=a,this.options=c.extend({},v,b)}function g(a){return void 0!==a?(this.pos=Math.max(0,Math.min(this.pathElements.length,a)),this):this.pos}function h(a){return this.pathElements.splice(this.pos,a),this}function i(a,b,c,e){return d("M",{x:+a,y:+b},this.pathElements,this.pos++,c,e),this}function j(a,b,c,e){return d("L",{x:+a,y:+b},this.pathElements,this.pos++,c,e),this}function k(a,b,c,e,f,g,h,i){return d("C",{x1:+a,y1:+b,x2:+c,y2:+e,x:+f,y:+g},this.pathElements,this.pos++,h,i),this}function l(a,b,c,e,f,g,h,i,j){return d("A",{rx:+a,ry:+b,xAr:+c,lAf:+e,sf:+f,x:+g,y:+h},this.pathElements,this.pos++,i,j),this}function m(a){var b=a.replace(/([A-Za-z])([0-9])/g,"$1 $2").replace(/([0-9])([A-Za-z])/g,"$1 $2").split(/[\s,]+/).reduce(function(a,b){return b.match(/[A-Za-z]/)&&a.push([]),a[a.length-1].push(b),a},[]);"Z"===b[b.length-1][0].toUpperCase()&&b.pop();var d=b.map(function(a){var b=a.shift(),d=u[b.toLowerCase()];return c.extend({command:b},d.reduce(function(b,c,d){return b[c]=+a[d],b},{}))}),e=[this.pos,0];return Array.prototype.push.apply(e,d),Array.prototype.splice.apply(this.pathElements,e),this.pos+=d.length,this}function n(){var a=Math.pow(10,this.options.accuracy);return this.pathElements.reduce(function(b,c){var d=u[c.command.toLowerCase()].map(function(b){return this.options.accuracy?Math.round(c[b]*a)/a:c[b]}.bind(this));return b+c.command+d.join(",")}.bind(this),"")+(this.close?"Z":"")}function o(a,b){return e(this.pathElements,function(c,d){c[d]*="x"===d[0]?a:b}),this}function p(a,b){return e(this.pathElements,function(c,d){c[d]+="x"===d[0]?a:b}),this}function q(a){return e(this.pathElements,function(b,c,d,e,f){var g=a(b,c,d,e,f);(g||0===g)&&(b[c]=g)}),this}function r(a){var b=new c.Svg.Path(a||this.close);return b.pos=this.pos,b.pathElements=this.pathElements.slice().map(function(a){return c.extend({},a)}),b.options=c.extend({},this.options),b}function s(a){var b=[new c.Svg.Path];return this.pathElements.forEach(function(d){d.command===a.toUpperCase()&&0!==b[b.length-1].pathElements.length&&b.push(new c.Svg.Path),b[b.length-1].pathElements.push(d)}),b}function t(a,b,d){for(var e=new c.Svg.Path(b,d),f=0;f<a.length;f++)for(var g=a[f],h=0;h<g.pathElements.length;h++)e.pathElements.push(g.pathElements[h]);return e}var u={m:["x","y"],l:["x","y"],c:["x1","y1","x2","y2","x","y"],a:["rx","ry","xAr","lAf","sf","x","y"]},v={accuracy:3};c.Svg.Path=c.Class.extend({constructor:f,position:g,remove:h,move:i,line:j,curve:k,arc:l,scale:o,translate:p,transform:q,parse:m,stringify:n,clone:r,splitByCommand:s}),c.Svg.Path.elementDescriptions=u,c.Svg.Path.join=t}(window,document,a),function(a,b,c){"use strict";function d(a,b,c,d){this.units=a,this.counterUnits=a===f.x?f.y:f.x,this.chartRect=b,this.axisLength=b[a.rectEnd]-b[a.rectStart],this.gridOffset=b[a.rectOffset],this.ticks=c,this.options=d}function e(a,b,d,e,f){var g=e["axis"+this.units.pos.toUpperCase()],h=this.ticks.map(this.projectValue.bind(this)),i=this.ticks.map(g.labelInterpolationFnc);h.forEach(function(j,k){var l,m={x:0,y:0};l=h[k+1]?h[k+1]-j:Math.max(this.axisLength-j,30),c.isFalseyButZero(i[k])&&""!==i[k]||("x"===this.units.pos?(j=this.chartRect.x1+j,m.x=e.axisX.labelOffset.x,"start"===e.axisX.position?m.y=this.chartRect.padding.top+e.axisX.labelOffset.y+(d?5:20):m.y=this.chartRect.y1+e.axisX.labelOffset.y+(d?5:20)):(j=this.chartRect.y1-j,m.y=e.axisY.labelOffset.y-(d?l:0),"start"===e.axisY.position?m.x=d?this.chartRect.padding.left+e.axisY.labelOffset.x:this.chartRect.x1-10:m.x=this.chartRect.x2+e.axisY.labelOffset.x+10),g.showGrid&&c.createGrid(j,k,this,this.gridOffset,this.chartRect[this.counterUnits.len](),a,[e.classNames.grid,e.classNames[this.units.dir]],f),g.showLabel&&c.createLabel(j,l,k,i,this,g.offset,m,b,[e.classNames.label,e.classNames[this.units.dir],"start"===g.position?e.classNames[g.position]:e.classNames.end],d,f))}.bind(this))}var f={x:{pos:"x",len:"width",dir:"horizontal",rectStart:"x1",rectEnd:"x2",rectOffset:"y2"},y:{pos:"y",len:"height",dir:"vertical",rectStart:"y2",rectEnd:"y1",rectOffset:"x1"}};c.Axis=c.Class.extend({constructor:d,createGridAndLabels:e,projectValue:function(a,b,c){throw new Error("Base axis can't be instantiated!")}}),c.Axis.units=f}(window,document,a),function(a,b,c){"use strict";function d(a,b,d,e){var f=e.highLow||c.getHighLow(b,e,a.pos);this.bounds=c.getBounds(d[a.rectEnd]-d[a.rectStart],f,e.scaleMinSpace||20,e.onlyInteger),this.range={min:this.bounds.min,max:this.bounds.max},c.AutoScaleAxis["super"].constructor.call(this,a,d,this.bounds.values,e)}function e(a){return this.axisLength*(+c.getMultiValue(a,this.units.pos)-this.bounds.min)/this.bounds.range}c.AutoScaleAxis=c.Axis.extend({constructor:d,projectValue:e})}(window,document,a),function(a,b,c){"use strict";function d(a,b,d,e){var f=e.highLow||c.getHighLow(b,e,a.pos);this.divisor=e.divisor||1,this.ticks=e.ticks||c.times(this.divisor).map(function(a,b){return f.low+(f.high-f.low)/this.divisor*b}.bind(this)),this.ticks.sort(function(a,b){return a-b}),this.range={min:f.low,max:f.high},c.FixedScaleAxis["super"].constructor.call(this,a,d,this.ticks,e),this.stepLength=this.axisLength/this.divisor}function e(a){return this.axisLength*(+c.getMultiValue(a,this.units.pos)-this.range.min)/(this.range.max-this.range.min)}c.FixedScaleAxis=c.Axis.extend({constructor:d,projectValue:e})}(window,document,a),function(a,b,c){"use strict";function d(a,b,d,e){c.StepAxis["super"].constructor.call(this,a,d,e.ticks,e);var f=Math.max(1,e.ticks.length-(e.stretch?1:0));this.stepLength=this.axisLength/f}function e(a,b){return this.stepLength*b}c.StepAxis=c.Axis.extend({constructor:d,projectValue:e})}(window,document,a),function(a,b,c){"use strict";function d(a){var b=c.normalizeData(this.data,a.reverseData,!0);this.svg=c.createSvg(this.container,a.width,a.height,a.classNames.chart);var d,e,g=this.svg.elem("g").addClass(a.classNames.gridGroup),h=this.svg.elem("g"),i=this.svg.elem("g").addClass(a.classNames.labelGroup),j=c.createChartRect(this.svg,a,f.padding);d=void 0===a.axisX.type?new c.StepAxis(c.Axis.units.x,b.normalized.series,j,c.extend({},a.axisX,{ticks:b.normalized.labels,stretch:a.fullWidth})):a.axisX.type.call(c,c.Axis.units.x,b.normalized.series,j,a.axisX),e=void 0===a.axisY.type?new c.AutoScaleAxis(c.Axis.units.y,b.normalized.series,j,c.extend({},a.axisY,{high:c.isNumeric(a.high)?a.high:a.axisY.high,low:c.isNumeric(a.low)?a.low:a.axisY.low})):a.axisY.type.call(c,c.Axis.units.y,b.normalized.series,j,a.axisY),d.createGridAndLabels(g,i,this.supportsForeignObject,a,this.eventEmitter),e.createGridAndLabels(g,i,this.supportsForeignObject,a,this.eventEmitter),a.showGridBackground&&c.createGridBackground(g,j,a.classNames.gridBackground,this.eventEmitter),b.raw.series.forEach(function(f,g){var i=h.elem("g");i.attr({"ct:series-name":f.name,"ct:meta":c.serialize(f.meta)}),i.addClass([a.classNames.series,f.className||a.classNames.series+"-"+c.alphaNumerate(g)].join(" "));var k=[],l=[];b.normalized.series[g].forEach(function(a,h){var i={x:j.x1+d.projectValue(a,h,b.normalized.series[g]),y:j.y1-e.projectValue(a,h,b.normalized.series[g])};k.push(i.x,i.y),l.push({value:a,valueIndex:h,meta:c.getMetaData(f,h)})}.bind(this));var m={lineSmooth:c.getSeriesOption(f,a,"lineSmooth"),showPoint:c.getSeriesOption(f,a,"showPoint"),showLine:c.getSeriesOption(f,a,"showLine"),showArea:c.getSeriesOption(f,a,"showArea"),areaBase:c.getSeriesOption(f,a,"areaBase")},n="function"==typeof m.lineSmooth?m.lineSmooth:m.lineSmooth?c.Interpolation.monotoneCubic():c.Interpolation.none(),o=n(k,l);if(m.showPoint&&o.pathElements.forEach(function(b){var h=i.elem("line",{x1:b.x,y1:b.y,x2:b.x+.01,y2:b.y},a.classNames.point).attr({"ct:value":[b.data.value.x,b.data.value.y].filter(c.isNumeric).join(","),"ct:meta":c.serialize(b.data.meta)});this.eventEmitter.emit("draw",{type:"point",value:b.data.value,index:b.data.valueIndex,meta:b.data.meta,series:f,seriesIndex:g,axisX:d,axisY:e,group:i,element:h,x:b.x,y:b.y})}.bind(this)),m.showLine){var p=i.elem("path",{d:o.stringify()},a.classNames.line,!0);this.eventEmitter.emit("draw",{type:"line",values:b.normalized.series[g],path:o.clone(),chartRect:j,index:g,series:f,seriesIndex:g,seriesMeta:f.meta,axisX:d,axisY:e,group:i,element:p})}if(m.showArea&&e.range){var q=Math.max(Math.min(m.areaBase,e.range.max),e.range.min),r=j.y1-e.projectValue(q);o.splitByCommand("M").filter(function(a){return a.pathElements.length>1}).map(function(a){var b=a.pathElements[0],c=a.pathElements[a.pathElements.length-1];return a.clone(!0).position(0).remove(1).move(b.x,r).line(b.x,b.y).position(a.pathElements.length+1).line(c.x,r)}).forEach(function(c){var h=i.elem("path",{d:c.stringify()},a.classNames.area,!0);this.eventEmitter.emit("draw",{type:"area",values:b.normalized.series[g],path:c.clone(),series:f,seriesIndex:g,axisX:d,axisY:e,chartRect:j,index:g,group:i,element:h})}.bind(this))}}.bind(this)),this.eventEmitter.emit("created",{bounds:e.bounds,chartRect:j,axisX:d,axisY:e,svg:this.svg,options:a})}function e(a,b,d,e){c.Line["super"].constructor.call(this,a,b,f,c.extend({},f,d),e)}var f={axisX:{offset:30,position:"end",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop,type:void 0},axisY:{offset:40,position:"start",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop,type:void 0,scaleMinSpace:20,onlyInteger:!1},width:void 0,height:void 0,showLine:!0,showPoint:!0,showArea:!1,areaBase:0,lineSmooth:!0,showGridBackground:!1,low:void 0,high:void 0,chartPadding:{top:15,right:15,bottom:5,left:10},fullWidth:!1,reverseData:!1,classNames:{chart:"ct-chart-line",label:"ct-label",labelGroup:"ct-labels",series:"ct-series",line:"ct-line",point:"ct-point",area:"ct-area",grid:"ct-grid",gridGroup:"ct-grids",gridBackground:"ct-grid-background",vertical:"ct-vertical",horizontal:"ct-horizontal",start:"ct-start",end:"ct-end"}};c.Line=c.Base.extend({constructor:e,createChart:d})}(window,document,a),function(a,b,c){"use strict";function d(a){var b,d;a.distributeSeries?(b=c.normalizeData(this.data,a.reverseData,a.horizontalBars?"x":"y"),b.normalized.series=b.normalized.series.map(function(a){return[a]})):b=c.normalizeData(this.data,a.reverseData,a.horizontalBars?"x":"y"),this.svg=c.createSvg(this.container,a.width,a.height,a.classNames.chart+(a.horizontalBars?" "+a.classNames.horizontalBars:""));var e=this.svg.elem("g").addClass(a.classNames.gridGroup),g=this.svg.elem("g"),h=this.svg.elem("g").addClass(a.classNames.labelGroup);if(a.stackBars&&0!==b.normalized.series.length){var i=c.serialMap(b.normalized.series,function(){
return Array.prototype.slice.call(arguments).map(function(a){return a}).reduce(function(a,b){return{x:a.x+(b&&b.x)||0,y:a.y+(b&&b.y)||0}},{x:0,y:0})});d=c.getHighLow([i],a,a.horizontalBars?"x":"y")}else d=c.getHighLow(b.normalized.series,a,a.horizontalBars?"x":"y");d.high=+a.high||(0===a.high?0:d.high),d.low=+a.low||(0===a.low?0:d.low);var j,k,l,m,n,o=c.createChartRect(this.svg,a,f.padding);k=a.distributeSeries&&a.stackBars?b.normalized.labels.slice(0,1):b.normalized.labels,a.horizontalBars?(j=m=void 0===a.axisX.type?new c.AutoScaleAxis(c.Axis.units.x,b.normalized.series,o,c.extend({},a.axisX,{highLow:d,referenceValue:0})):a.axisX.type.call(c,c.Axis.units.x,b.normalized.series,o,c.extend({},a.axisX,{highLow:d,referenceValue:0})),l=n=void 0===a.axisY.type?new c.StepAxis(c.Axis.units.y,b.normalized.series,o,{ticks:k}):a.axisY.type.call(c,c.Axis.units.y,b.normalized.series,o,a.axisY)):(l=m=void 0===a.axisX.type?new c.StepAxis(c.Axis.units.x,b.normalized.series,o,{ticks:k}):a.axisX.type.call(c,c.Axis.units.x,b.normalized.series,o,a.axisX),j=n=void 0===a.axisY.type?new c.AutoScaleAxis(c.Axis.units.y,b.normalized.series,o,c.extend({},a.axisY,{highLow:d,referenceValue:0})):a.axisY.type.call(c,c.Axis.units.y,b.normalized.series,o,c.extend({},a.axisY,{highLow:d,referenceValue:0})));var p=a.horizontalBars?o.x1+j.projectValue(0):o.y1-j.projectValue(0),q=[];l.createGridAndLabels(e,h,this.supportsForeignObject,a,this.eventEmitter),j.createGridAndLabels(e,h,this.supportsForeignObject,a,this.eventEmitter),a.showGridBackground&&c.createGridBackground(e,o,a.classNames.gridBackground,this.eventEmitter),b.raw.series.forEach(function(d,e){var f,h,i=e-(b.raw.series.length-1)/2;f=a.distributeSeries&&!a.stackBars?l.axisLength/b.normalized.series.length/2:a.distributeSeries&&a.stackBars?l.axisLength/2:l.axisLength/b.normalized.series[e].length/2,h=g.elem("g"),h.attr({"ct:series-name":d.name,"ct:meta":c.serialize(d.meta)}),h.addClass([a.classNames.series,d.className||a.classNames.series+"-"+c.alphaNumerate(e)].join(" ")),b.normalized.series[e].forEach(function(g,k){var r,s,t,u;if(u=a.distributeSeries&&!a.stackBars?e:a.distributeSeries&&a.stackBars?0:k,r=a.horizontalBars?{x:o.x1+j.projectValue(g&&g.x?g.x:0,k,b.normalized.series[e]),y:o.y1-l.projectValue(g&&g.y?g.y:0,u,b.normalized.series[e])}:{x:o.x1+l.projectValue(g&&g.x?g.x:0,u,b.normalized.series[e]),y:o.y1-j.projectValue(g&&g.y?g.y:0,k,b.normalized.series[e])},l instanceof c.StepAxis&&(l.options.stretch||(r[l.units.pos]+=f*(a.horizontalBars?-1:1)),r[l.units.pos]+=a.stackBars||a.distributeSeries?0:i*a.seriesBarDistance*(a.horizontalBars?-1:1)),t=q[k]||p,q[k]=t-(p-r[l.counterUnits.pos]),void 0!==g){var v={};v[l.units.pos+"1"]=r[l.units.pos],v[l.units.pos+"2"]=r[l.units.pos],!a.stackBars||"accumulate"!==a.stackMode&&a.stackMode?(v[l.counterUnits.pos+"1"]=p,v[l.counterUnits.pos+"2"]=r[l.counterUnits.pos]):(v[l.counterUnits.pos+"1"]=t,v[l.counterUnits.pos+"2"]=q[k]),v.x1=Math.min(Math.max(v.x1,o.x1),o.x2),v.x2=Math.min(Math.max(v.x2,o.x1),o.x2),v.y1=Math.min(Math.max(v.y1,o.y2),o.y1),v.y2=Math.min(Math.max(v.y2,o.y2),o.y1);var w=c.getMetaData(d,k);s=h.elem("line",v,a.classNames.bar).attr({"ct:value":[g.x,g.y].filter(c.isNumeric).join(","),"ct:meta":c.serialize(w)}),this.eventEmitter.emit("draw",c.extend({type:"bar",value:g,index:k,meta:w,series:d,seriesIndex:e,axisX:m,axisY:n,chartRect:o,group:h,element:s},v))}}.bind(this))}.bind(this)),this.eventEmitter.emit("created",{bounds:j.bounds,chartRect:o,axisX:m,axisY:n,svg:this.svg,options:a})}function e(a,b,d,e){c.Bar["super"].constructor.call(this,a,b,f,c.extend({},f,d),e)}var f={axisX:{offset:30,position:"end",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop,scaleMinSpace:30,onlyInteger:!1},axisY:{offset:40,position:"start",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop,scaleMinSpace:20,onlyInteger:!1},width:void 0,height:void 0,high:void 0,low:void 0,referenceValue:0,chartPadding:{top:15,right:15,bottom:5,left:10},seriesBarDistance:15,stackBars:!1,stackMode:"accumulate",horizontalBars:!1,distributeSeries:!1,reverseData:!1,showGridBackground:!1,classNames:{chart:"ct-chart-bar",horizontalBars:"ct-horizontal-bars",label:"ct-label",labelGroup:"ct-labels",series:"ct-series",bar:"ct-bar",grid:"ct-grid",gridGroup:"ct-grids",gridBackground:"ct-grid-background",vertical:"ct-vertical",horizontal:"ct-horizontal",start:"ct-start",end:"ct-end"}};c.Bar=c.Base.extend({constructor:e,createChart:d})}(window,document,a),function(a,b,c){"use strict";function d(a,b,c){var d=b.x>a.x;return d&&"explode"===c||!d&&"implode"===c?"start":d&&"implode"===c||!d&&"explode"===c?"end":"middle"}function e(a){var b,e,f,h,i,j=c.normalizeData(this.data),k=[],l=a.startAngle;this.svg=c.createSvg(this.container,a.width,a.height,a.donut?a.classNames.chartDonut:a.classNames.chartPie),e=c.createChartRect(this.svg,a,g.padding),f=Math.min(e.width()/2,e.height()/2),i=a.total||j.normalized.series.reduce(function(a,b){return a+b},0);var m=c.quantity(a.donutWidth);"%"===m.unit&&(m.value*=f/100),f-=a.donut&&!a.donutSolid?m.value/2:0,h="outside"===a.labelPosition||a.donut&&!a.donutSolid?f:"center"===a.labelPosition?0:a.donutSolid?f-m.value/2:f/2,h+=a.labelOffset;var n={x:e.x1+e.width()/2,y:e.y2+e.height()/2},o=1===j.raw.series.filter(function(a){return a.hasOwnProperty("value")?0!==a.value:0!==a}).length;j.raw.series.forEach(function(a,b){k[b]=this.svg.elem("g",null,null)}.bind(this)),a.showLabel&&(b=this.svg.elem("g",null,null)),j.raw.series.forEach(function(e,g){if(0!==j.normalized.series[g]||!a.ignoreEmptyValues){k[g].attr({"ct:series-name":e.name}),k[g].addClass([a.classNames.series,e.className||a.classNames.series+"-"+c.alphaNumerate(g)].join(" "));var p=i>0?l+j.normalized.series[g]/i*360:0,q=Math.max(0,l-(0===g||o?0:.2));p-q>=359.99&&(p=q+359.99);var r,s,t,u=c.polarToCartesian(n.x,n.y,f,q),v=c.polarToCartesian(n.x,n.y,f,p),w=new c.Svg.Path(!a.donut||a.donutSolid).move(v.x,v.y).arc(f,f,0,p-l>180,0,u.x,u.y);a.donut?a.donutSolid&&(t=f-m.value,r=c.polarToCartesian(n.x,n.y,t,l-(0===g||o?0:.2)),s=c.polarToCartesian(n.x,n.y,t,p),w.line(r.x,r.y),w.arc(t,t,0,p-l>180,1,s.x,s.y)):w.line(n.x,n.y);var x=a.classNames.slicePie;a.donut&&(x=a.classNames.sliceDonut,a.donutSolid&&(x=a.classNames.sliceDonutSolid));var y=k[g].elem("path",{d:w.stringify()},x);if(y.attr({"ct:value":j.normalized.series[g],"ct:meta":c.serialize(e.meta)}),a.donut&&!a.donutSolid&&(y._node.style.strokeWidth=m.value+"px"),this.eventEmitter.emit("draw",{type:"slice",value:j.normalized.series[g],totalDataSum:i,index:g,meta:e.meta,series:e,group:k[g],element:y,path:w.clone(),center:n,radius:f,startAngle:l,endAngle:p}),a.showLabel){var z;z=1===j.raw.series.length?{x:n.x,y:n.y}:c.polarToCartesian(n.x,n.y,h,l+(p-l)/2);var A;A=j.normalized.labels&&!c.isFalseyButZero(j.normalized.labels[g])?j.normalized.labels[g]:j.normalized.series[g];var B=a.labelInterpolationFnc(A,g);if(B||0===B){var C=b.elem("text",{dx:z.x,dy:z.y,"text-anchor":d(n,z,a.labelDirection)},a.classNames.label).text(""+B);this.eventEmitter.emit("draw",{type:"label",index:g,group:b,element:C,text:""+B,x:z.x,y:z.y})}}l=p}}.bind(this)),this.eventEmitter.emit("created",{chartRect:e,svg:this.svg,options:a})}function f(a,b,d,e){c.Pie["super"].constructor.call(this,a,b,g,c.extend({},g,d),e)}var g={width:void 0,height:void 0,chartPadding:5,classNames:{chartPie:"ct-chart-pie",chartDonut:"ct-chart-donut",series:"ct-series",slicePie:"ct-slice-pie",sliceDonut:"ct-slice-donut",sliceDonutSolid:"ct-slice-donut-solid",label:"ct-label"},startAngle:0,total:void 0,donut:!1,donutSolid:!1,donutWidth:60,showLabel:!0,labelOffset:0,labelPosition:"inside",labelInterpolationFnc:c.noop,labelDirection:"neutral",reverseData:!1,ignoreEmptyValues:!1};c.Pie=c.Base.extend({constructor:f,createChart:e,determineAnchorPosition:d})}(window,document,a),a});
//# sourceMappingURL=chartist.min.js.map
!function(a,b){"function"==typeof define&&define.amd?define(["chartist"],function(c){return a.returnExportsGlobal=b(c)}):"object"==typeof exports?module.exports=b(require("chartist")):a["Chartist.plugins.ctAxisTitle"]=b(Chartist)}(this,function(a){return function(a,b,c){"use strict";var d={axisTitle:"",axisClass:"ct-axis-title",offset:{x:0,y:0},textAnchor:"middle",flipText:!1},e={xAxis:d,yAxis:d},f=function(a){return a instanceof Function?a():a},g=function(a){return a instanceof Function?a():a};c.plugins=c.plugins||{},c.plugins.ctAxisTitle=function(a){return a=c.extend({},e,a),function(b){b.on("created",function(b){if(!a.axisX.axisTitle&&!a.axisY.axisTitle)throw new Error("ctAxisTitle plugin - You must provide at least one axis title");if(!b.axisX&&!b.axisY)throw new Error("ctAxisTitle plugin can only be used on charts that have at least one axis");var d,e,h;if(a.axisX.axisTitle&&b.axisX&&(d=b.axisX.axisLength/2+b.options.axisY.offset+b.options.chartPadding.left,e=b.options.chartPadding.top,"end"===b.options.axisY.position&&(d-=b.options.axisY.offset),"end"===b.options.axisX.position&&(e+=b.axisY.axisLength),h=new c.Svg("text"),h.addClass(g(a.axisX.axisClass)),h.text(f(a.axisX.axisTitle)),h.attr({x:d+a.axisX.offset.x,y:e+a.axisX.offset.y,"text-anchor":a.axisX.textAnchor}),b.svg.append(h,!0)),a.axisY.axisTitle&&b.axisY){d=0,e=b.axisY.axisLength/2+b.options.chartPadding.top,"start"===b.options.axisX.position&&(e+=b.options.axisX.offset),"end"===b.options.axisY.position&&(d=b.axisX.axisLength);var i="rotate("+(a.axisY.flipTitle?-90:90)+", "+d+", "+e+")";h=new c.Svg("text"),h.addClass(g(a.axisY.axisClass)),h.text(f(a.axisY.axisTitle)),h.attr({x:d+a.axisY.offset.x,y:e+a.axisY.offset.y,transform:i,"text-anchor":a.axisY.textAnchor}),b.svg.append(h,!0)}})}}}(window,document,a),a.plugins.ctAxisTitle});

/* chartist-plugin-tooltip 0.0.17
 * Copyright © 2017 Markus Padourek
 * Free to use under the WTFPL license.
 * http://www.wtfpl.net/
 */

!function(a,b){"function"==typeof define&&define.amd?define(["chartist"],function(c){return a.returnExportsGlobal=b(c)}):"object"==typeof exports?module.exports=b(require("chartist")):a["Chartist.plugins.tooltip"]=b(Chartist)}(this,function(a){return function(a,b,c){"use strict";function d(a){f(a,"tooltip-show")||(a.className=a.className+" tooltip-show")}function e(a){var b=new RegExp("tooltip-show\\s*","gi");a.className=a.className.replace(b,"").trim()}function f(a,b){return(" "+a.getAttribute("class")+" ").indexOf(" "+b+" ")>-1}function g(a,b){do{a=a.nextSibling}while(a&&!f(a,b));return a}function h(a){return a.innerText||a.textContent}var i={currency:void 0,currencyFormatCallback:void 0,tooltipOffset:{x:0,y:-20},anchorToPoint:!1,appendToBody:!1,class:void 0,pointClass:"ct-point"};c.plugins=c.plugins||{},c.plugins.tooltip=function(j){return j=c.extend({},i,j),function(i){function k(a,b,c){n.addEventListener(a,function(a){b&&!f(a.target,b)||c(a)})}function l(b){p=p||o.offsetHeight,q=q||o.offsetWidth;var c,d,e=-q/2+j.tooltipOffset.x,f=-p+j.tooltipOffset.y;if(j.appendToBody)o.style.top=b.pageY+f+"px",o.style.left=b.pageX+e+"px";else{var g=n.getBoundingClientRect(),h=b.pageX-g.left-a.pageXOffset,i=b.pageY-g.top-a.pageYOffset;!0===j.anchorToPoint&&b.target.x2&&b.target.y2&&(c=parseInt(b.target.x2.baseVal.value),d=parseInt(b.target.y2.baseVal.value)),o.style.top=(d||i)+f+"px",o.style.left=(c||h)+e+"px"}}var m=j.pointClass;i instanceof c.Bar?m="ct-bar":i instanceof c.Pie&&(m=i.options.donut?"ct-slice-donut":"ct-slice-pie");var n=i.container,o=n.querySelector(".chartist-tooltip");o||(o=b.createElement("div"),o.className=j.class?"chartist-tooltip "+j.class:"chartist-tooltip",j.appendToBody?b.body.appendChild(o):n.appendChild(o));var p=o.offsetHeight,q=o.offsetWidth;e(o),k("mouseover",m,function(a){var e=a.target,f="",k=i instanceof c.Pie?e:e.parentNode,m=k?e.parentNode.getAttribute("ct:meta")||e.parentNode.getAttribute("ct:series-name"):"",n=e.getAttribute("ct:meta")||m||"",r=!!n,s=e.getAttribute("ct:value");if(j.transformTooltipTextFnc&&"function"==typeof j.transformTooltipTextFnc&&(s=j.transformTooltipTextFnc(s)),j.tooltipFnc&&"function"==typeof j.tooltipFnc)f=j.tooltipFnc(n,s);else{if(j.metaIsHTML){var t=b.createElement("textarea");t.innerHTML=n,n=t.value}if(n='<span class="chartist-tooltip-meta">'+n+"</span>",r)f+=n+"<br>";else if(i instanceof c.Pie){var u=g(e,"ct-label");u&&(f+=h(u)+"<br>")}s&&(j.currency&&(s=void 0!=j.currencyFormatCallback?j.currencyFormatCallback(s,j):j.currency+s.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g,"$1,")),s='<span class="chartist-tooltip-value">'+s+"</span>",f+=s)}f&&(o.innerHTML=f,l(a),d(o),p=o.offsetHeight,q=o.offsetWidth)}),k("mouseout",m,function(){e(o)}),k("mousemove",null,function(a){!1===j.anchorToPoint&&l(a)})}}}(window,document,a),a.plugins.tooltip});
//# sourceMappingURL=chartist-plugin-tooltip.min.js.map

/* global readHar, errorMessage, generate, showUpload, showLoading, removeAndHide, FileDrop */
/* exported createMainDropZone, createUpload  */

/**
 * The main drop zone on the start page. Can handle one or two
 * HAR files.
 * @param {string} id
 */
function createMainDropZone(id) {
  const zone = new FileDrop(id, {});
  zone.multiple(true);

  zone.event('send', function(files) {
    if (files.length > 2) {
      errorMessage('You can only compare max two HAR files at a time!');
    } else if (files.length === 2) {
      showLoading();
      Promise.all([readHar(files[0]), readHar(files[1])])
        .then(([har1, har2]) =>
          generate({
            har1: {
              har: har1,
              run: 0,
              label: 'HAR1'
            },
            har2: {
              har: har2,
              run: 0,
              label: 'HAR2'
            }
          })
        )
        .catch(e => {
          /* eslint-disable no-console */
          console.error(e);
          /* eslint-disable no-console */
          showUpload();
          errorMessage(e.message);
        });
    } else {
      showLoading();
      readHar(files[0])
        .then(har => {
          removeAndHide();
          generate({
            har1: {
              har: har,
              run: 0,
              label: 'HAR1'
            },
            har2: {
              har: har,
              run: har.log.pages.length > 1 ? 1 : 0,
              label: 'HAR2'
            }
          });
        })
        .catch(e => {
          /* eslint-disable no-console */
          console.error(e);
          /* eslint-disable no-console */
          showUpload();
          errorMessage(e.message);
        });
    }
  });
}

/**
 *
 * The upload button
 * @param {string} id
 */
function createUpload(id) {
  const upload = document.getElementById(id);

  upload.addEventListener('change', function() {
    const files = this.files;
    if (files.length > 1) {
      errorMessage('You can only add one HAR at a time');
    } else {
      readHar(files[0])
        .then(har => {
          const changeHar1 = id.indexOf('har1') > -1;
          const optionName = changeHar1 ? 'run2Option' : 'run1Option';
          const e2 = document.getElementById(optionName);
          const run = e2 ? e2.options[e2.selectedIndex].value : 0;
          const har1 = changeHar1 ? har : window.har.har1.har;
          const har2 = changeHar1 ? window.har.har2.har : har;
          const run1 = changeHar1 ? 0 : run;
          const run2 = changeHar1 ? run : 0;
          const label1 = changeHar1 ? 'HAR1' : window.har.har1.label;
          const label2 = changeHar1 ? window.har.har2.label : 'HAR2';

          generate({
            har1: {
              har: har1,
              run: run1,
              label: label1
            },
            har2: {
              har: har2,
              run: run2,
              label: label2
            }
          });
        })
        .catch(e => {
          /* eslint-disable no-console */
          console.error(e);
          /* eslint-disable no-console */
          errorMessage(e.message);
        });
    }
  });
}

/* exported getLastTiming getAllDomains getTotalDiff getUniqueRequests*/

/**
 * Helper functions to get things out of the HAR
 */

function getLastTiming(har, run) {
  const harEntries = har.log.entries;
  const pageId = har.log.pages[run].id;
  const pageStartTime = new Date(har.log.pages[run].startedDateTime).getTime();

  let doneTime = 0;
  harEntries
    .filter(entry => {
      // filter inline data
      if (
        entry.request.url.indexOf('data:') === 0 ||
        entry.request.url.indexOf('javascript:') === 0
      ) {
        return false;
      }
      return entry.pageref === pageId;
    })
    .forEach(entry => {
      const startRelative =
        new Date(entry.startedDateTime).getTime() - pageStartTime;
      doneTime = Math.max(doneTime, startRelative + entry.time);
    });

  // Take care of the case when a timing is later than latest response
  Object.keys(har.log.pages[run].pageTimings).forEach(key => {
    if (har.log.pages[run].pageTimings[key] > doneTime) {
      doneTime = har.log.pages[run].pageTimings[key];
    }
  });

  return doneTime;
}

function getAllDomains(firstPage, secondPage) {
  const domainMap = {};

  for (let name of Object.keys(firstPage.domains)) {
    let domain = domainMap[name] || {};
    domain.firstPage = firstPage.domains[name];
    domainMap[name] = domain;
  }
  for (let name of Object.keys(secondPage.domains)) {
    let domain = domainMap[name] || {};
    domain.secondPage = secondPage.domains[name];
    domainMap[name] = domain;
  }

  const allDomains = [];

  for (let name of Object.keys(domainMap)) {
    const domain = domainMap[name];
    domain.name = name;
    allDomains.push(domain);
  }

  return allDomains;
}

function getTotalDiff(requestDiff) {
  const total = {
    har1: 0,
    har2: 0,
    diff: 0,
    new: 0,
    newBytes: 0,
    removed: 0,
    removedBytes: 0,
    increased: 0,
    increasedBytes: 0,
    decreased: 0,
    decreasedBytes: 0
  };
  for (let diff of requestDiff) {
    if (diff.har1) total.har1 += diff.har1;
    if (diff.har2) total.har2 += diff.har2;
    if (diff.diff) total.diff += diff.diff;

    // is new!
    if (diff.har2 && !diff.har1) {
      total.new += 1;
      total.newBytes += diff.har2;
    } else if (diff.har1 && !diff.har2) {
      // is removed
      total.removed += 1;
      total.removedBytes += diff.har1;
    } else if (diff.diff < 0) {
      // decrease!
      total.decreased += 1;
      total.decreasedBytes += diff.diff;
    } else {
      // must be increase
      total.increased += 1;
      total.increasedBytes += diff.diff;
    }
  }
  return total;
}

function getUniqueRequests(har1, run1, har2, run2) {
  const urls1 = getURLs(har1, run1);
  const urls2 = getURLs(har2, run2);
  const all = [];
  const minDiffInBytes = 1000;
  for (let url of Object.keys(urls1)) {
    if (
      (urls2[url] && urls2[url] === urls1[url]) ||
      (urls2[url] &&
        urls2[url] - urls1[url] < minDiffInBytes &&
        urls2[url] - urls1[url] > -minDiffInBytes)
    ) {
      // TODO no diff, do nada
    } else if (urls2[url]) {
      // There's a diff in size
      all.push({
        url: url,
        har1: urls1[url],
        har2: urls2[url],
        diff: urls2[url] - urls1[url]
      });
    } else {
      all.push({
        url: url,
        diff: -urls1[url],
        har1: urls1[url]
      });
    }
  }
  for (let url of Object.keys(urls2)) {
    if (urls2[url] && !urls1[url]) {
      all.push({
        url: url,
        diff: urls2[url],
        har2: urls2[url]
      });
    }
  }
  return all;
}

function getURLs(har, run) {
  const harEntries = har.log.entries;
  const pageId = har.log.pages[run].id;
  const cleaned = harEntries.filter(entry => {
    // filter inline data
    if (
      entry.request.url.indexOf('data:') === 0 ||
      entry.request.url.indexOf('javascript:') === 0
    ) {
      return false;
    }
    return entry.pageref === pageId;
  });
  const urls = {};
  for (let entry of cleaned) {
    urls[entry.request.url] = entry.response.bodySize;
  }
  return urls;
}

/* global Zlib */
/* exported readHar, isFileGzipped, isFileZipped, readGZipFile */

/**
 * Help functions to read gzipped files
 */

function gzipArrayBufferToJSON(arrayBuffer) {
  /* utf.js - UTF-8 <=> UTF-16 convertion
   *
   * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
   * Version: 1.0
   * LastModified: Dec 25 1999
   * This library is free.  You can redistribute it and/or modify it.
   */

  function Utf8ArrayToStr(array) {
    let out, i, len, c;
    let char2, char3;

    out = '';
    len = array.length;
    i = 0;
    while (i < len) {
      c = array[i++];
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12:
        case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode(
            ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
          );
          break;
      }
    }

    return out;
  }

  const byteArray = new Uint8Array(arrayBuffer);
  const gunzip = new Zlib.Gunzip(byteArray);
  const decompressedArray = gunzip.decompress();
  let string = '';
  // only way to make it work on Safari iOS?
  try {
    string = new TextDecoder('utf-8').decode(decompressedArray);
  } catch (e) {
    string = Utf8ArrayToStr(decompressedArray);
  }
  return JSON.parse(string);
}

function isFileGzipped(url) {
  return url.endsWith('.gz');
}

function isFileZipped(url) {
  return url.endsWith('.zip') || url.endsWith('.zhar');
}

function readGZipFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () =>
      reject(
        new Error('Error reading ' + file.name + ' : ' + reader.error.name)
      );
    reader.onload = () => {
      try {
        const har = gzipArrayBufferToJSON(reader.result);
        resolve(har);
      } catch (e) {
        reject(new Error('Error reading ' + file.name + ' : ' + e.message));
      }
    };

    reader.readAsArrayBuffer(file.nativeFile ? file.nativeFile : file);
  });
}

/* exported showUpload, formatDate, formatURL, toggleRow, hideUpload, objectPropertiesToArray, formatTime, showLoading, errorMessage, formatBytes, changeOpacity*/

// Hide the upload functionality
function hideUpload() {
  hide('choosehars');
  hide('loading');
  show('result');
}

function removeAndHide() {
  function removeChildren(parentId) {
    const parent = document.getElementById(parentId);
    while (parent.childNodes.length > 0) {
      parent.removeChild(parent.firstChild);
    }
  }
  removeChildren('har1');
  removeChildren('har2');
  removeChildren('pageXrayContent');
  removeChildren('thirdPartyContent');
  removeChildren('visualProgressContent');
  hide('result');
  hide('loading');
}

// Show the upload functionality
function showUpload() {
  removeAndHide();
  show('choosehars');
}

function showLoading() {
  const el = document.getElementById('choosehars');
  el.style.display = 'none';
  const el2 = document.getElementById('loading');
  el2.style.display = 'block';
}

function objectPropertiesToArray(object) {
  const array = [];
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      array.push({ name: key, value: object[key] });
    }
  }
  return array.sort(function(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
}

// Put a error message on the screen
function errorMessage(myMessage) {
  const message = document.getElementById('message');
  message.innerHTML = myMessage;
}

function show(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = 'block';
  }
}

function hide(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = 'none';
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString();
}

function formatURL(url) {
  if (url.length > 90) {
    if (url.indexOf('/') > -1) {
      const ending = url.substring(url.length - 30, url.length);
      return url.substring(0, 56) + '....' + ending;
    }
  }
  return url;
}

function formatTime(ms) {
  if (ms !== undefined) {
    return ms + ' ms';
  } else return '';
}

function formatBytes(bytes) {
  if (bytes === 0) {
    return '0 B';
  } else if (bytes === undefined) {
    return '';
  }

  return Math.round(bytes / 1000) + ' kb';
}
function changeOpacity(val, id1, id2) {
  const el1 = document.getElementById(id1);
  const el2 = document.getElementById(id2);
  el2.style.opacity = val;
  el1.style.opacity = Math.abs(1 - val);

  // make sure we can see the extra info
  if (val > 0.5) {
    el1.style['z-index'] = -1;
    el2.style['z-index'] = 1;
  } else {
    el1.style['z-index'] = 1;
    el2.style['z-index'] = -1;
  }
}

function toggleRow(element, className, toggler) {
  const rows = element.parentNode.parentNode.parentNode.getElementsByClassName(
    className
  );

  for (let i = 0; i < rows.length; i++) {
    const status = rows[i].currentStyle
      ? rows[i].currentStyle.display
      : getComputedStyle(rows[i], null).display;

    if (status === 'none') {
      rows[i].style.display = 'table-row';
      toggler.style.transform = 'rotate(45deg)';
      toggler.style['-webkit-transform'] = 'rotate(45deg)';
    } else {
      rows[i].style.display = 'none';
      toggler.style.transform = 'rotate(-45deg)';
      toggler.style['-webkit-transform'] = 'rotate(-45deg)';
    }
  }
}

/* global isFileGzipped, isFileZipped, gzipArrayBufferToJSON, readGZipFile, errorMessage, generate, showUpload */
/* exported readHar, fetchHar, getHarURL, loadFilesFromURL, loadFilesFromGist, loadFilesFromConfig*/

/**
 * Help functions to read HAR/JSON files from file
 * or from URL
 */

function readJsonFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () =>
      reject(
        new Error('Error reading ' + file.name + ' : ' + reader.error.message)
      );
    reader.onload = () => {
      try {
        const har = JSON.parse(reader.result);
        resolve(har);
      } catch (e) {
        reject(new Error('Error reading ' + file.name + ' : ' + e.message));
      }
    };
    reader.readAsText(file.nativeFile ? file.nativeFile : file);
  });
}

/**
 * Is this the URL a sitespeed.io result page URL?
 * @param {*} url
 */
function isSitespeedIoURL(url) {
  if (
    url.endsWith('/') ||
    url.endsWith('/index.html') ||
    url.endsWith('.html')
  ) {
    return true;
  } else return false;
}
/**
 * Magically calculate the URL and run from a sitespeed.io upload
 * @param {string} url
 */
function getSitespeedIoHarURLAndRun(url) {
  let run = 0,
    harURL;

  // The sitespeed.io summary page
  if (url.endsWith('/') || url.endsWith('/index.html')) {
    run = 0;
    // TODO we are not sure the HAR file is gzipped, hmm
    harURL = url.slice(0, url.lastIndexOf('/')) + '/data/browsertime.har.gz';
  } else if (url.endsWith('.html')) {
    // Individual run page
    run = url.slice(url.lastIndexOf('/') + 1, url.length - 5);
    harURL = url.slice(0, url.lastIndexOf('/')) + '/data/browsertime.har.gz';
  }

  return {
    url: harURL,
    run: run
  };
}

function fetchHar(url) {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(
        'Failed to fetch har from ' + url + '. Error: ' + response.statusText
      );

    if (isFileZipped(url))
      throw new Error('Zip compressed HARs are not supported: ' + url);

    if (isFileGzipped(url))
      return response.arrayBuffer().then(gzipArrayBufferToJSON);

    return response.json();
  });
}

function readHar(file) {
  if (isFileZipped(file.name))
    return Promise.reject(
      new Error('Zip compressed HARs are not supported: ' + file.name)
    );

  if (isFileGzipped(file.name)) return readGZipFile(file);
  return readJsonFile(file);
}

function loadJson(url) {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(
        'Failed to fetch JSON from ' + url + '. Error: ' + response.statusText
      );

    if (isFileZipped(url))
      throw new Error('Zip compressed HARs are not supported: ' + url);

    if (isFileGzipped(url))
      return response.arrayBuffer().then(gzipArrayBufferToJSON);

    return response.json();
  });
}

function readConfig(config) {
  if (
    config &&
    config.har1 &&
    config.har1.url &&
    config.har2 &&
    config.har2.url
  ) {
    return loadHARsFromConfig(config);
  } else {
    throw new Error('Malformed config file.');
  }
}

function loadFilesFromConfig(url) {
  loadJson(url)
    .then(unparsedConfig => {
      let content;
      try {
        content = JSON.parse(unparsedConfig);
      } catch (e) {
        throw new Error('Malformed config file.' + e);
      }
      return readConfig(content);
    })
    .catch(e => {
      /* eslint-disable no-console */
      console.error(e);
      /* eslint-disable no-console */
      errorMessage(e.message);
      showUpload();
    });
}

function loadFilesFromGist(id) {
  const url = 'https://api.github.com/gists/' + id;

  loadJson(url)
    .then(gist => {
      // We only support one file at the moment
      const key = Object.keys(gist.files)[0];
      let content;
      try {
        content = JSON.parse(gist.files[key].content);
      } catch (e) {
        throw new Error('Malformed gist.' + e);
      }
      return readConfig(content);
    })
    .catch(e => {
      /* eslint-disable no-console */
      console.error(e);
      /* eslint-disable no-console */
      errorMessage(e.message);
      showUpload();
    });
}

function loadHARsFromConfig(config) {
  // The runs/pages are zer based since it's an array but
  // in configuration we wanna use 1 based since it makes more sense
  if (config.har1.run) {
    config.har1.run = config.har1.run - 1;
  }
  if (config.har2.run) {
    config.har2.run = config.har2.run - 1;
  }

  // There's a magic hack to get the HAR and the run if you use sitespeed.io
  let reworkedConfig = config.har1;
  if (isSitespeedIoURL(config.har1.url)) {
    reworkedConfig = getSitespeedIoHarURLAndRun(config.har1.url);
  }
  const harPromise = loadJson(reworkedConfig.url);

  let harPromise2 = harPromise;
  let reworkedConfig2 = config.har2;
  if (config.har2.url) {
    if (isSitespeedIoURL(config.har2.url)) {
      reworkedConfig2 = getSitespeedIoHarURLAndRun(config.har2.url);
    }
    harPromise2 = loadJson(reworkedConfig2.url);
  }
  Promise.all([harPromise, harPromise2])
    .then(([har1, har2]) =>
      generate({
        har1: {
          har: har1,
          run: reworkedConfig.run || config.har1.run || 0,
          label: config.har1.label || 'HAR1'
        },
        har2: {
          har: har2,
          run: reworkedConfig2.run || config.har2.run || 0,
          label: config.har2.label || 'HAR2'
        },
        comments: config.comments || undefined,
        title: config.title || 'Compare HAR files',
        firstParty: config.firstParty || undefined
      })
    )
    .catch(e => {
      /* eslint-disable no-console */
      console.error(e);
      /* eslint-disable no-console */
      errorMessage(e.message);
      showUpload();
    });
}

/* exported getFilmstrip */

/**
 * Get filmsstrip data.
 * @param {*} pagexray1
 * @param {*} pagexray2
 */

function getFilmstrip(pageXray1, pageXray2) {
  function getItem(o, t, timings) {
    return {
      img: o.file,
      time: (t / 10).toFixed(1),
      timings: timings
    };
  }

  const f1 = pageXray1.meta.filmstrip;
  const f2 = pageXray2.meta.filmstrip;

  const maxTiming =
    f1[f1.length - 1].time > f2[f2.length - 1].time
      ? f1[f1.length - 1].time
      : f2[f2.length - 1].time;

  const filmstrip1 = [];
  const filmstrip2 = [];
  let pos = 0;

  for (let i = 0; i <= maxTiming * 10; i += 1) {
    if (pos + 1 < f1.length && f1[pos + 1].time <= i / 10) {
      pos++;
      filmstrip1.push(getItem(f1[pos], i, f1[pos].timings));
    } else {
      filmstrip1.push(getItem(f1[pos], i));
    }
  }

  pos = 0;
  for (let i = 0; i <= maxTiming * 10; i += 1) {
    if (pos + 1 < f2.length && f2[pos + 1].time <= i / 10) {
      pos++;
      filmstrip2.push(getItem(f2[pos], i, f2[pos].timings));
    } else {
      filmstrip2.push(getItem(f2[pos], i));
    }
  }

  return { filmstrip1, filmstrip2 };
}

/* global getLastTiming, removeAndHide, perfCascade, createUpload, getAllDomains, hideUpload, changeOpacity, objectPropertiesToArray, registerTemplateHelpers, parseTemplate, getTotalDiff, generateVisualProgress, formatDate, getUniqueRequests, getFilmstrip */
/* exported showUpload, formatDate, generate, toggleRow, regenerate, formatTime, showLoading*/

/**
 * You have pushed the switch button or have changed the run drop down
 * and you want to re-generate the output
 * @param {*} switchHar
 */
function regenerate(switchHar) {
  const e = document.getElementById('run1Option');
  const e2 = document.getElementById('run2Option');
  const runIndex = e ? e.options[e.selectedIndex].value : 0;
  const runIndex2 = e2 ? e2.options[e2.selectedIndex].value : 0;
  generate({
    har1: {
      har: switchHar ? window.har.har2.har : window.har.har1.har,
      run: switchHar ? runIndex2 : runIndex,
      label: switchHar ? window.har.har2.label : window.har.har1.label
    },
    har2: {
      har: switchHar ? window.har.har1.har : window.har.har2.har,
      run: switchHar ? runIndex : runIndex2,
      label: switchHar ? window.har.har1.label : window.har.har2.label
    }
  });
}

/**
 * Add perfcascade waterfall
 * @param {*} har
 * @param {*} selectedPage
 * @param {*} waterfallDivId
 * @param {*} legendHolderEl
 * @param {*} maxTime
 */
function addWaterfall(
  har,
  selectedPage,
  waterfallDivId,
  legendHolderEl,
  maxTime
) {
  const perfCascadeSvg = perfCascade.fromHar(har, {
    rowHeight: 23,
    showAlignmentHelpers: false,
    showIndicatorIcons: false,
    showMimeTypeIcon: true,
    leftColumnWidth: 30,
    selectedPage: selectedPage,
    legendHolder: legendHolderEl,
    fixedLengthMs: maxTime
  });

  const outputHolder = document.getElementById(waterfallDivId);
  outputHolder.appendChild(perfCascadeSvg);
}

function addVisualProgress(pageXray1, pageXray2, config) {
  if (
    pageXray1.visualMetrics &&
    pageXray1.visualMetrics.VisualProgress &&
    pageXray2.visualMetrics &&
    pageXray2.visualMetrics.VisualProgress
  ) {
    parseTemplate(
      'visualProgressTemplate',
      {
        p1: pageXray1,
        p2: pageXray2,
        config
      },
      'visualProgressContent'
    );

    generateVisualProgress(
      pageXray1.visualMetrics.VisualProgress,
      pageXray2.visualMetrics.VisualProgress,
      'visualProgress'
    );
  }
}

/**
 * Generate/create output for the HAR files. Config objects has the following structure:
 * { har1: {url, run, label, har}, har2: {url, run, label, har}}
 * @param {} config
 */
function generate(config) {
  // We remove the potential old HARs
  removeAndHide();
  hideUpload();

  // We wanna know which HAR that's the slowest (need the most)
  // output
  const lastTime = getLastTiming(config.har1.har, config.har1.run);
  const lastTime2 = getLastTiming(config.har2.har, config.har2.run);
  const slowestHarTiming = Math.max(lastTime, lastTime2);

  // we store the HAR to easy get it when we switch runs
  window.har = config;

  if (config.title) {
    document.title = config.title;
  } else if (
    config.har1.har.log.pages[config.har1.run].startedDateTime &&
    config.har2.har.log.pages[config.har2.run].startedDateTime
  ) {
    document.title =
      formatDate(config.har1.har.log.pages[config.har1.run].startedDateTime) +
      ' vs ' +
      formatDate(config.har2.har.log.pages[config.har2.run].startedDateTime);
  }

  const pageXray1 = window.PageXray.convertIndex(
    config.har1.har,
    config.har1.run,
    { firstParty: config.firstParty }
  );
  const pageXray2 = window.PageXray.convertIndex(
    config.har2.har,
    config.har2.run,
    { firstParty: config.firstParty }
  );

  // special handling for Template7 limits
  // so we massage the data
  const runs1 = [];
  const runs2 = [];
  for (let i = 0; i < config.har1.har.log.pages.length; i++) {
    runs1.push({
      id: i,
      selected: config.har1.run == i ? 'selected' : '',
      show: i + 1
    });
  }
  for (let i = 0; i < config.har2.har.log.pages.length; i++) {
    runs2.push({
      id: i,
      selected: config.har2.run == i ? 'selected' : '',
      show: i + 1
    });
  }

  // It's time to start to parse content
  // make sure we have the helpers ready
  registerTemplateHelpers();

  parseTemplate(
    'resultHeaderTemplate',
    {
      p1: pageXray1,
      p2: pageXray2
    },
    'resultHeaderContent'
  );

  if (
    pageXray1.meta &&
    pageXray1.meta.filmstrip &&
    pageXray1.meta.filmstrip.length > 0 &&
    pageXray2.meta &&
    pageXray2.meta.filmstrip &&
    pageXray2.meta.filmstrip.length > 0
  ) {
    const filmstrip = getFilmstrip(pageXray1, pageXray2);
    parseTemplate(
      'filmstripTemplate',
      {
        config,
        filmstrip1: filmstrip.filmstrip1,
        filmstrip2: filmstrip.filmstrip2
      },
      'filmstripContent'
    );
  }

  parseTemplate(
    'waterfallTemplate',
    {
      config
    },
    'waterfallContent'
  );
  // Hack for settimng correct opacity
  document.getElementById('range').value = 0;
  changeOpacity(0, 'har1', 'har2');

  parseTemplate(
    'pageXrayTemplate',
    {
      p1: pageXray1,
      p2: pageXray2,
      config,
      runs1: runs1,
      runs2: runs2,
      cpuCategories1: pageXray1.cpu
        ? objectPropertiesToArray(pageXray1.cpu.categories)
        : undefined,
      cpuCategories2: pageXray2.cpu
        ? objectPropertiesToArray(pageXray2.cpu.categories)
        : undefined,
      cpuEvents1: pageXray1.cpu
        ? objectPropertiesToArray(pageXray1.cpu.events)
        : undefined,
      cpuEvents2: pageXray2.cpu
        ? objectPropertiesToArray(pageXray2.cpu.events)
        : undefined
    },
    'pageXrayContent'
  );

  const legendHolderEl = document.getElementById('waterfallLegendHolder');
  addWaterfall(
    config.har1.har,
    config.har1.run,
    'har1',
    legendHolderEl,
    slowestHarTiming
  );
  addWaterfall(
    config.har2.har,
    config.har2.run,
    'har2',
    legendHolderEl,
    slowestHarTiming
  );

  addVisualProgress(pageXray1, pageXray2, config);

  if (Object.keys(pageXray1.firstParty).length > 0) {
    parseTemplate(
      'thirdPartyTemplate',
      {
        p1: pageXray1,
        p2: pageXray2,
        config
      },
      'thirdPartyContent'
    );
  }

  const allDomains = getAllDomains(pageXray1, pageXray2);
  parseTemplate(
    'domainsTemplate',
    {
      domains: allDomains,
      config
    },
    'domainsContent'
  );

  // At the moment we only test this if you test the same URL
  // But we should find a better way to do it in the future
  if (pageXray1.url === pageXray2.url) {
    const requestDiff = getUniqueRequests(
      config.har1.har,
      config.har1.run,
      config.har2.har,
      config.har2.run
    );
    const total = getTotalDiff(requestDiff);
    parseTemplate(
      'requestDiffTemplate',
      {
        requestDiff,
        total,
        config
      },
      'requestDiffContent'
    );

    // Take care of comments
    if (config.comments) {
      const commentKeys = Object.keys(config.comments);
      for (let key of commentKeys) {
        const el = document.getElementById('comment-' + key);
        if (el) {
          el.innerHTML = config.comments[key];
        }
      }
    }
  }

  createUpload('har1upload');
  createUpload('har2upload');
}

/* global Chartist */
/* exported generateVisualProgress */

/**
 * We use Chartist to generate the visual progress
 * https: //gionkunz.github.io/chartist-js/
 * @param {*} visualProgress1
 * @param {*} visualProgress2
 * @param {*} id
 */

function generateVisualProgress(visualProgress1, visualProgress2, id) {
  let maxTime = 0;
  const series = [visualProgress1, visualProgress2].map(progressList => {
    let previousProgress = -1;

    return Object.keys(progressList).reduce((coordinates, milliSecond) => {
      const currentProgress = progressList[milliSecond];
      if (currentProgress !== previousProgress) {
        previousProgress = currentProgress;
        const time = (Number(milliSecond) / 1000).toFixed(2);
        if (time > maxTime) {
          maxTime = time;
        }
        coordinates.push({
          x: time,
          y: currentProgress
        });
      }
      return coordinates;
    }, []);
  });

  // let them end on the same spot.
  series[0].push({
    x: maxTime,
    y: 100
  });

  series[1].push({
    x: maxTime,
    y: 100
  });

  new Chartist.Line(
    '#' + id,
    {
      series
    },
    {
      showArea: true,
      showPoint: true,
      chartPadding: {
        top: 10,
        right: 0,
        bottom: 30,
        left: 10
      },
      axisX: {
        type: Chartist.AutoScaleAxis,
        onlyInteger: false,
        scaleMinSpace: 100,
        referenceValue: 1
      },
      lineSmooth: Chartist.Interpolation.step({
        postpone: true,
        fillHoles: false
      }),
      axisY: {
        onlyInteger: true
      },
      plugins: [
        Chartist.plugins.ctAxisTitle({
          axisX: {
            axisTitle: 'Time (seconds)',
            axisClass: 'ct-axis-title',
            offset: {
              x: 0,
              y: 50
            },
            textAnchor: 'middle'
          },
          axisY: {
            axisTitle: 'Visual progress %',
            axisClass: 'ct-axis-title',
            offset: {
              x: 0,
              y: -4
            },
            textAnchor: 'middle',
            flipTitle: false
          }
        }),
        Chartist.plugins.tooltip({
          transformTooltipTextFnc: function(text) {
            const m = text.split(',');
            return m[0] + 's ' + m[1] + '%';
          }
        })
      ]
    }
  );
}

/* global  Template7, formatBytes */

/* exported parseTemplate, , registerTemplateHelpers */
function parseTemplate(templateId, data, divId) {
  // parse the template
  const templateElement = document.getElementById(templateId);
  const template = Template7.compile(templateElement.innerHTML);
  const html = template(data);
  const div = document.getElementById(divId);
  div.innerHTML = html;
}

function registerTemplateHelpers() {
  Template7.registerHelper('get', function(obj, key, name) {
    if (!obj[key]) {
      return 0;
    }
    return obj[key][name];
  });

  Template7.registerHelper('getAsBytes', function(obj, key, name) {
    if (!obj[key]) {
      return 0;
    }
    return formatBytes(obj[key][name]);
  });
}

/* eslint-disable no-console */
console.log('Issues and PRs: https://github.com/sitespeedio/compare');
/* eslint-enable no-console */

/* exported updateInit */

/**
 * JavaScript functionality for the Service Worker update available prompt
 */
const elementCache = {
  dialog: document.querySelector('.update-available'),
  reloadButton: document.querySelector('.update-reload'),
  dismissButton: document.querySelector('.update-dismiss')
};

function showUpdateDialog() {
  elementCache.dialog.classList.add('update-visible');
}

function addUpdateEvents() {
  elementCache.dismissButton.addEventListener('click', evt => {
    evt.preventDefault();
    elementCache.dialog.classList.remove('update-visible');
  });

  elementCache.reloadButton.addEventListener('click', evt => {
    evt.preventDefault();
    window.location.reload();
  });
}

function updateInit() {
  showUpdateDialog();
  addUpdateEvents();
}
