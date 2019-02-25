require("dotenv").config();
const Abstract = require("abstract-sdk");
const abstract = new Abstract.Client();

const getAllProjects = async function() {
  // Query all projects
  const projects = await abstract.projects.list({}, { limit: 10 }).catch(error => {
    console.log(error);
  });

  return projects;
};

const getOrganizations = async function() {
  // Query all projects
  const organizations = await abstract.organizations.list().catch(error => {
    console.log(error);
  });

  return organizations;
};

const getComments = async function(projectId) {
  const comments = await abstract.comments.list({
    projectId: projectId
  });

  return comments;
};

const getBranches = async function(projectId) {
  const branches = await abstract.branches.list(
    {
      projectId: projectId
    },
    {
      filter: "active"
    }
  );

  return branches;
};

const getUsers = async function(organizationId) {
  const comments = await abstract.comments.list({
    organizationId: organizationId
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
exports.getBranches = getBranches;
exports.getOrganizations = getOrganizations;
exports.getUsers = getUsers;

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
