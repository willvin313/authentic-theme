(function(b){if(typeof exports=="object"&&typeof module=="object"){b(require("../../lib/codemirror"),require("../clike/clike"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror","../clike/clike"],b)}else{b(CodeMirror)}}})(function(u){var r=("this super static final const abstract class extends external factory implements get native operator set typedef with enum throw rethrow assert break case continue default in return new deferred async await covariant try catch finally do else for if switch while import library export part of show hide is as").split(" ");var x="try catch finally do else for if switch while".split(" ");var q="true false null".split(" ");var y="void bool num int double dynamic var String".split(" ");function n(a){var b={};for(var c=0;c<a.length;++c){b[a[c]]=true}return b}function p(a){(a.interpolationStack||(a.interpolationStack=[])).push(a.tokenize)}function s(a){return(a.interpolationStack||(a.interpolationStack=[])).pop()}function t(a){return a.interpolationStack?a.interpolationStack.length:0}u.defineMIME("application/dart",{name:"clike",keywords:n(r),blockKeywords:n(x),builtin:n(y),atoms:n(q),hooks:{"@":function(a){a.eatWhile(/[\w\$_\.]/);return"meta"},"'":function(a,b){return o("'",a,b,false)},'"':function(a,b){return o('"',a,b,false)},r:function(a,b){var c=a.peek();if(c=="'"||c=='"'){return o(a.next(),a,b,true)}return false},"}":function(b,a){if(t(a)>0){a.tokenize=s(a);return null}return false},"/":function(a,b){if(!a.eat("*")){return false}b.tokenize=v(1);return b.tokenize(a,b)}}});function o(f,a,c,e){var d=false;if(a.eat(f)){if(a.eat(f)){d=true}else{return"string"}}function b(g,i){var h=false;while(!g.eol()){if(!e&&!h&&g.peek()=="$"){p(i);i.tokenize=w;return"string"}var j=g.next();if(j==f&&!h&&(!d||g.match(f+f))){i.tokenize=null;break}h=!e&&!h&&j=="\\"}return"string"}c.tokenize=b;return b(a,c)}function w(a,b){a.eat("$");if(a.eat("{")){b.tokenize=null}else{b.tokenize=z}return null}function z(a,b){a.eatWhile(/[\w_]/);b.tokenize=s(b);return"variable"}function v(a){return function(b,c){var d;while(d=b.next()){if(d=="*"&&b.eat("/")){if(a==1){c.tokenize=null;break}else{c.tokenize=v(a-1);return c.tokenize(b,c)}}else{if(d=="/"&&b.eat("*")){c.tokenize=v(a+1);return c.tokenize(b,c)}}}return"comment"}}u.registerHelper("hintWords","application/dart",r.concat(q).concat(y));u.defineMode("dart",function(a){return u.getMode(a,"application/dart")},"clike")});