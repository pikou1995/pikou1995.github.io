(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{178:function(t,e,n){t.exports=n(30)(60)},189:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));n(197);var r=n(195),o=n(0),i=n(92);function a(t){return function(t){if(Array.isArray(t))return u(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var c=[{title:"型号",dataIndex:"model",key:"model",filterMultiple:!1,onFilter:function(t,e){return e.model===t},filters:[]},{title:"规格",dataIndex:"spec",key:"spec"}];function l(t){var e=t.model,n=e.modelsLoaded,u=e.models,l=t.dispatch,s=t.showInsulationWeight,d=void 0===s||s,f=t.showSheathWeight,m=void 0===f||f,p=t.showOscrWeight,y=void 0===p||p;if(!n)return l(Object(i.a)()),null;var h=[].concat(c);return d&&h.push({title:"绝缘重量",dataIndex:"iw",key:"iw"}),m&&h.push({title:"护套重量",dataIndex:"sw",key:"sw"}),y&&h.push({title:"屏蔽重量",dataIndex:"oscr",key:"oscr"}),h[0].filters=a(new Set(u.map((function(t){return t.model})))).map((function(t){return{text:t,value:t}})),o.createElement("div",{style:t.style||{padding:15}},o.createElement(r.a,{columns:h,dataSource:u}))}},359:function(t,e,n){"use strict";n.r(e);var r=n(57),o=n(189);e.default=Object(r.connect)((function(t){return{model:t.model}}))(o.a)}}]);