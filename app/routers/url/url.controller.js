'use strict';

const UrlModel = require('./url.model.js');
var mongoose = require('mongoose');
const Url = mongoose.model('url');

class UrlController{
    static async index(ctx, next){
        const docs = await UrlModel.findAll();
        await ctx.render('url/index', {items:docs, channel:'url'});
    }
    static async add(ctx, next){
        console.log('add {{');
        var blogs = new Url();
        await ctx.render('url/add', blogs);
        console.log('add }}');
    }
    static async edit(ctx, next){
        const doc = await UrlModel.find(ctx.params.id);
        await ctx.render('url/add', doc._doc);
    }
    static async delete(ctx, next){
        const doc = await UrlModel.delete(ctx.params.id);
        if(doc.result.ok === 1){
            ctx.body = {err:0, id:ctx.params.id, msg:'delete ok'};         
        }else{
            debugger;
            ctx.body = {err:1, id:ctx.params.id, msg:'delete fail'};           
        }
        //await ctx.render('url/add', doc._doc);
    }    
    static async show(ctx, next){
        const doc = await UrlModel.find(ctx.params.id);
        await ctx.render('url/show', doc._doc);
    }
    static async save(ctx, next){
        console.log('save {{');
        var b = ctx.request.body;
        let doc;
        if(b.id){
            doc = await UrlModel.update(b.id, b.title, b.url, b.excerpt);
        }else{
            doc = await UrlModel.save(b.title, b.url, b.excerpt);
        }
        console.log('save }}' + doc);
        ctx.redirect('/url'); 
        //ctx.redirect('/url/' + b.id); 
    }
}
module.exports = UrlController;


        