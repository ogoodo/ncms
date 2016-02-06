"use strict";

const mongoose = require('mongoose');
const moment = require('moment');
const autoIncrement = require('mongoose-auto-increment');
const className = 'article';

const ArticleSchema = new mongoose.Schema({
    author: String,
    title:  String,
    excerpt:String,
    markdown:   String,
    html:   String,
    tags:[],
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now, index: true },
    reply:{type:Number, default:0},
    see:{type:Number, default:0},
    }
    //,{collection: "article"}
 );
 ArticleSchema.plugin(autoIncrement.plugin,{
    model: className,
    //field: 'blogId',
    startAt: 100,
    incrementBy: 1
});
//ArticleSchema.ensureIndexes(reply);
 
ArticleSchema.methods.speak = function(){
    console.log('我的名字叫'+this.title);
}

ArticleSchema.statics.findByName = function(name, cb){
    this.find({name:new RegExp(name,'i'), cb});
}
ArticleSchema.statics.addOneSee = function(id, cb){
    this.update({_id: id}, {'$inc':{see:1}})
    .then((doc)=>cb(doc));
}
 
 ArticleSchema.virtual('day')
 .get(function(){
    if(this.date == undefined || this.date == undefined){
        return false;
    }
    return moment(this.date).format('YYYY-MM-DD');
}).set(function(val) {
    this.set('date', val);
});
const Article = mongoose.model(className, ArticleSchema);
