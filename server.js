require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http").Server(app);
const nunjucks = require("nunjucks");

const Abstract = require("abstract-sdk");

// set the port of our application
// process.env.PORT lets the port be set by Heroku
let port = process.env.PORT || 3000;

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.static(__dirname + "/src/assets"));

// Create a client
const abstract = Abstract.Client();

const theProjects = [];

async function getAllProjects() {
  // Query all projects
  const projects = await abstract.projects.list().catch(error => {
    console.log(error);
  });

  return projects;
}

async function getComments(projectId) {
  const comments = await abstract.comments
    .list({
      projectId: projectId
    })
    .catch(error => {
      console.log(error);
    });

  return comments;
}

function filterByProjectId(projectId) {
  return function(project) {
    if (project.id === projectId) {
      return true;
    }
    return false;
  };
}

async function getProject(projectId) {
  // it is not possible to retrieve a single project yet. So we filter the one we want
  let projects = await abstract.projects.list().catch(error => {
    console.log(error);
  });

  projects = projects.filter(filterByProjectId(projectId));

  return projects;
}

app.get("/", function(req, res) {
  getAllProjects().then(projects => {
    res.render("index.html", {
      data: projects
    });
  });
});

app.get("/project/:projectId", function(req, res) {
  const projectId = req.params.projectId;

  let project = getProject(projectId);
  let comments = getComments(projectId);

  Promise.all([project, comments])
    .then(function(values) {
      const projectData = {
        info: values[0][0],
        comments: values[1]
      };

      console.log(projectData);

      res.render("project.html", {
        project: projectData
      });
    })
    .catch(error => {
      console.log(error);
    });
});

http.listen(port, function() {
  console.log("listening on *:" + port);
});
