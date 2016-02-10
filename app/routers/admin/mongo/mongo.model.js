"use strict";

var mongoose = require('mongoose');
var _ = require('lodash');
var async    = require('async');

//参考: http://ulaijn.com/2014/08/28/mongoose-remove-function/
// var dbUri = "mongodb://localhost/test";
// mongoose.connect(dbUri, function() {
//     var db = mongoose.connection.db;
//     db.dropDatabase(function(err) {
//         if (err) return cb(err);
// 	    mongoose.disconnect();
//     });
// });

class MongoModel {
    constructor() {
    }
    static async dropDatabase(){
        const db = mongoose.connection.db;
        const err2 = db.dropDatabase();        
    }
    
    static async dropCollections(){    
        const promise = new Promise((resolve, reject)=>{
            const db = mongoose.connection.db;
            db.collections(function (err, collections) {
                let cn = [];
                collections.forEach(function(item, index){
                    cn.push(item.collectionName);
                });
                async.forEach(
                    cn,
                    function(collectionName, done) {
                        db.dropCollection(collectionName, function(err) {
                            if (err && err.message != 'ns not found') return done(err);
                            done(null);
                        })
                    },
                    function(err) {
                        reject(err);
                        //mongoose.connection.close(function() {});
                });
                resolve()
            });
        });
        return promise;
    }
    static async clearDocs(){
        const promise = new Promise((resolve, reject)=>{
            const db = mongoose.connection.db;
                db.collections(function(err, collections) {
                    const coll = _.filter(collections, function(collection) {
                        return collection.collectionName.split('.')[0] !== 'system';
                    });
                    async.forEach(
                        coll,
                        function(collection, done) {
                            collection.remove({}, function(err) {
                                if (err) return done(err);
                                done(null);
                            });
                        },
                        function(err) {
                            reject(err);
                            //mongoose.connection.close(function() {});
                    });
                   resolve()
                });
        });
        return promise;
    }
}
module.exports = MongoModel;

// exports.dropDatabase = function(){
//     //return;
//     var db = mongoose.connection.db;
//     var err2 = db.dropDatabase();
//     var x=3;
//     // db.dropDatabase(function(err) {
//     //     console.log(err);
//     // });
// }

// exports.dropCollections = function(){    
//       var db = mongoose.connection.db;
//     var colls = db.collections();//
//     db.collections(function (err, collections) {
//         var collectionsName = [];
//         collections.forEach(function(item, index){
//             collectionsName.push(item.collectionName);
//         });
//         // var collectionsName =
//         //         _(collections)
//         //             .pluck('collectionName')
//         //             .filter(function(collectionName) {
//         //                 return collectionName.split('.')[0] !== 'system';
//         //             })
//         //             .value();

//         async.forEach(
//             collectionsName,

//             function(collectionName, done) {

//                 db.dropCollection(collectionName, function(err) {
//                     if (err && err.message != 'ns not found') return done(err);
//                     done(null);
//                 })
//             },

//             function(err) {
//                 mongoose.connection.close(function() {});
//             });
//     });
// }
// exports.clearDocs = function(){
//        var db = mongoose.connection.db;

//     db.collections(function(err, collections) {

//         var collectionsWithoutSystem = _.filter(collections, function(collection) {
//             return collection.collectionName.split('.')[0] !== 'system';
//         });
//         async.forEach(
//             collectionsWithoutSystem,
//             function(collection, done) {

//                 collection.remove({}, function(err) {
//                     if (err) return done(err);
//                     done(null);
//                 });
//             },
//             function(err) {
//                 mongoose.connection.close(function() {});
//             });
//     });
// }
