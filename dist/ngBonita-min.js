"use strict";angular.module("ngBonita",["ngResource","ngCookies"]),angular.module("ngBonita").run(["$cookies",function(a){a.bonitaUrl="http://localhost:8080/bonita"}]),angular.module("ngBonita").factory("bonitaAuthentication",["$log","$http","$cookies","$q","BonitaSession",function(a,b,c,d,e){var f={};return f.setBonitaUrl=function(a){c.bonitaUrl=a},f.getBonitaUrl=function(){return c.bonitaUrl},f.getUserId=function(){return c.bonitaUserId},f.getUsername=function(){return c.bonitaUsername},f.login=function(f,g){var h=d.defer();return b({method:"POST",url:c.bonitaUrl+"/loginservice",data:$.param({username:f,password:g,redirect:!1}),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).success(function(){a.log("BonitaAuthentication.login success"),e.getCurrent().$promise.then(function(a){null===a?h.reject("No active session found"):(c.bonitaUsername=a.user_name,c.bonitaUserId=a.user_id,h.resolve(a))})}).error(function(b,d,e,f){a.log("BonitaAuthentication.login failure response "+d),a.log("Bonita URL: "+c.bonitaUrl),h.reject({data:b,status:d,headers:e,config:f})}),h.promise},f.logout=function(){var e=d.defer();return b({method:"GET",url:c.bonitaUrl+"/logoutservice",data:$.param({redirect:!1}),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).success(function(){a.log("BonitaAuthentication.logout success"),e.resolve()}).error(function(b,c,d,f){a.log("BonitaAuthentication.logout failure response "+c),e.reject({data:b,status:c,headers:d,config:f})}),e.promise},f}]),angular.module("ngBonita").factory("bonitaUtils",["$http",function(a){var b={},c=function(a,b){var c=b()["content-range"],d=c.split("/"),e=d[0].split("-");return{items:angular.fromJson(a),pageIndex:Number(e[0]),pageSize:Number(e[1]),totalCount:Number(d[1])}};return b.transformPaginateresponse=function(){return[c].concat(a.defaults.transformResponse)},b}]),angular.module("ngBonita").factory("ArchivedHumanTask",["$resource","$cookies","bonitaUtils",function(a,b,c){return a(b.bonitaUrl+"/API/bpm/archivedHumanTask/:id",{id:"@id",p:0,c:10,o:"reached_state_date ASC"},{getCompletedByCurrentUser:{method:"GET",params:{f:["assigned_id="+b.bonitaUserId]},transformResponse:c.transformPaginateresponse()}})}]),angular.module("ngBonita").factory("ArchivedProcessInstance",["$resource","$cookies","bonitaUtils",function(a,b,c){return a(b.bonitaUrl+"/API/bpm/archivedCase/:id",{id:"@id",p:0,c:10},{getStartedByCurrentUser:{method:"GET",params:{f:["started_by="+b.bonitaUserId]},transformResponse:c.transformPaginateresponse()}})}]),angular.module("ngBonita").factory("BonitaSession",["$resource","$cookies",function(a,b){return a(b.bonitaUrl+"/API/system/session/unused",{},{getCurrent:{method:"GET"}})}]),angular.module("ngBonita").factory("HumanTask",["$resource","$cookies","bonitaUtils",function(a,b,c){return a(b.bonitaUrl+"/API/bpm/humanTask/:id",{id:"@id",p:0,c:10,o:"priority ASC"},{getFromCurrentUser:{method:"GET",params:{f:["state=ready","user_id="+b.bonitaUserId]},transformResponse:c.transformPaginateresponse()}})}]),angular.module("ngBonita").factory("ProcessDefinition",["$resource","$cookies","bonitaUtils",function(a,b,c){return a(b.bonitaUrl+"/API/bpm/process/:id",{id:"@id",p:0,c:10,o:"displayName ASC"},{getStartableByCurrentUser:{method:"GET",params:{f:["user_id="+b.bonitaUserId]},transformResponse:c.transformPaginateresponse()}})}]),angular.module("ngBonita").factory("ProcessInstance",["$resource","$cookies","bonitaUtils",function(a,b,c){return a(b.bonitaUrl+"/API/bpm/case/:id",{id:"@id",p:0,c:10},{getStartedByCurrentUser:{method:"GET",params:{f:["started_by="+b.bonitaUserId]},transformResponse:c.transformPaginateresponse()}})}]),angular.module("ngBonita").factory("User",["$resource","$cookies",function(a,b){return a(b.bonitaUrl+"/API/identity/user/:id",{id:"@id"})}]);