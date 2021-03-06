/****
Author: pikou1995
Date: 2016/7/19
Version: 1.0
Github: github.com/pikou1995
****************************
usage: node articleGenerator.js

This program is help to generate article data(json type) in ${pikou.github.io}/data/
****/

var path = require("path")
var events = require('events')
var emitter = new events.EventEmitter()
var fs = require('fs')

var BASE_DIR = path.join(__dirname, '..')
var DIST_PATH = path.join(BASE_DIR, 'data')
var DIST_FIlENAME = 'titles.json'
var HTML_PATH = path.join(BASE_DIR, 'details')
var TEMPLATE = path.join(HTML_PATH, 'template.html')

var date = new Date().toLocaleDateString()
var titles = [{
    "title": "How to use",
    "date": "2016/7/19",
    "src": 0
}]
var details = [{
    "No": 0,
    "title": "How to use",
    "date": "2016/7/19",
    "content": "<p>node tools/articleGenerator.js to create data</p>"
}]

fs.open(path.join(DIST_PATH, DIST_FIlENAME), 'r', function (error, fd) {
    if (error) {
        //console.error(error);
        console.error('opps! No data found!');
        emitter.emit('dump_to_file', path.join(DIST_PATH, details[0].No + '.json'), JSON.stringify(details));
        emitter.emit('read_from_console');
        return
    }
    var data = new Buffer(1024 * 1024);
    console.log('read')
    fs.read(fd, data, 0, data.length, 0, function (error, bytesRead, data) {
        if (error) {
            console.error(error);
            console.error('read failed!');
            return
        }
        console.log('bytesRead:' + bytesRead);
        if (bytesRead > 0) {
            titles = JSON.parse(data.slice(0, bytesRead).toString());
            console.log('load data success!');
        }
        fs.close(fd, function (error) {
            if (error) {
                console.error(error);
                return;
            }
            emitter.emit('read_from_console');
        })
    })
})


var readline = require('readline')
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
emitter.on('read_from_console', function () {
    rl.question('title:', function (title) {
        if (title) {
            titles.push({
                date,
                title: html_escape_string(title),
                src: titles.length
            })
            //console.log(titles)
            console.log('please input content,enter "EOF" to finish')
            return
        }
        console.log('title is required')
    })
    var content = ''
    rl.on('line', function (line) {
        if (line == 'EOF') {
            details[0].No = titles.length - 1
            details[0].title = titles[titles.length - 1].title
            details[0].date = date
            details[0].content = '<p>' + html_escape_string(content) + '</p>'
            rl.close()
        }
        if (content)
            content += '\n' + line
        else
            content += line
        //console.log(content)
    })
    rl.on('close', function () {
        console.log('done')
        emitter.emit('dump_to_file', path.join(DIST_PATH, DIST_FIlENAME), JSON.stringify(titles, null, 2))
        emitter.emit('dump_to_file', path.join(DIST_PATH, details[0].No + '.json'), JSON.stringify(details, null, 2))
        //TODO generate template html
    })
})
emitter.on('dump_to_file', function (dir, data) {
    fs.open(dir, 'w', function (error, fd) {
        if (error) {
            console.error(error)
            console.error('sorry, save failed! The data is as follows, you can manually copy and overwrite data/titles.json')
            console.log('----------------Data-------------------')
            console.log(data)
            console.log('----------------Data end---------------')
            return
        }
        fs.writeSync(fd, data)
        //console.log('data has saved!')
        fs.close(fd, function (error) {
            if (error) {
                console.error(error)
            }
        })
    })
})

function html_escape_string(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '</p><p>')
}
