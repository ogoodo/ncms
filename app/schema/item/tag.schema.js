"use strict";

const mongoose = require('mongoose');
const moment = require('moment');
const autoIncrement = require('mongoose-auto-increment');
const className = 'tag';

const TagSchema = new mongoose.Schema({
    name:  {type:String, unique: true, trim:true},
    count: {type:Number, default:0},
    created_at: { type: Date, default: Date.now, index: true },
    updated_at: { type: Date, default: Date.now, index: true },
    }
    ,{collection: className}
 );
 TagSchema.plugin(autoIncrement.plugin,{
    model: className,
    startAt: 100,
    incrementBy: 1
});
//UrlSchema.ensureIndexes(reply);
 
 
const Url = mongoose.model(className, TagSchema);
