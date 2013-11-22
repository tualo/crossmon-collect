var io = require('socket.io-client');
var fs = require('fs');
var path = require('path');
var loggerLib = new require('./lib/logger');
var findconfig = new require('./lib/findconfig');
var logger = new loggerLib();
var config;
var socket;
var initial_connection = true;

function init(config,path){
	
	socket = io.connect(config.collectServer,{
		port: config.collectPort
	});
	//io.set('log level', config.loglevel*1);
	
	
	socket.on('error', function(err){
		if (err.indexOf('ECONNREFUSED')){
			logger.log('error','The crossmon-server is not available');
			//setTimeout(init,6000,config,path);
		}else{
			logger.log('error',err);
			//console.log(err);
		}
	});
	
	
	socket.on('disconnect', function(){
		logger.log('error','lost connection');
	});
	
	socket.on('connect', function () {
		logger.log('info','connection established');
		if (initial_connection){
			logger.log('info','starting modules');
			for(var i in config.collect){
				if (typeof config.collect[i].enabled=='undefined'){
					config.collect[i].enabled=true; // default: any module is enabled
				}
				if (config.collect[i].enabled===true){
					logger.log('info','initialize collector: '+config.collect[i].module);
					try{
						var module = require(config.collect[i].module);
						if (typeof module.mininterval=='undefined'){
							module.mininterval = 1000; 
						}
						
						// initial monitoring
						if (Math.max(config.collect[i].interval,module.mininterval)>10000){
							require(config.collect[i].module).monitor(socket,config.collect[i].options);
						}
						
						var interval = setInterval(
							require(config.collect[i].module).monitor, 
							Math.max(config.collect[i].interval,module.mininterval), 
							socket,
							config.collect[i].options
						);
						
					}catch(e){
						logger.log('error',e);
					}
				}
			}
			initial_connection=false;
		}
	});
}

findconfig.findConfiguration(init);