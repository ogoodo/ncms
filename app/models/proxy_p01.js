
"use strict";

let db = require('../../db/db.js');
//let db = require('db/db.js');
//let db = require('/db/db.js');
//let db = require('/db/db');
//let db = require('koa_proxy/db/db.js');
//let db = require('/koa_proxy/db/db.js');
//let db = require(__dirname + '/db/db.js');

exports.fnGet = function (auto, count){
	return new Promise(function(resolve, reject) {	  
		var Proxy = db('proxy_p01');
		Proxy.findAll({where:{p01_auto:{$lt:auto}}, limit: count, order:"p01_auto DESC"})
		.then(function(proxy) {
			resolve(proxy);
		}).catch(function(e){
			reject(e);
		});
	  
	});
}

function fnInsert(Proxy, jsonProxy, index, resolve, reject){
	if(index >= jsonProxy.length){
		resolve(true);
		return;
	}
	Proxy.upsert(jsonProxy[index++], { validate: false })
	.then(function(){
		 fnInsert( Proxy, jsonProxy, index, resolve, reject);
	})
	.catch(function(e) {
		console.log("fnInsert异常:"+e.toString());
		reject(e);
		//res.send("异常:"+e.toString());
	})
	;	
}
exports.fnImportProxy = function(jsonProxy){
	return new Promise(function(resolve, reject) {	
		console.log("fnImportProxy{{");
		var Proxy = db('proxy_p01');
		var index = 0;
		fnInsert(Proxy, jsonProxy, index, resolve, reject);
	});
}

exports.fnCreateTable = function *(){
	return new Promise(function(resolve, reject) {	
		var Tb = db('proxy_p01');
		Tb.sync()
		.then(function(){
			Tb = db('success_p02');
			Tb.sync()
			.then(function(){
				resolve(true);
			});
		});
	});
}