require("dotenv").config();
const Abstract = require("abstract-sdk");
const abstract = Abstract.Client();

const getAllProjects = async function() {
  // Query all projects
  const projects = await abstract.projects.list().catch(error => {
    console.log(error);
  });

  return projects;
};

const getComments = async function(projectId) {
  const comments = await abstract.comments
    .list({
      projectId: projectId
    })
    .catch(error => {
      console.log(error);
    });

  return comments;
};

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

exports.getAllProjects = getAllProjects;
exports.getComments = getComments;

// const projectId = req.params.projectId;

// let project = getProject(projectId);
// let comments = getComments(projectId);

// Promise.all([project, comments])
//   .then(function(values) {
//     const projectData = {
//       info: values[0][0],
//       comments: values[1]
//     };

//     console.log(projectData);

//     res.render("project.html", {
//       project: projectData
//     });
//   })
//   .catch(error => {
//     console.log(error);
//   });
