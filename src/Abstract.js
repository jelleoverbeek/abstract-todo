import { getApiToken } from "./ApiToken";
const Abstract = window.require("abstract-sdk");

const abstract = new Abstract.Client({
  accessToken: getApiToken()
});

export async function isConnected() {
  try {
    return await abstract.organizations.list();
  } catch (e) {
    console.log(e.info);
    return "API Error";
  }
}

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

export async function getComments(projectId, branchId) {
  const comments = await abstract.comments.list({
    branchId: branchId,
    projectId: projectId
  });

  return comments;
}

export async function getComment(commentId) {
  const comment = abstract.comments.info({
    commentId: commentId
  });

  return comment;
}

export async function getBranches(projectId) {
  const branches = abstract.branches.list(
    {
      projectId: projectId
    },
    {
      filter: "active"
    }
  );

  return branches;
}

export async function getBranch(projectId, branchId) {
  // Somehow I need to pass the branchId to the projectId and the other way around
  const branch = abstract.branches.info({
    projectId: projectId,
    branchId: branchId
  });

  return branch;
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
