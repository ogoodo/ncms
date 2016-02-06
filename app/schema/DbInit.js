"use strict";
const logg = require("../../config/log4js.js").logg();
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const config = require('../../config/config.js');
const path = require('path');
const fs = require('fs');
let _init = false;

class DbInit{
    constructor(){
        
    }
    static init(){
        if(!_init){
            console.log('mongodb初始化 {{');
            var conn = mongoose.connect(config.mongodb);
            autoIncrement.initialize(conn);
            _init = true;
            DbInit.initShema();
            console.log('mongodb初始化 }}');
        }        
    }
    static initShema(){
        logg.info('初始化shema {{');
        const schemaPath = path.join(__dirname, 'item');
        logg.info(schemaPath);
        fs.readdirSync(schemaPath).forEach(function (file) {
            if (/(.*)\.(schema.js$|coffee$)/.test(file)) {
                logg.info('shema项:', schemaPath + '/' + file);
                require(schemaPath + '/' + file);
            }
        });
        logg.info('初始化shema }}');
    }
}
module.exports = DbInit;

