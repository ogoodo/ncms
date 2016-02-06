





    // console.log('调用conn {{');
    // await connDb();
    // console.log('调用conn }}');
    // console.log('调用insert {{');
    // await insertDb();
    // console.log('调用insert }}');
    // console.log('调用 select {{');
    // await selectDb();
    // console.log('调用 select }}');




/*
function logger(format) {
  format = format || ':method ":url"';

  return async function (ctx, next){
    console.log('进入 logger');
    const str = format
      .replace(':method', ctx.method)
      .replace(':url', ctx.url);
    //console.log('logger:::'+str);
    await next();
  }
}

app.use(logger());
//app.use(logger(':method :url'));

async function responseTime(ctx, next) {
    console.log('进入 responseTime');
  const start = new Date;
  await next();
  const ms = new Date - start;
  ctx.set('X-Response-Time', `${ms}ms`);
}

app.use(responseTime);
//Common function
app.use((ctx, next) => {
    console.log('进入 Common');
  const start = new Date;
  return next().then(() => {
    console.log('进入 Common then');
    const ms = new Date - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
});
//http://www.cnblogs.com/YikaJ/p/4996174.html
//async functions (Babel required)
app.use(async (ctx, next) => {
    console.log('进入 async');
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use((ctx, next) => {new Promise(async (resolve, reject) => {
    console.log('进入 Promise');
    var err = 0;
    if(err){
        return reject(err);
    }else{
      await next();
      ctx.body += "entry.object";
      return resolve();
    }
  })
})
//*/
/*
//GeneratorFunction
app.use(co.wrap(function *(ctx, next){
  const start = new Date;
  yield next();
  const ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}));
//Old signature middleware (v1.x)
const convert = require('koa-convert')

app.use(convert(function *(next){
  const start = new Date;
  yield next;
  const ms = new Date - start;
  console.log(`${this.method} ${this.url} - ${ms}ms`);
}));
//*/




//topic
// var init = false;
// var blogSchema = new mongoose.Schema({
//     author: String,
//     title:  String,
//     excerpt:String,
//     body:   String,
//     tags:[],
//     comments: [{ body: String, date: Date }],
//     date: { type: Date, default: Date.now, index: true },
//     reply:Number,
//     see:Number,
//     }
//     //,{collection: "blog"}
//  );
// var Blog = mongoose.model('blog', blogSchema);
//     var blog = new Blog({
//         uid: 123,
//         author: 'author',
//         title: 'title',
//         tags: 'tags',
//         excerpt: '.excerpt',
//         body:  '.body',
//         reply:0,
//         see:0,
//     });
// function insertDbB(conn){
//     var de = Q.defer();
//     try{
//         console.log('save {{');
//         var promise =  blog.save();
//         promise.then(function(doc) {
//             console.log('save ok');
//             //done();
//             resolve(); 
//         });
//         console.log('save }}');
//         //debugger;
//         // if(ret){
//         //     this.redirect('/article/' + blog._id); 
//         // }
//     }catch(e){
//         console.log("错误:"+e.toString());
//         debugger;
//         de.reject(1);
//     }
//     //conn.close();
//     return de;
// }
// function insertDb(conn){
//     let promise = new Promise((resolve, reject) => {
//         try{
//             console.log('save {{');
//             var pms =  blog.save();
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

            // console.log('save {{');
            // var blogs = Blog.find({}).exec();
            // console.log('save }}');
            // return blogs;
// function selectDb(){
//     let promise = new Promise((resolve, reject)=>{
//         try{
//             console.log('select {{');
//             //var blogs =  
//             var tt = Blog.find({}, function(err, docs){
//                 console.log('select }}');
//                 //debugger;
//                 resolve();                
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
//  function connDb(){
//      if(!init){
//          init = true;
//         console.log('db open {{');
//         let conn = mongoose.connect('mongodb://127.0.0.1:27017/test');//连接数据库
//         autoIncrement.initialize(conn);
//         console.log('db open }}');
//     }
//     return; 
//     let promise = new Promise((resolve, reject) => {
//         var conn = mongoose.createConnection('mongodb://127.0.0.1:27017/test');//连接数据库
//         autoIncrement.initialize(conn);
//         console.log('db open {{');
//         conn.once('open', function () {
//             console.log('db open');
//             resolve();
//         });
//         conn.on('error', function(){
//             console.log('db error');
//             reject(1);
//         });
//         console.log('db open }}');
//     });
//     return promise;
//  }



// const adRouters = require('./routers/adRouter');
// const index = require('./routes/index');
// const users = require('./routes/users');
// const router = new Router();
// router.get('/:id', async (ctx, next) => {
//     //debugger;
//     ctx.body += ctx.params.id;
//     await next();
// });

// Router.use('/', index.routes(), index.allowedMethods());
//  Router.use('/users', users.routes(), users.allowedMethods());

//  app.use(convert(Router.routes()), convert(Router.allowedMethods()));

// let adRouter = new Router();
// app.use(convert(adRouter.routes()))
//    .use(convert(adRouter.allowedMethods()));
// adRouters(adRouter);

// render(app, {
//   root: path.join(__dirname, './views'),
//   //layout: 'template',
//   layout: false,
//   viewExt: 'html',
//   cache: false,
//   debug: true,
// });

// app.context.render = co.wrap(render({
//   root: path.join(__dirname, './views'),
//   layout: false,
//   cache: false, // disable, set to false 
//   viewExt: 'html',
//   debug: true,
// }));

// app.use(co.wrap(
//     function *(){
//         console.log('co.wrap');
//         debugger;
//     }
// ));



//     return;
//     var de = Q.defer();
//     //var conn = mongoose.connect('mongodb://127.0.0.1:27017/test');//连接数据库
//     var conn = mongoose.createConnection('mongodb://127.0.0.1:27017/test');//连接数据库
//     autoIncrement.initialize(conn);
//     console.log('db open {{');    
//     conn.once('open', function () {
//         console.log('db open');
//         de.resolve();
//     });
//     console.log('db open }}');    
//     if(!init){
//         init = true;
//         //require('../schema/blog.js');
//     }
//     return de.promise;
//   }





