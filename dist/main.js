!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n);t(1);let r,o="anon";new Promise((e,n)=>{const t=new WebSocket("ws://127.0.0.1:8765/");t.onopen=(()=>e(t))}).then(e=>{e.onmessage=(e=>{!function(e){let n=JSON.parse(e.data);switch(console.log(n),n.tag){case"clients":!function(e){let n=e.list.map(e=>`<li>${e}</li>`).join("");a.innerHTML=n}(n);break;case"register":o=n.text;break;case"public":s(n);break;case"direct":s(n),"game"===n.sender&&u(n);break;case"game":u(n)}}(e)}),r=e});let a=document.getElementById("room-list"),c=document.getElementById("room-chat-messages");function s(e){let n=document.createElement("li");n.innerHTML=`<span>${e.sender}: ${e.text}</span>`,c.appendChild(n)}document.getElementById("room-chat-form").addEventListener("submit",function(e){e.preventDefault();let n=e.target.elements[0].value,t=`{"tag":"public", "sender":"${o}", "text":"${n}"}`;r.send(t)});let l=document.getElementById("opponent"),i=document.getElementById("avatar"),d=(document.getElementById("board"),[]);function u(e){switch(e.text){case"join1":d.push(e.sender),e.sender==o?f("join",e.sender,1):m("join",e.sender,1);break;case"join2":if(d.push(e.sender),e.sender==o)f("join",e.sender,2);else{m("join",e.sender,2);let n=`{"tag": "game", "sender":"${o}", "receiver": "game", "text":"ready"}`;r.send(n)}break;case"try later.":f("reject",d[0],1),m("reject",d[1],2);break;case"start":!function(e="blank"){"blank"===e?console.log("board ready"):console.log("board updated")}();break;case"move":console.log("move made");break;case"card":console.log("card drawn")}}function f(e,n,t){switch(e){case"join":case"reject":i.innerHTML=`<span>${n} as Player${t}</span>`;break;default:console.log("unknown")}}function m(e,n,t){switch(e){case"join":case"reject":l.innerHTML=`<span>${n} as Player${t}</span>`;break;default:console.log("unknown")}}i.addEventListener("click",()=>{!function(){let e=`{"tag": "game", "sender":"${o}", "receiver": "game", "text":"join"}`;r.send(e)}()})},function(e,n,t){}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwibW9kdWxlIiwiaSIsImwiLCJtb2R1bGVzIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiY29ubmVjdGlvbiIsImNsaWVudElkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzb2NrZXQiLCJXZWJTb2NrZXQiLCJvbm9wZW4iLCJ0aGVuIiwib25tZXNzYWdlIiwiZXZlbnQiLCJlIiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsImNvbnNvbGUiLCJsb2ciLCJ0YWciLCJuZXdfbGlzdCIsImxpc3QiLCJtYXAiLCJjbGllbnRIYW5kbGUiLCJqb2luIiwicm9vbV9saXN0IiwiaW5uZXJIVE1MIiwidXBkYXRlQ2xpZW50TGlzdCIsInRleHQiLCJ1cGRhdGVNZXNzYWdlc0xpc3QiLCJzZW5kZXIiLCJoYW5kbGVHYW1lTWVzc2FnZXMiLCJoYW5kbGVNZXNzYWdlcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJtZXNzYWdlc19saXN0IiwibmV3X21lc3NhZ2UiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwicHJldmVudERlZmF1bHQiLCJ0eHQiLCJ0YXJnZXQiLCJlbGVtZW50cyIsIm1lc3NhZ2UiLCJzZW5kIiwib3BwRGF0YSIsImF2dERhdGEiLCJwbGF5ZXJMaXN0IiwicHVzaCIsInVwZGF0ZUF2dERhdGEiLCJ1cGRhdGVPcHBEYXRhIiwiYm9hcmRBcnIiLCJ1cGRhdGVCb2FyZCIsInVUeXBlIiwicGxheWVyIiwicGxheWVyTnVtIiwicmVnaXN0ZXJQbGF5ZXIiXSwibWFwcGluZ3MiOiJhQUNBLElBQUFBLEtBR0EsU0FBQUMsRUFBQUMsR0FHQSxHQUFBRixFQUFBRSxHQUNBLE9BQUFGLEVBQUFFLEdBQUFDLFFBR0EsSUFBQUMsRUFBQUosRUFBQUUsSUFDQUcsRUFBQUgsRUFDQUksR0FBQSxFQUNBSCxZQVVBLE9BTkFJLEVBQUFMLEdBQUFNLEtBQUFKLEVBQUFELFFBQUFDLElBQUFELFFBQUFGLEdBR0FHLEVBQUFFLEdBQUEsRUFHQUYsRUFBQUQsUUFLQUYsRUFBQVEsRUFBQUYsRUFHQU4sRUFBQVMsRUFBQVYsRUFHQUMsRUFBQVUsRUFBQSxTQUFBUixFQUFBUyxFQUFBQyxHQUNBWixFQUFBYSxFQUFBWCxFQUFBUyxJQUNBRyxPQUFBQyxlQUFBYixFQUFBUyxHQUEwQ0ssWUFBQSxFQUFBQyxJQUFBTCxLQUsxQ1osRUFBQWtCLEVBQUEsU0FBQWhCLEdBQ0Esb0JBQUFpQixlQUFBQyxhQUNBTixPQUFBQyxlQUFBYixFQUFBaUIsT0FBQUMsYUFBd0RDLE1BQUEsV0FFeERQLE9BQUFDLGVBQUFiLEVBQUEsY0FBaURtQixPQUFBLEtBUWpEckIsRUFBQXNCLEVBQUEsU0FBQUQsRUFBQUUsR0FFQSxHQURBLEVBQUFBLElBQUFGLEVBQUFyQixFQUFBcUIsSUFDQSxFQUFBRSxFQUFBLE9BQUFGLEVBQ0EsS0FBQUUsR0FBQSxpQkFBQUYsUUFBQUcsV0FBQSxPQUFBSCxFQUNBLElBQUFJLEVBQUFYLE9BQUFZLE9BQUEsTUFHQSxHQUZBMUIsRUFBQWtCLEVBQUFPLEdBQ0FYLE9BQUFDLGVBQUFVLEVBQUEsV0FBeUNULFlBQUEsRUFBQUssVUFDekMsRUFBQUUsR0FBQSxpQkFBQUYsRUFBQSxRQUFBTSxLQUFBTixFQUFBckIs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QUFBQyxJQUFBLFlBS0EsU0FBQWlDLEVBQUFHLEVBQUFDLEVBQUFDLEdBQ0EsT0FBQUYsR0FDQSxXQUdBLGFBQ0FSLEVBQUFwQixtQkFBeUM2QixjQUFtQkMsV0FDNUQsTUFDQSxRQUNBdkMsUUFBQUMsSUFBQSxZQXZFQTZCLEVBQUFSLGlCQUFBLGNBS0EsV0FDQSxJQUFBSywrQkFBK0N6Qyx5Q0FDL0NELEVBQUEyQyxLQUFBRCxHQU5BYSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0ICcuL3N0eWxlLmNzcydcblxubGV0IGNvbm5lY3Rpb247XG5sZXQgY2xpZW50SWQgPSAnYW5vbic7XG5cbmZ1bmN0aW9uIGNvbm5lY3QgKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT4ge1xuICAgICAgICBjb25zdCBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KFwid3M6Ly8xMjcuMC4wLjE6ODc2NS9cIik7XG4gICAgICAgIHNvY2tldC5vbm9wZW4gPSAoKSA9PiByZXNvbHZlKHNvY2tldCk7XG4gICAgfSk7XG59XG5jb25uZWN0KCkudGhlbigoc29ja2V0KT0+e1xuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaGFuZGxlTWVzc2FnZXMoZXZlbnQpXG4gICAgfVxuICAgIGNvbm5lY3Rpb24gPSBzb2NrZXQ7XG59KTtcblxuLy8gY2FjaGUgRE9NXG5sZXQgcm9vbV9saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb20tbGlzdCcpO1xubGV0IG1lc3NhZ2VzX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vbS1jaGF0LW1lc3NhZ2VzJyk7XG5sZXQgY2hhdF9mb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb20tY2hhdC1mb3JtJyk7XG5jaGF0X2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHViTWVzc2FnZSk7XG5cbi8vIGhhbmRsZSB3cyBldmVudHNcblxuZnVuY3Rpb24gaGFuZGxlTWVzc2FnZXMgKGUpIHtcbiAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBzd2l0Y2ggKGRhdGEudGFnKSB7XG4gICAgICAgIGNhc2UgJ2NsaWVudHMnOlxuICAgICAgICAgICAgdXBkYXRlQ2xpZW50TGlzdChkYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyZWdpc3Rlcic6XG4gICAgICAgICAgICBjbGllbnRJZCA9IGRhdGEudGV4dDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwdWJsaWMnOlxuICAgICAgICAgICAgdXBkYXRlTWVzc2FnZXNMaXN0KGRhdGEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2RpcmVjdCc6XG4gICAgICAgICAgICB1cGRhdGVNZXNzYWdlc0xpc3QoZGF0YSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zZW5kZXIgPT09ICdnYW1lJykgeyBoYW5kbGVHYW1lTWVzc2FnZXMoZGF0YSk7IH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdnYW1lJzpcbiAgICAgICAgICAgIGhhbmRsZUdhbWVNZXNzYWdlcyhkYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWtcbiAgICB9XG5cbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZU1lc3NhZ2VzTGlzdChkYXRhKSB7XG4gICAgbGV0IG5ld19tZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBuZXdfbWVzc2FnZS5pbm5lckhUTUwgPSBgPHNwYW4+JHtkYXRhLnNlbmRlcn06ICR7ZGF0YS50ZXh0fTwvc3Bhbj5gO1xuICAgIG1lc3NhZ2VzX2xpc3QuYXBwZW5kQ2hpbGQobmV3X21lc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDbGllbnRMaXN0KGRhdGEpIHtcbmxldCBuZXdfbGlzdCA9IGRhdGEubGlzdC5tYXAoKGNsaWVudEhhbmRsZSkgPT4gYDxsaT4ke2NsaWVudEhhbmRsZX08L2xpPmApLmpvaW4oJycpO1xuICAgIHJvb21fbGlzdC5pbm5lckhUTUwgPSBuZXdfbGlzdDtcbn1cblxuZnVuY3Rpb24gcHViTWVzc2FnZSAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB0eHQgPSBldmVudC50YXJnZXQuZWxlbWVudHNbMF0udmFsdWU7XG4gICAgbGV0IHRhZyA9ICdwdWJsaWMnO1xuICAgIGxldCBtZXNzYWdlID0gYHtcInRhZ1wiOlwiJHt0YWd9XCIsIFwic2VuZGVyXCI6XCIke2NsaWVudElkfVwiLCBcInRleHRcIjpcIiR7dHh0fVwifWA7IFxuICAgIGNvbm5lY3Rpb24uc2VuZChtZXNzYWdlKTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBnYW1lIHN0dWZmXG5cbmxldCBvcHBEYXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wcG9uZW50Jyk7XG5sZXQgYXZ0RGF0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdmF0YXInKTtcbmxldCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZCcpO1xubGV0IHBsYXllckxpc3QgPSBbXTtcblxuYXZ0RGF0YS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByZWdpc3RlclBsYXllcigpO1xuICAgIC8vIHVwZGF0ZUF2dERhdGEoKTtcbiB9KTtcblxuZnVuY3Rpb24gcmVnaXN0ZXJQbGF5ZXIoKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSBge1widGFnXCI6IFwiZ2FtZVwiLCBcInNlbmRlclwiOlwiJHtjbGllbnRJZH1cIiwgXCJyZWNlaXZlclwiOiBcImdhbWVcIiwgXCJ0ZXh0XCI6XCJqb2luXCJ9YDtcbiAgICBjb25uZWN0aW9uLnNlbmQobWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUdhbWVNZXNzYWdlcyhkYXRhKSB7XG4gICAgc3dpdGNoIChkYXRhLnRleHQpIHtcbiAgICAgICAgY2FzZSAnam9pbjEnOlxuICAgICAgICAgICAgcGxheWVyTGlzdC5wdXNoKGRhdGEuc2VuZGVyKTtcbiAgICAgICAgICAgIGlmIChkYXRhLnNlbmRlciA9PSBjbGllbnRJZCkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZUF2dERhdGEoJ2pvaW4nLGRhdGEuc2VuZGVyLDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVPcHBEYXRhKCdqb2luJyxkYXRhLnNlbmRlciwxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdqb2luMic6XG4gICAgICAgICAgICBwbGF5ZXJMaXN0LnB1c2goZGF0YS5zZW5kZXIpO1xuICAgICAgICAgICAgaWYgKGRhdGEuc2VuZGVyID09IGNsaWVudElkKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlQXZ0RGF0YSgnam9pbicsZGF0YS5zZW5kZXIsMik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVwZGF0ZU9wcERhdGEoJ2pvaW4nLGRhdGEuc2VuZGVyLDIpO1xuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gYHtcInRhZ1wiOiBcImdhbWVcIiwgXCJzZW5kZXJcIjpcIiR7Y2xpZW50SWR9XCIsIFwicmVjZWl2ZXJcIjogXCJnYW1lXCIsIFwidGV4dFwiOlwicmVhZHlcIn1gO1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc2VuZChtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0cnkgbGF0ZXIuJzpcbiAgICAgICAgICAgIHVwZGF0ZUF2dERhdGEoJ3JlamVjdCcscGxheWVyTGlzdFswXSwxKTtcbiAgICAgICAgICAgIHVwZGF0ZU9wcERhdGEoJ3JlamVjdCcscGxheWVyTGlzdFsxXSwyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgICAgICB1cGRhdGVCb2FyZCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ21vdmUnOlxuICAgICAgICAgICAgY29uc29sZS5sb2coJ21vdmUgbWFkZScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NhcmQnOlxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhcmQgZHJhd24nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVBdnREYXRhKHVUeXBlLHBsYXllcixwbGF5ZXJOdW0pIHtcbiAgICBzd2l0Y2ggKHVUeXBlKSB7XG4gICAgICAgIGNhc2UgJ2pvaW4nOlxuICAgICAgICAgICAgYXZ0RGF0YS5pbm5lckhUTUwgPSBgPHNwYW4+JHtwbGF5ZXJ9IGFzIFBsYXllciR7cGxheWVyTnVtfTwvc3Bhbj5gO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JlamVjdCc6XG4gICAgICAgICAgICBhdnREYXRhLmlubmVySFRNTCA9IGA8c3Bhbj4ke3BsYXllcn0gYXMgUGxheWVyJHtwbGF5ZXJOdW19PC9zcGFuPmA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1bmtub3duJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU9wcERhdGEodVR5cGUscGxheWVyLHBsYXllck51bSkge1xuICAgIHN3aXRjaCAodVR5cGUpIHtcbiAgICAgICAgY2FzZSAnam9pbic6XG4gICAgICAgICAgICBvcHBEYXRhLmlubmVySFRNTCA9IGA8c3Bhbj4ke3BsYXllcn0gYXMgUGxheWVyJHtwbGF5ZXJOdW19PC9zcGFuPmA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmVqZWN0JzpcbiAgICAgICAgICAgIG9wcERhdGEuaW5uZXJIVE1MID0gYDxzcGFuPiR7cGxheWVyfSBhcyBQbGF5ZXIke3BsYXllck51bX08L3NwYW4+YDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Vua25vd24nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQm9hcmQoYm9hcmRBcnIgPSAnYmxhbmsnKSB7XG4gICAgaWYgKGJvYXJkQXJyID09PSAnYmxhbmsnKSB7XG4gICAgICAgIGJ1aWxkQm9hcmQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdib2FyZCB1cGRhdGVkJyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBidWlsZEJvYXJkKCkge1xuICAgIC8vIGxldCBjb2xzID0gWycwJywnMScsJzInLCczJywnNCddO1xuICAgIC8vIGxldCByb3dzID0gWycwJywnMScsJzInLCczJywnNCddO1xuICAgIC8vIGxldCBzcXVhcmUgPSAocixjKSA9PiB7XG4gICAgLy8gICAgIGxldCBpZCA9IGBzLSR7cn0ke2N9YDtcbiAgICAvLyAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzID1cInNxdWFyZVwiIGlkPVwiJHtpZH1cIj48L2Rpdj5gXG4gICAgLy8gfVxuICAgIC8vIGxldCBncmlkID0gcm93cy5tYXAoIChyKSA9PiBjb2xzLm1hcCggKGMpID0+IHNxdWFyZShgJHtyfSR7Y31gKSApICk7XG4gICAgLy8gbGV0IHNxdWFyZXMgPSBncmlkLm1hcCggKHIpID0+IHIuam9pbignJykgKS5qb2luKCcnKTtcbiAgICAvLyBib2FyZC5pbm5lckhUTUwgPSBzcXVhcmVzO1xuICAgIGNvbnNvbGUubG9nKFwiYm9hcmQgcmVhZHlcIik7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==