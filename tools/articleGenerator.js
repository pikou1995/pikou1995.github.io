/****
Author: pikou1995
Date: 2016/7/19
Version: 1.0
Github: github.com/pikou1995
****************************
usage: node articleGenerator.js

This program is help to generate article data(json type) in ${pikou.github.io}/data/
****/


var folders =  __filename.split('/');
folders.pop();
folders.pop();//base dir
const DIST_PATH = folders.join('/') + '/data/';
const DIST_FIlENAME = 'titles.json';

var events = require('events');
var emitter = new events.EventEmitter();
var fs = require('fs');
var titles = [{
	"title" : "How to use",
	"date" : "2016/7/19",
	"content" : "node"
}];

fs.open( DIST_PATH + DIST_FIlENAME, 'r', function(error, fd){
	if(error){
		//console.error(error);
		console.error('opps! No data found!');
		emitter.emit('read_from_console');
		return;
	};
	var data = new Buffer(1024*1024);
	console.log('read');
	fs.read(fd, data, 0, data.length, 0, function(error, bytesRead, data){
		if(error){
			console.error(error);
			console.error('read failed!');
			return;
		}
		console.log('bytesRead:' + bytesRead);
		if(bytesRead > 0){
			titles = JSON.parse(data.slice(0, bytesRead).toString());
			console.log('load data success!');
		}
 		fs.close(fd, function(error){
			if(error){
				console.error(error);
				return;
			}
			emitter.emit('read_from_console');
		});
	});
});


var readline = require('readline');
var rl = readline.createInterface({
	input : process.stdin,
	output : process.stdout
});
emitter.on('read_from_console',function(){
	rl.question('title:', function(title){
		if(title){
			titles[titles.length] = {};	
			titles[titles.length - 1]['title'] = title;	
			console.log(titles);
			console.log('please input content,enter "EOF" to finish')
			return;
		};
		console.log('title is required');
	});
	var content = ''
	rl.on('line', function(line){
		if(line == 'EOF'){
			titles[titles.length - 1]['content'] = content;
			rl.close();
		};
		content += line;
		//console.log(content);
	});
	rl.on('close', function(){
		console.log('done');
		emitter.emit('dump_to_file');
	});
});
emitter.on('dump_to_file', function(){
	fs.open( DIST_PATH + DIST_FIlENAME, 'w', function(error, fd){
		if(error){
			console.error(error);
			console.error('sorry, save failed! The json data are as follows, you can manually copy and overwrite data/titles.json')
			console.log('----------------Json data-------------------');
			console.log(titles);
			console.log('----------------Json data end---------------');
			return;
		};
		fs.writeSync(fd, JSON.stringify(titles));
		console.log('data has saved!');
		fs.close(fd, function(error){
			if(error){
				console.error(error);
			}
		});
	});
});

