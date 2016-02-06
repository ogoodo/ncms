"use strict";

const mongoose = require('mongoose');
var Article = mongoose.model('article');

class ArticleModel {
    constructor() {
    }
    static save(author, title, tags, excerpt, markdown, html){   
        let blog = new Article({
            author: author,
            title: title,
            tags: tags,
            excerpt: excerpt,
            markdown: markdown,
            html: html,
            reply:0,
            see:0,
        });
        let promise = new Promise((resolve, reject) => {
            try{
                blog.save().then((doc)=>resolve(doc));
            }catch(e){
                console.log("save错误:"+e.toString());
                debugger;
                reject(1);
            }
        });
        return promise;
    }
    static addOneSee(id){
        let promise = new Promise((resolve, reject) => {
            try{
                Article.addOneSee(id, (doc)=>resolve(doc));
            }catch(e){
                console.log("addOneSee 错误:" + e.toString());
                debugger;
                reject(1);
            }
        });
        return promise;
    }
    static update(id, author, title, tags, excerpt, markdown, html){   
        let blog = {
            _id: id,
            author: author,
            title: title,
            tags: tags,
            excerpt: excerpt,
            markdown: markdown,
            html: html,
            reply:0,
            see:0,
        };
        let promise = new Promise((resolve, reject) => {
            try{
                Article.update({_id: blog._id}, blog)
                .then((doc)=>resolve(doc));
            }catch(e){
                console.log("save错误:"+e.toString());
                debugger;
                reject(1);
            }
        });
        return promise;
    }
    static delete(id){
        const promise = new Promise((resolve, reject)=>{
            try{
                console.log('delete {{');
                Article.remove({_id: id}, function(err, doc){
                    console.log('delete }}');
                    resolve(doc);
                });
            }catch(e){
                console.error("错误:"+e.toString());
                debugger;
                reject(1);
            }
        });
        return promise;
    }
    static count(){
        const promise = new Promise((resolve, reject)=>{
            try{
                console.log('count {{');
                Article.count({}, function(err, count){
                    console.log('count }}');
                    resolve(count);
                });
            }catch(e){
                console.error("错误:"+e.toString());
                debugger;
                reject(1);
            }
        });
        return promise;
    }
    static findById(id){
        const promise = new Promise((resolve, reject)=>{
            try{
                console.log('find {{');
                Article.findById(id, function(err, doc){
                    console.log('find }}');
                    resolve(doc);
                });
            }catch(e){
                console.error("错误:"+e.toString());
                debugger;
                reject(1);
            }
        });
        return promise;
    }
    static findByTag(id){
        const promise = new Promise((resolve, reject)=>{
            try{
                console.log('findByTag {{');
                Article.find({})
                .where('tags').equals(id)
                .exec(function(err, docs){
                    console.log('findByTag }}');
                    resolve(docs);
                });
            }catch(e){
                console.error("错误:"+e.toString());
                debugger;
                reject(1);
            }
        });
        return promise;
    }
    static findPage(skip, limit){
        const promise = new Promise((resolve, reject)=>{
            try{
                console.log('findAll {{');
                Article.find({}).skip(skip).limit(limit).exec(function(err, docs){
                    console.log('findAll }}');
                    resolve(docs);
                });
            }catch(e){
                console.error("错误:"+e.toString());
                debugger;
                reject(1);
            }
        });
        return promise;
    }
    static findAll(){
        const promise = new Promise((resolve, reject)=>{
            console.log('findAll {{');
            Article.find({}, function(err, docs){
                console.log('findAll }}');
                resolve(docs);
            })
            .catch(function(e){
                console.error("错误:"+e.toString());
                debugger;
                reject(1);
            });
        });
        return promise;
    }
}
module.exports = ArticleModel;
