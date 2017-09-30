(function(b){if(typeof exports=="object"&&typeof module=="object"){b(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],b)}else{b(CodeMirror)}}})(function(h){function i(a){return new RegExp("^(("+a.join(")|(")+"))\\b")}var m=i(["and","or","not","is"]);var n=["as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","lambda","pass","raise","return","try","while","with","yield","in"];var j=["abs","all","any","bin","bool","bytearray","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__","NotImplemented","Ellipsis","__debug__"];h.registerHelper("hintWords","python",n.concat(j));function l(a){return a.scopes[a.scopes.length-1]}h.defineMode("python",function(H,K){var T="error";var d=K.singleDelimiters||/^[\(\)\[\]\{\}@,:`=;\.]/;var V=K.doubleOperators||/^([!<>]==|<>|<<|>>|\/\/|\*\*)/;var L=K.doubleDelimiters||/^(\+=|\-=|\*=|%=|\/=|&=|\|=|\^=)/;var I=K.tripleDelimiters||/^(\/\/=|>>=|<<=|\*\*=)/;var S=K.hangingIndent||H.indentUnit;var M=n,c=j;if(K.extra_keywords!=undefined){M=M.concat(K.extra_keywords)}if(K.extra_builtins!=undefined){c=c.concat(K.extra_builtins)}var U=!(K.version&&Number(K.version)<3);if(U){var e=K.singleOperators||/^[\+\-\*\/%&|\^~<>!@]/;var N=K.identifiers||/^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;M=M.concat(["nonlocal","False","True","None","async","await"]);c=c.concat(["ascii","bytes","exec","print"]);var F=new RegExp("^(([rbuf]|(br))?('{3}|\"{3}|['\"]))","i")}else{var e=K.singleOperators||/^[\+\-\*\/%&|\^~<>!]/;var N=K.identifiers||/^[_A-Za-z][_A-Za-z0-9]*/;M=M.concat(["exec","print"]);c=c.concat(["apply","basestring","buffer","cmp","coerce","execfile","file","intern","long","raw_input","reduce","reload","unichr","unicode","xrange","False","True","None"]);var F=new RegExp("^(([rubf]|(ur)|(br))?('{3}|\"{3}|['\"]))","i")}var J=i(M);var Q=i(c);function g(o,p){if(o.sol()){p.indent=o.indentation()}if(o.sol()&&l(p).type=="py"){var s=l(p).offset;if(o.eatSpace()){var r=o.indentation();if(r>s){R(p)}else{if(r<s&&P(o,p)&&o.peek()!="#"){p.errorToken=true}}return null}else{var q=b(o,p);if(s>0&&P(o,p)){q+=" "+T}return q}}return b(o,p)}function b(o,p){if(o.eatSpace()){return null}var q=o.peek();if(q=="#"){o.skipToEnd();return"comment"}if(o.match(/^[0-9\.]/,false)){var r=false;if(o.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i)){r=true}if(o.match(/^[\d_]+\.\d*/)){r=true}if(o.match(/^\.\d+/)){r=true}if(r){o.eat(/J/i);return"number"}var s=false;if(o.match(/^0x[0-9a-f_]+/i)){s=true}if(o.match(/^0b[01_]+/i)){s=true}if(o.match(/^0o[0-7_]+/i)){s=true}if(o.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/)){o.eat(/J/i);s=true}if(o.match(/^0(?![\dx])/i)){s=true}if(s){o.eat(/L/i);return"number"}}if(o.match(F)){p.tokenize=a(o.current());return p.tokenize(o,p)}if(o.match(I)||o.match(L)){return"punctuation"}if(o.match(V)||o.match(e)){return"operator"}if(o.match(d)){return"punctuation"}if(p.lastToken=="."&&o.match(N)){return"property"}if(o.match(J)||o.match(m)){return"keyword"}if(o.match(Q)){return"builtin"}if(o.match(/^(self|cls)\b/)){return"variable-2"}if(o.match(N)){if(p.lastToken=="def"||p.lastToken=="class"){return"def"}return"variable"}o.next();return T}function a(r){while("rubf".indexOf(r.charAt(0).toLowerCase())>=0){r=r.substr(1)}var p=r.length==1;var q="string";function o(s,t){while(!s.eol()){s.eatWhile(/[^'"\\]/);if(s.eat("\\")){s.next();if(p&&s.eol()){return q}}else{if(s.match(r)){t.tokenize=g;return q}else{s.eat(/['"]/)}}}if(p){if(K.singleLineStringErrors){return T}else{t.tokenize=g}}return q}o.isString=true;return o}function R(o){while(l(o).type!="py"){o.scopes.pop()}o.scopes.push({offset:l(o).offset+H.indentUnit,type:"py",align:null})}function f(p,q,r){var o=p.match(/^([\s\[\{\(]|#.*)*$/,false)?null:p.column()+1;q.scopes.push({offset:q.indent+S,type:r,align:o})}function P(p,q){var o=p.indentation();while(q.scopes.length>1&&l(q).offset>o){if(l(q).type!="py"){return true}q.scopes.pop()}return l(q).offset!=o}function G(o,q){if(o.sol()){q.beginningOfLine=true}var r=q.tokenize(o,q);var p=o.current();if(q.beginningOfLine&&p=="@"){return o.match(N,false)?"meta":U?"operator":T}if(/\S/.test(p)){q.beginningOfLine=false}if((r=="variable"||r=="builtin")&&q.lastToken=="meta"){r="meta"}if(p=="pass"||p=="return"){q.dedent+=1}if(p=="lambda"){q.lambda=true}if(p==":"&&!q.lambda&&l(q).type=="py"){R(q)}var s=p.length==1?"[({".indexOf(p):-1;if(s!=-1){f(o,q,"])}".slice(s,s+1))}s="])}".indexOf(p);if(s!=-1){if(l(q).type==p){q.indent=q.scopes.pop().offset-S}else{return T}}if(q.dedent>0&&o.eol()&&l(q).type=="py"){if(q.scopes.length>1){q.scopes.pop()}q.dedent-=1}return r}var O={startState:function(o){return{tokenize:g,scopes:[{offset:o||0,type:"py",align:null}],indent:o||0,lastToken:null,lambda:false,dedent:0}},token:function(o,q){var p=q.errorToken;if(p){q.errorToken=false}var r=G(o,q);if(r&&r!="comment"){q.lastToken=(r=="keyword"||r=="punctuation")?o.current():r}if(r=="punctuation"){r=null}if(o.eol()&&q.lambda){q.lambda=false}return p?r+" "+T:r},indent:function(o,r){if(o.tokenize!=g){return o.tokenize.isString?h.Pass:0}var p=l(o),q=p.type==r.charAt(0);if(p.align!=null){return p.align-(q?1:0)}else{return p.offset-(q?S:0)}},electricInput:/^\s*[\}\]\)]$/,closeBrackets:{triples:"'\""},lineComment:"#",fold:"indent"};return O});h.defineMIME("text/x-python","python");var k=function(a){return a.split(" ")};h.defineMIME("text/x-cython",{name:"python",extra_keywords:k("by cdef cimport cpdef ctypedef enum except extern gil include nogil property public readonly struct union DEF IF ELIF ELSE")})});