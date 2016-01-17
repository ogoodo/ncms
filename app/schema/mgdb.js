var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    config = require('../../config/config.js');
var init = false;

module.exports = function () {
    var conn = mongoose.connect(config.mongodb);//连接数据库
    autoIncrement.initialize(conn);
    
    if(!init){
        init = true;
        require('../schema/blog.js');
    }

    return conn;//返回数据库实例
};
