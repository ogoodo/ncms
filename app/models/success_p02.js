
"use strict";

let db = require('../../db/db.js');
const success_p02 = 'success_p02';
/**
 保留最新的10000个代理
*/
function fnGetDelDot(saveCount ){
	return new Promise(function(resolve, reject) {	  
		var Proxy = db(success_p02);	  
		Proxy.findOne({offset: saveCount, limit: 1, order:"p02_auto DESC"})
		//Proxy.findOne({offset: 6, limit: 1, order:"p02_auto DESC"})
		.then(function(proxy) {
			resolve(proxy);
		}).catch(function(e){
			reject(e);
		});
	})
}
function fnSelDel(p02_auto){
	return new Promise(function(resolve, reject) {	  
		var Proxy = db(success_p02);	  
		Proxy.findAll({where:{p02_auto:{$lt:p02_auto}}, limit: 500})
		.then(function(proxy) {
			resolve(proxy);
		}).catch(function(e){
			reject(e);
		});
	})
}
function fnDelRow(p02_auto){
	return new Promise(function(resolve, reject) {	  
		var Proxy = db(success_p02);	  		
		Proxy.destroy({where:{p02_auto:{$lt:p02_auto}}})
		.then(function(proxy) {
			resolve(proxy);
		}).catch(function(e){
			reject(e);
		});
	})
}
exports.fnDelSuccess = function *(saveCount){
	var proxy = yield fnGetDelDot(saveCount);
	var ps = [];
	if(proxy){
		ps = yield fnSelDel(proxy.p02_auto);
		var ret = yield fnDelRow(proxy.p02_auto);
	}
	return ps;
}

exports.fnGetSuccess = function *(auto, count){	 
	return new Promise(function(resolve, reject) {	
		var Proxy = db(success_p02);	  	
		Proxy.findAll({where:{p02_auto:{$lt:auto}}, limit: count, order:"p02_auto DESC", fields:["p02_auto","p02_ip"]})
		.then(function(proxy) {
			resolve(proxy);
		}).catch(function(e){
			reject(e);
		});
	});
}


exports.fnSuccessProxy = function *( jsonProxy){
	return new Promise(function(resolve, reject) {
		var Proxy = db(success_p02);
		//Proxy.bulkCreate(jsonProxy, { validate: false })
		Proxy.create(jsonProxy, { validate: false })
		.then(function(proxy) {
			resolve(true);
		})
		.catch(function(e) {
			reject(e);
		})
		;
	});
}
