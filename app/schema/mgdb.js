var mongoose = require('mongoose');
var config = require('../../config/config.js');

module.exports = function () {
    var db = mongoose.connect(config.mongodb);//连接数据库
    
    return db;//返回数据库实例
};

require('../schema/blog.js');