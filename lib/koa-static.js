
'use strict';

/**
 * Module dependencies.
 */

const resolve = require('path').resolve;
const assert = require('assert');
const debug = require('debug')('koa-static');
const send = require('koa-send');

/**
 * Expose `serve()`.
 */

module.exports = serve;

/**
 * Serve static files from `root`.
 *
 * @param {String} root
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

function serve(root, opts) {
    console.log('static-server{{');
  opts = opts || {};

  assert(root, 'root directory is required to serve files');

  // options
  debug('static "%s" %j', root, opts);
  opts.root = resolve(root);
  if (opts.index !== false) opts.index = opts.index || 'index.html';

  if (!opts.defer) {
    return function serve(ctx, next){
    console.log('static-server{{ a');
      if (ctx.method == 'HEAD' || ctx.method == 'GET') {
    console.log('static-server{{ a1');
        //debugger;
        return send(ctx, ctx.path, opts).then(function(res){
    console.log('static-server{{ a2');
          return res ? null : next(ctx);
        });
      }
      return next(ctx);
    };
  }

  return function serve(ctx, next){
    console.log('static-server{{ b');
    return next(ctx).then(function(){
    console.log('static-server{{ c');
      if (ctx.method != 'HEAD' && ctx.method != 'GET') return;
      // response is already handled
      if (ctx.body != null || ctx.status != 404) return;
      return send(ctx, ctx.path, opts);
    });
  }
}
