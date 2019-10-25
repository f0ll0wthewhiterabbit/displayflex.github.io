(window["webpackJsonpig-react-starter"]=window["webpackJsonpig-react-starter"]||[]).push([[7],{117:function(n,e,t){"use strict";t.d(e,"a",(function(){return r}));var r=function(n){var e=60*Number("120")*1e3;return Date.now()-n>e}},120:function(n,e,t){"use strict";var r=t(0),a=t.n(r),c=t(92),o=t(25);function u(){var n=Object(o.a)(["\n  text-align: center;\n  font-size: ",";\n  margin-bottom: 40px;\n"]);return u=function(){return n},n}var i=t(21).c.p(u(),(function(n){return n.theme.fontSizes.big})),l=function(n){var e=n.message;return a.a.createElement(i,null,a.a.createElement(c.a,{type:"warning"})," ",e)};e.a=l},230:function(n,e,t){"use strict";t.r(e);var r=t(0),a=t.n(r),c=t(91),o=t(37),u=t(40),i=t(41),l=t.n(i),f=t(25),m=t(21);function h(){var n=Object(f.a)(["\n  text-align: center;\n  text-transform: uppercase;\n"]);return h=function(){return n},n}var s=m.c.h2(h()),d=function(n){var e=n.cityName;return a.a.createElement(s,null,e)},g=Object(o.b)((function(n){return{cityName:n.location.cityName}}))(d);function b(){var n=Object(f.a)(["\n  display: block;\n  font-size: ",";\n  margin-bottom: 10px;\n"]);return b=function(){return n},n}function p(){var n=Object(f.a)(["\n  font-size: ",";\n"]);return p=function(){return n},n}function v(){var n=Object(f.a)(["\n  @media (min-width: ",") {\n    margin-right: 15px;\n  }\n"]);return v=function(){return n},n}function w(){var n=Object(f.a)(["\n  width: 130px;\n  height: auto;\n"]);return w=function(){return n},n}function E(){var n=Object(f.a)(["\n  text-align: center;\n  margin-bottom: 30px;\n\n  @media (min-width: ",") {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n"]);return E=function(){return n},n}var y=m.c.div(E(),(function(n){return n.theme.width.tablet})),j=m.c.img(w()),O=m.c.div(v(),(function(n){return n.theme.width.tablet})),x=m.c.b(p(),(function(n){return n.theme.fontSizes.veryBig})),S=m.c.span(b(),(function(n){return n.theme.fontSizes.big})),k=function(n){var e=n.temperature,t=n.weather,r=n.weatherImageSrc;return a.a.createElement(y,null,a.a.createElement(O,null,a.a.createElement(x,null,e," \xb0 c"),a.a.createElement(S,null,t)),a.a.createElement(j,{src:r,alt:t}))},z=Object(o.b)((function(n){return{temperature:n.location.temperature,weather:n.location.weather,weatherImageSrc:n.location.weatherImageSrc}}))(k),A=t(118);function D(){var n=Object(f.a)(["\n  background-color: ",";\n  border-color: ",";\n  color: ",";\n  text-transform: uppercase;\n  height: 48px;\n  font-size: ",";\n\n  &:hover {\n    background-color: ",";\n    border-color: ",";\n    color: ",";\n  }\n"]);return D=function(){return n},n}var I=Object(m.c)(A.a)(D(),(function(n){return n.theme.colors.secondary}),(function(n){return n.theme.colors.secondary}),(function(n){return n.theme.colors.fontSecondary}),(function(n){return n.theme.fontSizes.normal}),(function(n){return n.theme.colors.secondaryLight}),(function(n){return n.theme.colors.secondaryLight}),(function(n){return n.theme.colors.fontSecondary})),N=t(39),T=t(120),R=t(117);function q(){var n=Object(f.a)(["\n  button {\n    width: 100%;\n  }\n\n  @media (min-width: ",") {\n    button {\n      display: block;\n      margin-left: auto;\n      margin-right: auto;\n      width: auto;\n      padding-left: 30px;\n      padding-right: 30px;\n    }\n  }\n"]);return q=function(){return n},n}var B=m.c.div(q(),(function(n){return n.theme.width.tablet})),C=function(n){var e=n.temperature,t=n.weather,c=n.showStoragedResult;Object(r.useEffect)((function(){l.a.getItem("weatherAppData",(function(n,e){console.log("STORAGE DATA",e),n||e&&!Object(R.a)(e.clientDate)&&c(e)}))}));var o;if(e||t)o=a.a.createElement(a.a.Fragment,null,a.a.createElement(g,null),a.a.createElement(z,null));else{o=a.a.createElement(T.a,{message:"There is no data for your city. Try to change the setup."})}return a.a.createElement(B,null,o,a.a.createElement(u.b,{to:N.b,onClick:function(){l.a.removeItem("weatherAppData")}},a.a.createElement(I,{icon:"setting"},"Change Setup")))},J=t(9),L=Object(o.b)((function(n){return{temperature:n.location.temperature,weather:n.location.weather}}),(function(n){return{showStoragedResult:function(e){return n(Object(J.n)(e))}}}))(C),P=function(){return a.a.createElement(c.a,null,a.a.createElement(L,null))};e.default=P},91:function(n,e,t){"use strict";var r=t(0),a=t.n(r),c=t(92),o=t(25),u=t(21);function i(){var n=Object(o.a)(["\n  font-size: ",";\n  color: ",";\n  margin-bottom: 0;\n"]);return i=function(){return n},n}function l(){var n=Object(o.a)(["\n  height: 64px;\n  background-color: ",";\n  color: ",";\n  padding-left: ",";\n  padding-right: ",";\n  padding-top: ",";\n  padding-bottom: ",";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);return l=function(){return n},n}var f=u.c.header(l(),(function(n){return n.theme.colors.backgroundDark}),(function(n){return n.theme.colors.fontPrimary}),(function(n){return n.theme.unit.quadriple}),(function(n){return n.theme.unit.quadriple}),(function(n){return n.theme.unit.double}),(function(n){return n.theme.unit.double})),m=u.c.h1(i(),(function(n){return n.theme.fontSizes.veryBig}),(function(n){return n.theme.colors.fontPrimary})),h=function(){return a.a.createElement(f,null,a.a.createElement(m,null,a.a.createElement(c.a,{type:"cloud",theme:"filled"})," Weather App"))},s=function(n){var e=n.children;return a.a.createElement("div",null,a.a.createElement(h,null),a.a.createElement("main",null,e))};e.a=s}}]);
//# sourceMappingURL=7.92adb785.chunk.js.map