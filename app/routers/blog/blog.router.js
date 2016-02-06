'use strict';

//const Router = require('koa-66');
const Router = require('koa-router');
const controller = require('./blog.controller.js');

const router = new Router({
	prefix: '/api'
})


router.get('/test/insert', controller.insert);
router.get('/test/select', controller.select);
router.get('/admin/drop', controller.drop);
router.get('/admin/clear', controller.clear);
router.get('/admin/coll', controller.coll);
module.exports = router;


// router.get('/', index);
// router.get('/index', index);
// router.get('/article/:id', article_show);
// router.get('/article/add', article_add);
// router.get('/article/edit/:id', article_edit);
// router.get('/article/delete/:id', article_delete);    
// router.post('/article/add', article_save);
// router.post('/article/edit', article_update);
// router.put('/article/edit/:id', article_put);
// router.delete('/article/:id', article_delete);   
    
    
/*
router.get('/:id', async (ctx, next) => {
    ctx.body += ctx.params.id;
    await next();
});

router.get('/test/insert', async (ctx, next) => {
    ctx.body += 'ctx.params.id';
    await new BlogModel().save();
    await next();
});
router.get('/test/select', async (ctx, next) => {
    await next();
    const docs = await BlogModel.findAll();
    await ctx.render('index', {items:docs});
    //ctx.body = ''.concat(ctx.body, '<br/><br/>\r\n', docs);
});
router.get('/admin/drop', async (ctx, next) => {
    console.log('删除数据库{{');
    DbManage.dropDatabase();
    ctx.body += '数据库删除';
    console.log('删除数据库}}');
    await next();
});
router.get('/admin/clear', async (ctx, next) => {
    console.log('clearDocs {{');
    await DbManage.clearDocs();
    ctx.body += 'clearDocs';
    console.log('clearDocs }}');
    await next();
});
router.get('/admin/coll', async (ctx, next) => {
    console.log('coll {{');
    await DbManage.dropCollections();
    ctx.body += 'coll';
    console.log('coll }}');
    await next();
});
//*/


// function insertDb(){
//     let blog = new Blog({
//         uid: 123,
//         author: 'author',
//         title: 'title',
//         tags: 'tags',
//         excerpt: '.excerpt',
//         body:  '.body',
//         reply:0,
//         see:0,
//     });
//     let promise = new Promise((resolve, reject) => {
//         try{
//             console.log('save {{');
//             let pms =  blog.save();
//             pms.then(function(doc) {
//                 console.log('save ok');
//                 //done();
//                 //debugger;
//                 resolve(); 
//             });
//             console.log('save }}');
//         }catch(e){
//             console.log("错误:"+e.toString());
//             debugger;
//             reject(1);
//         }
//     });
//     return promise;
// }


// function selectDb(){
//     let promise = new Promise((resolve, reject)=>{
//         try{
//             console.log('select {{');
//             //var blogs =  
//             var tt = Blog.find({}, function(err, docs){
//                 console.log('select }}');
//                 resolve(docs);                
//             });//.exec();
//             console.log('select tt=' + tt);
//                 //debugger;
//             // resolve();
//             // debugger;
//         }catch(e){
//             console.log("错误:"+e.toString());
//             debugger;
//             reject(1);
//         }
//     });
//     return promise;
// }


