var io = require('socket.io-client');
var config;
var socket;

function init(){
	socket = io.connect(config.collectServer,{
		port: config.collectPort
	});
	
	socket.on('connect', function () {
		for(var i in config.collect){
			
			logger.log('info','initialize collector: '+config.collect[i].module);
			try{
				var interval = setInterval(
					require(config.collect[i].module).monitor, 
					config.collect[i].interval, 
					socket,
					config.collect[i].options
				);
			}catch(e){
				console.log(e);
			}
		}
	});
}
function findConfiguration(){
	fs.exists(path.join('etc','crossmon','collect_config.json'),function(exists){
		if (exists){
			try{
				config = require(path.join('etc','crossmon','collect_config.json'));
				init();
			}catch(e){
				logger.log('error','The configuration is invalid.');
			}
		}else{
			fs.exists(path.join(__dirname,'collect_config.json'),function(exists){
				if (exists){
					try{
						config = require(path.join(__dirname,'collect_config.json'));
						init();
					}catch(e){
						logger.log('error','The configuration is invalid.');
					}
				}else{
					fs.exists(path.join(__dirname,'collect_config.sample.json'),function(exists){
						if (exists){
							try{
								config = require(path.join(__dirname,'collect_config.sample.json'));
								logger.log('info','The sample configuration file will be loaded.');
								init();
							}catch(e){
								logger.log('error','The configuration is invalid.');
							}
						}else{
							logger.log('error','There is no configuration file.');
							process.exit();
						}
					});
				}
			});
		}
	});
}

findConfiguration();