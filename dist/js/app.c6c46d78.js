(function(){"use strict";var t={6077:function(t,e,i){var r=i(9242),n=i(3396);function s(t,e){const i=(0,n.up)("router-view");return(0,n.wg)(),(0,n.j4)(i)}var o=i(89);const l={},a=(0,o.Z)(l,[["render",s]]);var h=a,c=i(2483);function u(t,e,i,r,s,o){const l=(0,n.up)("GridComponent");return(0,n.wg)(),(0,n.j4)(l)}var d=i(7139);const f={class:"configuration"},p={key:0},v={key:1},g={key:2},w={class:"table-container"},m=["id"],b=["onUpdate:modelValue","onClick","onMousedown","onMouseover"],k={class:"configuration"},_=["disabled"];function x(t,e,i,s,o,l){return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",f,[null===t.start?((0,n.wg)(),(0,n.iD)("h3",p," Select the starting point")):null===t.end?((0,n.wg)(),(0,n.iD)("h3",v," Select the end point")):((0,n.wg)(),(0,n.iD)("h3",g,"Click and hover to block the cell, path can't have a blocked cell")),(0,n.wy)((0,n._)("input",{type:"number",name:"Rows","onUpdate:modelValue":e[0]||(e[0]=e=>t.M=e),onChange:e[1]||(e[1]=(...e)=>t.initializeMatrix&&t.initializeMatrix(...e))},null,544),[[r.nr,t.M]]),(0,n.wy)((0,n._)("input",{type:"number",name:"Columns","onUpdate:modelValue":e[2]||(e[2]=e=>t.N=e),onChange:e[3]||(e[3]=(...e)=>t.initializeMatrix&&t.initializeMatrix(...e))},null,544),[[r.nr,t.N]])]),(0,n._)("div",w,[(0,n._)("table",{class:"table",onMouseleave:e[5]||(e[5]=e=>t.canSelectBlockedCellByHover=!1)},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.M,((i,s)=>((0,n.wg)(),(0,n.iD)("tr",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.N,((i,o)=>((0,n.wg)(),(0,n.iD)("td",{class:(0,d.C_)({pathEndpoints:t.matrix[s][o],blocked:t.isBlocked(s,o)}),id:`${s}-${o}`},[(0,n.wy)((0,n._)("input",{class:"matrix-checkbox","onUpdate:modelValue":e=>t.matrix[s][o]=e,onClick:(0,r.iM)((e=>t.markPoint(s,o)),["prevent"]),onMousedown:e=>t.markBlocked(s,o),onMouseup:e[4]||(e[4]=e=>t.canSelectBlockedCellByHover=!1),onMouseover:e=>t.canSelectBlockedCellByHover&&t.markBlocked(s,o),type:"checkbox"},null,40,b),[[r.e8,t.matrix[s][o]]])],10,m)))),256))])))),256))],32)]),(0,n._)("div",k,[(0,n._)("button",{class:"findPathButton",onClick:e[6]||(e[6]=(...e)=>t.createShortestPath&&t.createShortestPath(...e)),disabled:!t.start||!t.end},"Find the shortest path",8,_)])],64)}var y=i(7327),C=i(6520);i(560);class j{constructor(t){(0,y.Z)(this,"grid",void 0),(0,y.Z)(this,"shortest_path_parent_refs",{}),this.grid=t}shortestPath(t,e){let i=this.search(t,e);if(!i)return[];let r=[],n=e;while(void 0!==this.shortest_path_parent_refs[n.toString()])r.push(n),n=this.shortest_path_parent_refs[n.toString()];return r.push(n),r.reverse()}search(t,e){let i={};i[t.toString()]=!0;let r=[];for(let n of t.adjecent)this.shortest_path_parent_refs[n.toString()]=t,r.push(n);while(r.length>0){let t=[];for(let n=0;n<r.length;n++){let s=r[n];if(void 0===i[s.toString()]){if(s===e)return!0;for(let e of s.adjecent)void 0===i[e.toString()]&&(this.shortest_path_parent_refs[e.toString()]=s,t.push(e));i[s.toString()]=!0}}r=t}return!1}}class M{constructor(t,e,i=!0,r=1){if((0,y.Z)(this,"x",void 0),(0,y.Z)(this,"y",void 0),(0,y.Z)(this,"reachable",void 0),(0,y.Z)(this,"weight",void 0),(0,y.Z)(this,"adjecent",void 0),(0,y.Z)(this,"distance_from_source",void 0),t<0||e<0)throw new Error("grid cell dimentions should be positive");this.x=t,this.y=e,this.reachable=i,this.weight=r,this.adjecent=[],this.distance_from_source=1/0}toString(){return`${this.x}-${this.y}`}}class Z{constructor(t,e,i=[]){(0,y.Z)(this,"data",[]),(0,y.Z)(this,"row_size",void 0),(0,y.Z)(this,"col_size",void 0),this.row_size=t,this.col_size=e,i=i.map((t=>t)),i.sort(((t,e)=>t[0]!==e[0]?t[0]-e[0]:t[1]-e[1]));for(let r=0;r<t;r++){let t=[];for(let n=0;n<e;n++){let e=!0;0!==i.length&&i[0][0]==r&&i[0][1]==n&&(e=!1,i.shift());let s=new M(r,n,e);t.push(s)}this.data.push(t)}this.setAdjCells()}getCell(t,e){if(this.isValidIndex(t,e))return this.data[t][e];throw new Error("Invalid index")}getAllCells(){let t=[];for(let e of this.data)for(let i of e)t.push(i);return t}setCellWeight(t,e,i){let r=this.getCell(t,e);r.weight=i}isValidIndex(t,e){return t>=0&&e>=0&&t<this.row_size&&e<this.col_size}canReachIndex(t,e){if(this.isValidIndex(t,e)){let i=this.getCell(t,e);return i.reachable}return!1}setAdjCells(){for(let t=0;t<this.row_size;t++)for(let e=0;e<this.col_size;e++){let i=this.data[t][e];i.reachable&&(this.canReachIndex(t-1,e)&&i.adjecent.push(this.getCell(t-1,e)),this.canReachIndex(t+1,e)&&i.adjecent.push(this.getCell(t+1,e)),this.canReachIndex(t,e-1)&&i.adjecent.push(this.getCell(t,e-1)),this.canReachIndex(t,e+1)&&i.adjecent.push(this.getCell(t,e+1)))}}}class S extends C.w3{constructor(...t){super(...t),(0,y.Z)(this,"start",null),(0,y.Z)(this,"end",null),(0,y.Z)(this,"M",0),(0,y.Z)(this,"N",0),(0,y.Z)(this,"matrix",[]),(0,y.Z)(this,"blocked",{}),(0,y.Z)(this,"canSelectBlockedCellByHover",!1)}created(){this.initializeMatrix()}initializeMatrix(){this.start=null,this.end=null,this.blocked={},this.matrix=Array.from({length:this.M},(()=>Array.from({length:this.N},(()=>!1))))}markBlocked(t,e){if(!this.start||!this.end)return;this.canSelectBlockedCellByHover=!0;let i=this.blocked[t]?this.blocked[t]:{};i[e]=!i[e],this.blocked[t]=i}markPoint(t,e){null===this.start?(this.start=[t,e],this.matrix[t][e]=!0):null===this.end&&(this.end=[t,e],this.matrix[t][e]=!0)}isBlocked(t,e){return!!this.blocked[t]&&!!this.blocked[t][e]}getBlockedList(){let t=this.blocked,e=Object.keys(t).flatMap((e=>Object.keys(t[parseInt(e,10)]).filter((i=>t[parseInt(e,10)][parseInt(i,10)])).map((t=>[parseInt(e,10),parseInt(t,10)]))));return console.log(e),e}clearPath(){this.start&&this.end&&this.matrix.forEach(((t,e)=>t.forEach(((t,i)=>{e===this.start[0]&&i===this.start[1]||e===this.end[0]&&i===this.end[1]||(this.matrix[e][i]=!1)}))))}async createShortestPath(){this.clearPath();let t=this.getBlockedList(),e=new Z(this.M,this.N,t),i=e.getCell(...this.start),r=e.getCell(...this.end),n=new j(e),s=n.shortestPath(i,r);const o=t=>new Promise((e=>setTimeout(e,t)));for(let l of s)this.matrix[l.x][l.y]=!0,await o(50)}}const B=(0,o.Z)(S,[["render",x]]);var z=B,O=function(t,e,i,r){var n,s=arguments.length,o=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)o=Reflect.decorate(t,e,i,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(o=(s<3?n(o):s>3?n(e,i,o):n(e,i))||o);return s>3&&o&&Object.defineProperty(e,i,o),o};let P=class extends C.w3{};P=O([(0,C.Ei)({components:{GridComponent:z}})],P);var I=P;const D=(0,o.Z)(I,[["render",u]]);var R=D;const H=[{path:"/",name:"home",component:R}],E=(0,c.p7)({history:(0,c.PO)("/pathfinder-visualizer/"),routes:H});var V=E;(0,r.ri)(h).use(V).mount("#app")}},e={};function i(r){var n=e[r];if(void 0!==n)return n.exports;var s=e[r]={exports:{}};return t[r].call(s.exports,s,s.exports,i),s.exports}i.m=t,function(){var t=[];i.O=function(e,r,n,s){if(!r){var o=1/0;for(c=0;c<t.length;c++){r=t[c][0],n=t[c][1],s=t[c][2];for(var l=!0,a=0;a<r.length;a++)(!1&s||o>=s)&&Object.keys(i.O).every((function(t){return i.O[t](r[a])}))?r.splice(a--,1):(l=!1,s<o&&(o=s));if(l){t.splice(c--,1);var h=n();void 0!==h&&(e=h)}}return e}s=s||0;for(var c=t.length;c>0&&t[c-1][2]>s;c--)t[c]=t[c-1];t[c]=[r,n,s]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var r in e)i.o(e,r)&&!i.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,r){var n,s,o=r[0],l=r[1],a=r[2],h=0;if(o.some((function(e){return 0!==t[e]}))){for(n in l)i.o(l,n)&&(i.m[n]=l[n]);if(a)var c=a(i)}for(e&&e(r);h<o.length;h++)s=o[h],i.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return i.O(c)},r=self["webpackChunkpathfinder_visualizer"]=self["webpackChunkpathfinder_visualizer"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=i.O(void 0,[998],(function(){return i(6077)}));r=i.O(r)})();
//# sourceMappingURL=app.c6c46d78.js.map