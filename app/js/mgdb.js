

var mongoose = require('mongoose');    //引用mongoose模块
//var db = mongoose.createConnection('localhost','test'); //创建一个数据库连接
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/test');
// 链接错误
db.on('error', function(error) {
    console.log(error);
});
db.once('open',function(){
    console.log('打开数据库');
    //一次打开记录
});

var PersonSchema = new mongoose.Schema({
      name:String,
      val:String
    });
PersonSchema.methods.speak = function(){
    console.log('我的名字叫'+this.name);
}
PersonSchema.statics.findByName = function(name,cb){
    this.find({name:new RegExp(name,'i'),cb});
}
var PersonModel = db.model('Person', PersonSchema);
PersonModel.create({name:'something',size:'small'});
var personEntity = new PersonModel({name:'Krouky', val:'val'});
console.log(personEntity.name); 
personEntity.speak();//我的名字叫Krouky
 PersonModel.findByName('krouky',function(err,persons){
 });
 PersonSchema.virtual('name.full').get(function(){
    return this.name.first + ' ' + this.name.last;
});
PersonSchema.virtual('name.full').set(function(name){
    var split = name.split(' ');
    this.name.first = split[0];
    this.name.last = split[1];
});
personEntity.name.full = 'krouky han';//会被自动分解
console.log(personEntity.name.first);//krouky
exports.test = function(){
    console.log('test');
    personEntity.save();  
    PersonModel.find(function(err, persons){
        persons.forEach(function(item){
            console.log('mgdb.find:'+item.name , item.val);            
        });
    });
}
