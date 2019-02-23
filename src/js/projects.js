const { getAllProjects, getComments } = require("./abstract");

const createCommentList = function(element, projectId) {
  getComments(projectId).then(comments => {
    const list = document.createElement("ul");

    console.log(comments);

    comments.forEach(comment => {
      list.insertAdjacentHTML("beforeend", `<li>${comment.body}</li>`);
    });

    element.insertAdjacentElement("afterend", list);
  });
};

const createProjectElement = function(project) {
  const title = document.createElement("h1");

  title.insertAdjacentHTML("beforeend", project.name);

  title.addEventListener("click", event => {
    createCommentList(title, project.id);
  });

  return title;
};

exports.createProjectElement = createProjectElement;
