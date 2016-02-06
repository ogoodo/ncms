"use strict";

const mongoose = require('mongoose');
var Url = mongoose.model('url');

class UrlModel {
    constructor() {
    }
    static save(title, url, excerpt){   
        let blog = new Url({
            url: url,
            title: title,
            excerpt: excerpt,
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
    static update(id, title, url, excerpt){   
        let blog = {
            _id: id,
            url: url,
            title: title,
            excerpt: excerpt,
        };
        let promise = new Promise((resolve, reject) => {
            try{
                Url.update({_id: id}, blog)
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
                Url.remove({_id: id}, function(err, doc){
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
    static find(id){
        const promise = new Promise((resolve, reject)=>{
            try{
                console.log('find {{');
                Url.findById(id, function(err, doc){
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
    static findAll(){
        const promise = new Promise((resolve, reject)=>{
            try{
                console.log('findAll {{');
                Url.find({}, function(err, docs){
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
}
module.exports = UrlModel;
