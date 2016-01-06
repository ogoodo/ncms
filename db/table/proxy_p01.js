"use strict";

let Sequelize = require('sequelize');

module.exports = function( ){
	return {
		p01_auto: {type: "int",autoIncrement: true, primaryKey: true},
		p01_ip: {type: Sequelize.INTEGER, defaultValue:0, unique:'ip_port_index'},
		p01_port: {type: Sequelize.INTEGER, defaultValue:0, unique:'ip_port_index'},
		p01_check: Sequelize.INTEGER	    
	}
};


