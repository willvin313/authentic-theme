(function(b){if(typeof exports=="object"&&typeof module=="object"){b(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],b)}else{b(CodeMirror)}}})(function(b){b.defineMode("cmake",function(){var a=/({)?[a-zA-Z0-9_]+(})?/;function f(c,j){var d,k,l=false;while(!c.eol()&&(d=c.next())!=j.pending){if(d==="$"&&k!="\\"&&j.pending=='"'){l=true;break}k=d}if(l){c.backUp(1)}if(d==j.pending){j.continueString=false}else{j.continueString=true}return"string"}function e(c,d){var h=c.next();if(h==="$"){if(c.match(a)){return"variable-2"}return"variable"}if(d.continueString){c.backUp(1);return f(c,d)}if(c.match(/(\s+)?\w+\(/)||c.match(/(\s+)?\w+\ \(/)){c.backUp(1);return"def"}if(h=="#"){c.skipToEnd();return"comment"}if(h=="'"||h=='"'){d.pending=h;return f(c,d)}if(h=="("||h==")"){return"bracket"}if(h.match(/[0-9]/)){return"number"}c.eatWhile(/[\w-]/);return null}return{startState:function(){var c={};c.inDefinition=false;c.inInclude=false;c.continueString=false;c.pending=false;return c},token:function(c,d){if(c.eatSpace()){return null}return e(c,d)}}});b.defineMIME("text/x-cmake","cmake")});