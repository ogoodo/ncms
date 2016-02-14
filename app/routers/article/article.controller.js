'use strict';

const config = require(process.cwd() + '/config/config.js');
const ArticleModel = require('../article/article.model.js');
const TagModel = require('../tag/tag.model.js');
var mongoose = require('mongoose');
const Article = mongoose.model('article');

//参考github分页
function makePage(index, count){
    function doo(min, max, json, current){
        for(var i = min; i <= max; i++){
            //json[i] = (current===i);
            json[i] = {label:i, active:(current===i)};
        }
    }
    function dooff(json, i){
        json[i] = {label:i, active:false, ellipsis:true};
    }
    const showPageCount = 10;
    const half = ~~((showPageCount+1)/2);
    const leftRightCanHave = 6;
    const leftRightMaxShow = 8;
    var json = {};
    json.prev = index>1?index-1:0; 
    json.next = count>index?index+1:0; 
    if(count <= showPageCount){
        //全部显示
        doo(1, count, json, index);
    }else if(index<=leftRightCanHave){
        //左6, 右2
        console.log('左6, 右2');
        doo(1, leftRightMaxShow, json, index);
        dooff(json, count-2);
        doo(count-1, count, json, index);
    }else if((count-index+1)<=leftRightCanHave){
        //左2, 右6
        console.log('左2, 右6');
        doo(1, 2, json, index);
        dooff(json, 3);
        doo(count-leftRightMaxShow+1, count, json, index);
    }else{
        //左2, 右2, 中4
        console.log('左2, 右2, 中4');
        doo(1, 2, json, index);
        dooff(json, 3);
        doo(index-2, index+2, json, index);
        dooff(json, count-3);
        doo(count-1, count, json, index);
    }
        //debugger;
    return json;
}
class BlogController{
    static async index_page(ctx, next){
        const pageIndex = (+ctx.params.index || 1);
        const countIndex = (pageIndex-1) * config.page_count;
        const docs = await ArticleModel.findPage(countIndex, config.page_count);
        console.log('count {{');
        const count = await ArticleModel.count();
        console.log('count }}');
        const pageCount = ~~(count/config.page_count +0.999);
        const obj ={
            items: docs, 
            channel: 'blog',
            pages: makePage(pageIndex, pageCount),
        }
        await ctx.render('article/index', obj);
    }
    static async tag(ctx, next){
        const docs = await ArticleModel.findByTag(ctx.params.id);     
        const obj ={
            items: docs, 
            channel: 'blog',
        }   
        await ctx.render('article/index', obj);
    }
    static async add(ctx, next){
        console.log('add {{');
        var blogs = new Article();
        await ctx.render('article/add', blogs);
        console.log('add }}');
    }
    static async edit(ctx, next){
        let doc = await ArticleModel.findById(ctx.params.id);
        //doc = doc || {};
        //debugger;
        await ctx.render('article/add', doc.toObject());
    }
    static async delete(ctx, next){
        const doc = await ArticleModel.delete(ctx.params.id);
        if(doc.result.ok === 1){
            ctx.body = {err:0, id:ctx.params.id, msg:'delete ok'};         
        }else{
            debugger;
            ctx.body = {err:1, id:ctx.params.id, msg:'delete fail'};           
        }
    }    
    static async show(ctx, next){
        const doc = await ArticleModel.findById(ctx.params.id);
        const ret = await ArticleModel.addOneSee(ctx.params.id);
        //debugger;
        //doc = doc || {};
        await ctx.render('article/show', doc.toObject());
    }
    static async save(ctx, next){
        console.log('controller.save {{');
        let b = ctx.request.body;
        b.tags = b.tags.split(',');
        let doc;
        if(b.id){
            console.log('controller.save update');
            doc = await ArticleModel.update(b.id, 'autxdhor', b.title, b.tags, b.excerpt, b.markdown, b.html);
        }else{
            console.log('controller.save new');            
            doc = await ArticleModel.save('autxdhor', b.title, b.tags, b.excerpt, b.markdown, b.html);
            b.id = doc._id;
        }
        console.log('controller.save 1');
        b.tags.forEach(async (item, index)=>{
            await TagModel.upsert(item);
        });
        console.log('controller.save }}');
        ctx.redirect('/article/' + b.id); 
    }
}
module.exports = BlogController;

        