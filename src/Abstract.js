import { getApiToken } from "./ApiToken";
const Abstract = window.require("abstract-sdk");

const abstract = new Abstract.Client({
  accessToken: getApiToken()
});

export function handleError(error) {
  const errorObj = {
    name: error.name,
    message: error.name
  };

  if (error.name === "UnauthorizedError") {
    errorObj.message = "Unauthorized, check if you added the API Token correctly.";
  } else if (error.name === "RateLimitError") {
    errorObj.message = "Too many requests, please wait 2 minutes and try again.";
  }

  console.error(errorObj.message);
  return errorObj;
}

export async function isConnected() {
  try {
    const response = await abstract.organizations.list();
    return response;
  } catch (error) {
    return handleError(error);
  }
}

export async function getAllProjects() {
  // Query all projects
  const projects = await abstract.projects.list().catch(error => {
    return handleError(error);
  });

  return projects;
}

export async function getOrganizations() {
  // Query all projects
  const organizations = await abstract.organizations.list().catch(error => {
    return handleError(error);
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
  const comment = abstract.comments
    .info({
      commentId: commentId
    })
    .catch(error => {
      return handleError(error);
    });

  return comment;
}

export async function getBranches(projectId) {
  const branches = abstract.branches
    .list(
      {
        projectId: projectId
      },
      {
        filter: "active"
      }
    )
    .catch(error => {
      return handleError(error);
    });

  return branches;
}

export async function getBranch(projectId, branchId) {
  // Somehow I need to pass the branchId to the projectId and the other way around
  const branch = abstract.branches
    .info({
      projectId: projectId,
      branchId: branchId
    })
    .catch(error => {
      return handleError(error);
    });

  return branch;
}

export async function getUsers(organizationId) {
  const comments = await abstract.comments
    .list({
      organizationId: organizationId
    })
    .catch(error => {
      return handleError(error);
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
    return handleError(error);
  });

  projects = projects.filter(filterByProjectId(projectId));

  return projects;
}

export async function getUser(userId) {
  const user = abstract.users
    .info({
      userId: userId
    })
    .catch(error => {
      return handleError(error);
    });

  return user;
}
