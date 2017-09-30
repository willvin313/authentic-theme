(function(b){if(typeof exports=="object"&&typeof module=="object"){b(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],b)}else{b(CodeMirror)}}})(function(b){b.defineMode("scheme",function(){var G="builtin",B="comment",J="string",M="atom",H="number",K="bracket";var D=2;function x(e){var c={},f=e.split(" ");for(var d=0;d<f.length;++d){c[f[d]]=true}return c}var L=x("λ case-lambda call/cc class define-class exit-handler field import inherit init-field interface let*-values let-values let/ec mixin opt-lambda override protect provide public rename require require-for-syntax syntax syntax-case syntax-error unit/sig unless when with-syntax and begin call-with-current-continuation call-with-input-file call-with-output-file case cond define define-syntax delay do dynamic-wind else for-each if lambda let let* let-syntax letrec letrec-syntax map or syntax-rules abs acos angle append apply asin assoc assq assv atan boolean? caar cadr call-with-input-file call-with-output-file call-with-values car cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? close-input-port close-output-port complex? cons cos current-input-port current-output-port denominator display eof-object? eq? equal? eqv? eval even? exact->inexact exact? exp expt #f floor force gcd imag-part inexact->exact inexact? input-port? integer->char integer? interaction-environment lcm length list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector max member memq memv min modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file output-port? pair? peek-char port? positive? procedure? quasiquote quote quotient rational? rationalize read read-char real-part real? remainder reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? #t tan transcript-off transcript-on truncate values vector vector->list vector-fill! vector-length vector-ref vector-set! with-input-from-file with-output-to-file write write-char zero?");var C=x("define let letrec let* lambda");function N(d,c,e){this.indent=d;this.type=c;this.prev=e}function A(e,d,c){e.indentStack=new N(d,c,e.indentStack)}function F(c){c.indentStack=c.indentStack.prev}var O=new RegExp(/^(?:[-+]i|[-+][01]+#*(?:\/[01]+#*)?i|[-+]?[01]+#*(?:\/[01]+#*)?@[-+]?[01]+#*(?:\/[01]+#*)?|[-+]?[01]+#*(?:\/[01]+#*)?[-+](?:[01]+#*(?:\/[01]+#*)?)?i|[-+]?[01]+#*(?:\/[01]+#*)?)(?=[()\s;"]|$)/i);var a=new RegExp(/^(?:[-+]i|[-+][0-7]+#*(?:\/[0-7]+#*)?i|[-+]?[0-7]+#*(?:\/[0-7]+#*)?@[-+]?[0-7]+#*(?:\/[0-7]+#*)?|[-+]?[0-7]+#*(?:\/[0-7]+#*)?[-+](?:[0-7]+#*(?:\/[0-7]+#*)?)?i|[-+]?[0-7]+#*(?:\/[0-7]+#*)?)(?=[()\s;"]|$)/i);var z=new RegExp(/^(?:[-+]i|[-+][\da-f]+#*(?:\/[\da-f]+#*)?i|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?@[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?[-+](?:[\da-f]+#*(?:\/[\da-f]+#*)?)?i|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?)(?=[()\s;"]|$)/i);var y=new RegExp(/^(?:[-+]i|[-+](?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)i|[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)@[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)|[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)[-+](?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)?i|(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*))(?=[()\s;"]|$)/i);function P(c){return c.match(O)}function I(c){return c.match(a)}function w(c,d){if(d===true){c.backUp(1)}return c.match(y)}function E(c){return c.match(z)}return{startState:function(){return{indentStack:null,indentation:0,mode:false,sExprComment:false}},token:function(j,h){if(h.indentStack==null&&j.sol()){h.indentation=j.indentation()}if(j.eatSpace()){return null}var o=null;switch(h.mode){case"string":var d,i=false;while((d=j.next())!=null){if(d=='"'&&!i){h.mode=false;break}i=!i&&d=="\\"}o=J;break;case"comment":var d,n=false;while((d=j.next())!=null){if(d=="#"&&n){h.mode=false;break}n=(d=="|")}o=B;break;case"s-expr-comment":h.mode=false;if(j.peek()=="("||j.peek()=="["){h.sExprComment=0}else{j.eatWhile(/[^/s]/);o=B;break}default:var k=j.next();if(k=='"'){h.mode="string";o=J}else{if(k=="'"){o=M}else{if(k=="#"){if(j.eat("|")){h.mode="comment";o=B}else{if(j.eat(/[tf]/i)){o=M}else{if(j.eat(";")){h.mode="s-expr-comment";o=B}else{var f=null,e=false,l=true;if(j.eat(/[ei]/i)){e=true}else{j.backUp(1)}if(j.match(/^#b/i)){f=P}else{if(j.match(/^#o/i)){f=I}else{if(j.match(/^#x/i)){f=E}else{if(j.match(/^#d/i)){f=w}else{if(j.match(/^[-+0-9.]/,false)){l=false;f=w}else{if(!e){j.eat("#")}}}}}}if(f!=null){if(l&&!e){j.match(/^#[ei]/i)}if(f(j)){o=H}}}}}}else{if(/^[-+0-9.]/.test(k)&&w(j,true)){o=H}else{if(k==";"){j.skipToEnd();o=B}else{if(k=="("||k=="["){var m="";var c=j.column(),g;while((g=j.eat(/[^\s\(\[\;\)\]]/))!=null){m+=g}if(m.length>0&&C.propertyIsEnumerable(m)){A(h,c+D,k)}else{j.eatSpace();if(j.eol()||j.peek()==";"){A(h,c+1,k)}else{A(h,c+j.current().length,k)}}j.backUp(j.current().length-1);if(typeof h.sExprComment=="number"){h.sExprComment++}o=K}else{if(k==")"||k=="]"){o=K;if(h.indentStack!=null&&h.indentStack.type==(k==")"?"(":"[")){F(h);if(typeof h.sExprComment=="number"){if(--h.sExprComment==0){o=B;h.sExprComment=false}}}}else{j.eatWhile(/[\w_\-!$%&*+\.\/:<=>?@\^~]/);if(L&&L.propertyIsEnumerable(j.current())){o=G}else{o="variable"}}}}}}}}}return(typeof h.sExprComment=="number")?B:o},indent:function(c){if(c.indentStack==null){return c.indentation}return c.indentStack.indent},closeBrackets:{pairs:'()[]{}""'},lineComment:";;"}});b.defineMIME("text/x-scheme","scheme")});