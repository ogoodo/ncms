//var mongoose = require('./mgdb.js');
var mongoose = require('mongoose');
var moment = require('moment');

var blogSchema = new mongoose.Schema({
    author: String,
    title:  String,
    excerpt:String,
    body:   String,
    tags:[],
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now, index: true },
    reply:Number,
    see:Number,
    }
    //,{collection: "blog"}
 );
 //blogSchema.ensureIndexes(reply);
 
blogSchema.methods.speak = function(){
    console.log('我的名字叫'+this.title);
}
blogSchema.statics.findByName = function(name, cb){
    this.find({name:new RegExp(name,'i'), cb});
}
 blogSchema.virtual('day').get(function(){
  console.log('date = ' + this.date)
  if(this.date == undefined || this.date == undefined){
    return false;
  }
  return moment(this.date).format('YYYY-MM-DD');
});
var Blog = mongoose.model('blog', blogSchema);
    