const Abstract = require("abstract-sdk");
const abstract = new Abstract.Client({
  accessToken: "86a4aaf72e47121cfb784d9f84645b718284a501565ca58d63efacf9b1179ddb"
});

export async function getAllProjects() {
  // Query all projects
  const projects = await abstract.projects.list().catch(error => {
    console.log(error);
  });

  return projects;
}

export async function getOrganizations() {
  // Query all projects
  const organizations = await abstract.organizations.list().catch(error => {
    console.log(error);
  });

  return organizations;
}

export async function getComments(projectId) {
  const comments = await abstract.comments.list({
    projectId: projectId
  });

  return comments;
}

export async function getBranches(projectId) {
  const branches = await abstract.branches.list({
    projectId: projectId
  });

  return branches;
}

export async function getUsers(organizationId) {
  const comments = await abstract.comments.list({
    organizationId: organizationId
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

export async function getProject(projectId) {
  // it is not possible to retrieve a single project yet. So we filter the one we want
  let projects = await abstract.projects.list().catch(error => {
    console.log(error);
  });

  projects = projects.filter(filterByProjectId(projectId));

  return projects;
}

export async function getUser(userId) {
  const user = abstract.users.info({
    userId: userId
  });

  return user;
}

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
