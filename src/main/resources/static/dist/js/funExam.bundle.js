!function(t){var e={};function a(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},a.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=3)}({13:function(t,e){},3:function(t,e,a){"use strict";a.r(e),a(13),$(document).ready(function(){$.ajaxSetup({timeout:2e3}),(new class{constructor(){this.$avator=$("#avator"),this.$logout=$("#logout"),this.$examListForSign=$("#examListForSign"),this.$noExam=this.$examListForSign.find(".no-exam")}init(){this.getUser(),this.getExamList(),this.logout()}getUser(){$.get("/api/userinfo").then(t=>{const e=(t=JSON.parse(t)).data.username;t.ret&&e?this.$avator.text(e):this.$avator.text("游客")}).fail(t=>{this.$avator.text("游客")})}getExamList(){$.get("/api/exam-list-for-sign").then(t=>{const e=(t=JSON.parse(t)).data;if(t.ret&&e){this.$noExam.text("");const t=e.length;for(let a=0;a<t;a++)this.createCard(e[a])}else this.$noExam.text("暂无考试")}).fail(t=>{this.$noExam.text("暂无考试")})}logout(){this.$logout.on("click",()=>{$.get("/api/logout").then(t=>{}).fail(t=>{})})}createCard(t){let e=$("<h4>").addClass("card-title").text(t.name),a=[$("<p>").addClass("card-text").text("考试时间："+t.date),$("<p>").addClass("card-text").text("报名截止："+t.deadline),$("<p>").addClass("card-text").text("考试地点："+t.loc)],n=$("<button>").addClass("btn btn-sm btn-primary").attr("type","button").text("点击报名");n.on("click",t=>{t.preventDefault(),$.post("/api/user-sign-for-exam",JSON.stringify({})).then(t=>{const e=(t=JSON.parse(t)).data;t.ret&&"OK"===e.status&&n.addClass("disabled").attr("disabled","disabled").text("已报名")})});let s=$("<div>").addClass("card-body");s.append(e).append(a[0]).append(a[1]).append(a[2]).append(n),this.$examListForSign.append($("<div>").addClass("col-4").append($("<div>").addClass("card").width("100%").append(s)))}}).init()})}});
//# sourceMappingURL=funExam.bundle.js.map