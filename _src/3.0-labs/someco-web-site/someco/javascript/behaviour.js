var Behaviour={list:new Array,register:function(A){Behaviour.list.push(A)},start:function(){Behaviour.addLoadEvent(function(){Behaviour.apply()})},apply:function(){for(h=0;sheet=Behaviour.list[h];h++){for(selector in sheet){list=document.getElementsBySelector(selector);if(!list){continue}for(i=0;element=list[i];i++){sheet[selector](element)}}}},addLoadEvent:function(A){var B=window.onload;if(typeof window.onload!="function"){window.onload=A}else{window.onload=function(){B();A()}}}};Behaviour.start();function getAllChildren(A){return A.all?A.all:A.getElementsByTagName("*")}document.getElementsBySelector=function(Q){if(!document.getElementsByTagName){return new Array()}var K=Q.split(" ");var F=new Array(document);for(var S=0;S<K.length;S++){token=K[S].replace(/^\s+/,"").replace(/\s+$/,"");if(token.indexOf("#")>-1){var N=token.split("#");var D=N[0];var M=N[1];var B=document.getElementById(M);if(B&&D&&B.nodeName.toLowerCase()!=D){return new Array()}F=new Array(B);continue}if(token.indexOf(".")>-1){var N=token.split(".");var D=N[0];var C=N[1];if(!D){D="*"}var H=new Array;var G=0;for(var T=0;T<F.length;T++){var I;if(D=="*"){I=getAllChildren(F[T])}else{I=F[T].getElementsByTagName(D)}for(var P=0;P<I.length;P++){H[G++]=I[P]}}F=new Array;var L=0;for(var O=0;O<H.length;O++){if(H[O].className&&H[O].className.match(new RegExp("\\b"+C+"\\b"))){F[L++]=H[O]}}continue}if(token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)){var D=RegExp.$1;var R=RegExp.$2;var A=RegExp.$3;var J=RegExp.$4;if(!D){D="*"}var H=new Array;var G=0;for(var T=0;T<F.length;T++){var I;if(D=="*"){I=getAllChildren(F[T])}else{I=F[T].getElementsByTagName(D)}for(var P=0;P<I.length;P++){H[G++]=I[P]}}F=new Array;var L=0;var E;switch(A){case"=":E=function(U){return(U.getAttribute(R)==J)};break;case"~":E=function(U){return(U.getAttribute(R).match(new RegExp("\\b"+J+"\\b")))};break;case"|":E=function(U){return(U.getAttribute(R).match(new RegExp("^"+J+"-?")))};break;case"^":E=function(U){return(U.getAttribute(R).indexOf(J)==0)};break;case"$":E=function(U){return(U.getAttribute(R).lastIndexOf(J)==U.getAttribute(R).length-J.length)};break;case"*":E=function(U){return(U.getAttribute(R).indexOf(J)>-1)};break;default:E=function(U){return U.getAttribute(R)}}F=new Array;var L=0;for(var O=0;O<H.length;O++){if(E(H[O])){F[L++]=H[O]}}continue}if(!F[0]){return }D=token;var H=new Array;var G=0;for(var T=0;T<F.length;T++){var I=F[T].getElementsByTagName(D);for(var P=0;P<I.length;P++){H[G++]=I[P]}}F=H}return F};