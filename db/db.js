"use strict";

let Sequelize = require('sequelize');


module.exports = function(tableName){
	let tableConfig = require("./table/"+tableName + ".js")();
	if(1===11){
		switch(tableName){
			case "proxy_p01":
				tableName = "proxy_p01_test";
				break;
			case "success_proxy_p02":
				tableName = "success_proxy_p02_test";
				break;
		}
	}
	//console.log("tc: "+ tableConfig);
	let sequelize = new Sequelize('jz_proxy', 'root', 'jizhisoft@*', 
		{host : '127.0.0.1', port : '3306', dialect : 'mysql', pool: {max: 1000, min: 0,idle: 10000},
		timezone:'+08:00'}
	);
	let Proxy = sequelize.define(tableName, tableConfig,
		{timestamps: false,freezeTableName: true}
	);
	return Proxy;
};