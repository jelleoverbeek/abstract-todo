const express = require('express');
const app = express();
const http = require('http').Server(app);
const nunjucks = require('nunjucks');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
let port = process.env.PORT || 3000;

nunjucks.configure('src/views', {
    autoescape: true,
    express: app,
    watch: true
});

app.use(express.static(__dirname + '/src/assets'));

app.get('/', function (req, res) {
    res.render('index.html');
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});