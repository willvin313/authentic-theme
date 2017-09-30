(function(b){if(typeof exports=="object"&&typeof module=="object"){b(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],b)}else{b(CodeMirror)}}})(function(b){b.defineMode("elm",function(){function u(d,c,e){c(e);return e(d,c)}var A=/[a-z_]/;var q=/[A-Z]/;var t=/[0-9]/;var B=/[0-9A-Fa-f]/;var a=/[0-7]/;var r=/[a-z_A-Z0-9\']/;var s=/[-!#$%&*+.\/<=>?@\\^|~:\u03BB\u2192]/;var z=/[(),;[\]`{}]/;var x=/[ \t\v\f]/;function w(){return function(d,c){if(d.eatWhile(x)){return null}var e=d.next();if(z.test(e)){if(e=="{"&&d.eat("-")){var f="comment";if(d.eat("#")){f="meta"}return u(d,c,v(f,1))}return null}if(e=="'"){if(d.eat("\\")){d.next()}else{d.next()}if(d.eat("'")){return"string"}return"error"}if(e=='"'){return u(d,c,y)}if(q.test(e)){d.eatWhile(r);if(d.eat(".")){return"qualifier"}return"variable-2"}if(A.test(e)){var g=d.pos===1;d.eatWhile(r);return g?"variable-3":"variable"}if(t.test(e)){if(e=="0"){if(d.eat(/[xX]/)){d.eatWhile(B);return"integer"}if(d.eat(/[oO]/)){d.eatWhile(a);return"number"}}d.eatWhile(t);var f="number";if(d.eat(".")){f="number";d.eatWhile(t)}if(d.eat(/[eE]/)){f="number";d.eat(/[-+]/);d.eatWhile(t)}return f}if(s.test(e)){if(e=="-"&&d.eat(/-/)){d.eatWhile(/-/);if(!d.eat(s)){d.skipToEnd();return"comment"}}d.eatWhile(s);return"builtin"}return"error"}}function v(d,c){if(c==0){return w()}return function(f,e){var h=c;while(!f.eol()){var g=f.next();if(g=="{"&&f.eat("-")){++h}else{if(g=="-"&&f.eat("}")){--h;if(h==0){e(w());return d}}}}e(v(d,h));return d}}function y(d,c){while(!d.eol()){var e=d.next();if(e=='"'){c(w());return"string"}if(e=="\\"){if(d.eol()||d.eat(x)){c(C);return"string"}if(!d.eat("&")){d.next()}}}c(w());return"error"}function C(d,c){if(d.eat("\\")){return u(d,c,y)}d.next();c(w());return"error"}var D=(function(){var e={};var c=["case","of","as","if","then","else","let","in","infix","infixl","infixr","type","alias","input","output","foreign","loopback","module","where","import","exposing","_","..","|",":","=","\\",'"',"->","<-"];for(var d=c.length;d--;){e[c[d]]="keyword"}return e})();return{startState:function(){return{f:w()}},copyState:function(c){return{f:c.f}},token:function(c,d){var e=d.f(c,function(g){d.f=g});var f=c.current();return(D.hasOwnProperty(f))?D[f]:e}}});b.defineMIME("text/x-elm","elm")});