"use strict";

let Sequelize = require('sequelize');

module.exports = function( ){
	return {
		p02_auto: {type: "int",autoIncrement: true, primaryKey: true},
		p02_ip: {type: Sequelize.STRING, defaultValue:""},
		p02_port: {type: Sequelize.INTEGER, defaultValue:0},
		p02_country: Sequelize.STRING,
		p02_privince: Sequelize.STRING,
		p02_city: Sequelize.STRING,
		p02_isp: Sequelize.STRING,
		p02_type: Sequelize.STRING,
		p02_ips: Sequelize.STRING,
		p02_createAt: {type: Sequelize.DATE, defaultValue:Sequelize.fn('localtime')}
	}
};


