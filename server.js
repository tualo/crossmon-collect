var io = require('socket.io-client');
var fs = require('fs');
var path = require('path');
var loggerLib = new require('./lib/logger');
var findconfig = new require('./lib/findconfig');
var logger = new loggerLib();
var config;
var socket;

function init(config,path){
	socket = io.connect(config.collectServer,{
		port: config.collectPort
	});
	
	socket.on('connect', function () {
		for(var i in config.collect){
			
			logger.log('info','initialize collector: '+config.collect[i].module);
			try{
				var module = require(config.collect[i].module);
				if (typeof module.mininterval=='undefined'){
					module.mininterval = 1000; 
				}
				var interval = setInterval(
					require(config.collect[i].module).monitor, 
					Math.min(config.collect[i].interval,module.mininterval), 
					socket,
					config.collect[i].options
				);
			}catch(e){
				logger.log('error',e);
			}
		}
	});
}

findconfig.findConfiguration(init);