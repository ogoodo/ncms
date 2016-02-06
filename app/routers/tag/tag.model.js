"use strict";

const mongoose = require('mongoose');
var Tag = mongoose.model('tag');

class TagModel {
    constructor() {
    }
    static upsert(tagName){
        const tag = {
            name: tagName,
        };
        const promise = new Promise((resolve, reject) => {
            Tag.update(tag, {'$inc':{count:1}}, {new:true, upsert:true})
            .then((doc)=>resolve(doc))                
            .catch(function(e){
                console.error("错误:"+e.toString());
                debugger;
                reject(1);
            });
        });
        return promise;
    }
    static findAll(){
        const promise = new Promise((resolve, reject)=>{
            console.log('findAll {{');
            Tag.find({}, function(err, docs){
                console.log('findAll }}');
                resolve(docs);
            });
        });
        return promise;
    }
}
module.exports = TagModel;
