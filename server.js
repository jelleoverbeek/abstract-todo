require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').Server(app);
const nunjucks = require('nunjucks');

const Abstract = require('abstract-sdk');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
let port = process.env.PORT || 3000;

nunjucks.configure('src/views', {
    autoescape: true,
    express: app,
    watch: true
});

app.use(express.static(__dirname + '/src/assets'));

// Create a client
const abstract = Abstract.Client();

const theProjects = [];

async function run() {
    // Query all projects
    const projects = await abstract.projects.list();

    // Iterate through each project
    for (const project of projects) {

        let projectObj = {
            info: project,
            comments: []
        }

        const comments = await abstract.comments.list({
            projectId: project.id
        });

        for (const comment of comments) {
            console.log(comment)
            projectObj.comments.push(comment)
        }

        theProjects.push(projectObj)
    }
    //     console.log(comment);
    // }

}

run();

app.get('/', function (req, res) {
    res.render('index.html', {
        data: theProjects
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});