"use strict";

// log4js.configure({
//   appenders: [
//     { type: 'console' },{
//       type: 'file', 
//       filename: 'logs/access.log', 
//       maxLogSize: 1024,
//       backups:4,
//       category: 'normal' 
//     }
//   ],
//   replaceConsole: true
// });

let fs = require('fs');
 
let _log4js = null;
let _cfg =
{
    "appenders":
        [
            {
                "category":"console",
                "type":"console"
            },
            {
                "category":"log_file",
                "type": "file",
                "filename": "./logs/log_file/file.log",
                "maxLogSize": 104800,
                "backups": 100
            },
            {
                "category":"log_date",
                "type": "dateFile",
                "filename": "./logs/log_date/date",
                "alwaysIncludePattern": true,
                "pattern": "-yyyy-MM-dd-hh.log"
            },
            {
                "category": "log_trace",
                "type": "dateFile",
                "filename": "./logs/log_trace/trace"
            },
            {
                "category": "log_error",
                "type": "dateFile",
                "filename": "./logs/log_error/error"
            },
            {
                "category": "log_todo",
                "type": "dateFile",
                "filename": "./logs/log_todo/todo"
            }
        ],
    "replaceConsole": true,
    "levels":
    {
        "console":"ALL",
        "log_file":"ALL",
        "log_date":"ALL",
        "log_trace":"ALL",
        "log_error":"ALL",
        "log_todo":"ALL"
    }
};
    
function createLogsFile(){
	let farr = [
		'logs',
		'logs/log_file',
		'logs/log_date',
		'logs/log_trace',
		'logs/log_error',
		'logs/log_todo',
		];
	farr.forEach(function(filename) {
		let b = fs.existsSync(filename);
		if(!b){
			if (!fs.mkdirSync(filename)) {
				return false;
			}
		}
	}, this);
}
exports.init = function(){
    createLogsFile();
    
    _log4js = require('log4js');
    _log4js.configure(_cfg);
    _cfg = null;
    var logg = _log4js.getLogger('console');
    logg.setLevel('DEBUG');
    return logg;
}
exports.logg = function(){
    return exports.console();
}
exports.console = function(){
    return _log4js.getLogger('console');
}
exports.file = function(){
    return _log4js.getLogger('log_file');
}
exports.date = function(){
    return _log4js.getLogger('log_date');
}
exports.trace = function(){
    return _log4js.getLogger('log_trace');
}
exports.error = function(){
    return _log4js.getLogger('log_error');
}
exports.todo = function(){
    return _log4js.getLogger('log_todo');
}
