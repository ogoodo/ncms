"use strict";

const mongoose = require('mongoose');
var Blog = mongoose.model('blog');

class BlogModel {
    constructor(_id, topicId, answeror, toUser, content, isAt) {
        this.blog = new Blog({
            uid: 123,
            author: 'author',
            title: 'title',
            tags: 'tags',
            excerpt: '.excerpt',
            body:  '.body',
            reply:0,
            see:0,
        });
    }
    save(){        
        let promise = new Promise((resolve, reject) => {
            try{
                console.log('save {{');
                let pms =  this.blog.save();
                pms.then(function(doc) {
                    console.log('save }}');
                    resolve(); 
                });
            }catch(e){
                console.log("save错误:"+e.toString());
                debugger;
                reject(1);
            }
        });
        return promise;
    }
    static findAll(){
        const promise = new Promise((resolve, reject)=>{
            try{
                console.log('select {{');
                const pms = Blog.find({}, function(err, docs){
                    console.log('select }}');
                    resolve(docs);
                });
            }catch(e){
                console.log("错误:"+e.toString());
                debugger;
                reject(1);
            }
        });
        return promise;
    }
}
module.exports = BlogModel;
