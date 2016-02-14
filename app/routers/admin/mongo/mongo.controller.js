'use strict';

const config = require(process.cwd() + '/config/config.js');
const MongoModel = require('../mongo/mongo.model.js');
const mongoose = require('mongoose');
const dbInit = require(process.cwd() + '/app/schema/DbInit.js');
//const Article = mongoose.model('article');

class MongoController{
    static async index(ctx, next){
        await ctx.render('admin/mongo', {});
    }
    static async clear(ctx, next){
        await MongoModel.clearDocs();
        ctx.body = 'mongodb clear ok';
        dbInit.refresh();
    }
    static async coll(ctx, next){
        await MongoModel.dropCollections();
        ctx.body = 'mongodb clear ok';
        dbInit.refresh();
    }
    static async drop(ctx, next){
        await MongoModel.dropDatabase();
        ctx.body = 'mongodb clear ok';
        dbInit.refresh();
    }
}
module.exports = MongoController;
