'use strict';

const DbManage = require('../../schema/DbManage.js');
const BlogModel = require('./Blog.model.js');
var mongoose = require('mongoose');
const Blog = mongoose.model('blog');

class BlogController{
    static async insert(ctx, next){
        ctx.body += 'ctx.params.id';
        await new BlogModel().save();
        await next();        
    }
    static async select(ctx, next){
        await next();
        const docs = await BlogModel.findAll();
        await ctx.render('index', {items:docs});
    }
    static async drop(ctx, next){
        console.log('删除数据库{{');
        DbManage.dropDatabase();
        ctx.body += '数据库删除';
        console.log('删除数据库}}');
        await next();
    }
    static async clear(ctx, next){
        console.log('clearDocs {{');
        await DbManage.clearDocs();
        ctx.body += 'clearDocs';
        console.log('clearDocs }}');
        await next();
    }
    static async coll(ctx, next){
        console.log('coll {{');
        await DbManage.dropCollections();
        ctx.body += 'coll';
        console.log('coll }}');
        await next();
    }
}
module.exports = BlogController;


