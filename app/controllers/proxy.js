
"use strict";

let proxy_p01 = require('../models/proxy_p01.js');
let success_p02 = require('../models/success_p02.js');


exports.router = function *(next) {	
    var action = this.request.query['action'];	
	switch(action){
		case "create_table":
			console.log("host:" + this.request.host);
			console.log("hostname:" + this.request.hostname);
			var ret = yield proxy_p01.fnCreateTable();
			this.body = ret;
			break;
		case "delete_proxy":
			//var proxys = yield success_p02.fnDelSuccess(6);
			var proxys = yield success_p02.fnDelSuccess(10000);
			this.body = JSON.stringify(proxys);
			break;
		case "get":{
			console.log("get");
			console.log(this.request.ips);
			var auto = this.request.query['auto'] || 1234567890;
			var count = this.request.query['count'] || 10;
			var proxy = yield success_p02.fnGetSuccess(auto, count);
			var ok = [];
			for(var i in proxy){
				ok.push(proxy[i].p02_ip);			
				ok.push(":");
				ok.push(proxy[i].p02_port);	
				ok.push("\n");
			}
			this.body = ok.join("");
			}break;
		default:
			var auto = this.request.query['auto'];
			var count = this.request.query['count'] || 600;
			var proxy = yield proxy_p01.fnGet(auto, count);
			this.body = JSON.stringify(proxy);
	}
}


exports.post = function *(next) {
	//console.log("this.body:" + this.body);
	//console.log("this.body:" + JSON.stringify(this.request.body));
	var doc = this.request.body['doc'];
    var action = this.request.body['action'];
    //console.log("数据:"+doc);
	var jsonProxy;
	try{
		jsonProxy = JSON.parse(doc);
	}catch(e){
		this.body = "json数据格式不对:" + e.toString() + "\r\n" + doc;
		console.log(this.body);
		return;
	}
	switch(action){
		case "import":
			var ret = yield proxy_p01.fnImportProxy(jsonProxy)
			this.body = ret;
			break;
		case "success":
			console.log("success:");
			jsonProxy.p02_ips = JSON.stringify(this.request.ips);
			if(this.request.ips.length === 0){
				jsonProxy.p02_type = "匿名";
			}else if(this.request.ip === jsonProxy.p02_ip){
				jsonProxy.p02_type = "高匿";
			}else{
				jsonProxy.p02_type = "透明";
			}
			var ret = yield success_p02.fnSuccessProxy(jsonProxy)
			this.body = ret;
			break;
		case "fail":
			console.log("fail:");
			//fnFailProxy(res, jsonProxy)
			this.body = "还未实现";
			break;
	}
}