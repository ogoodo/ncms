//var mongoose = require('./mgdb.js');
var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    view:Number
    }
    //,{collection: "blog"}
 );
 
var Blog = mongoose.model('blog', blogSchema);
    