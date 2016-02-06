"use strict";

const mongoose = require('mongoose');
const moment = require('moment');
const autoIncrement = require('mongoose-auto-increment');
const className = 'url';

const UrlSchema = new mongoose.Schema({
    cid: {type: Number, default: 0},
    title:  {type:String},
    url: {type:String},
    excerpt:{type:String},
    date: { type: Date, default: Date.now, index: true },
    }
    //,{collection: className}
 );
 UrlSchema.plugin(autoIncrement.plugin,{
    model: className,
    startAt: 100,
    incrementBy: 1
});
//UrlSchema.ensureIndexes(reply);
 
 
 UrlSchema.virtual('day')
 .get(function(){
    if(this.date == undefined || this.date == undefined){
        return false;
    }
    return moment(this.date).format('YYYY-MM-DD');
}).set(function(val) {
    this.set('date', val);
});
const Url = mongoose.model(className, UrlSchema);
