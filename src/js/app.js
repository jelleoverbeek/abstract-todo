console.log("app.js loaded");

const { getAllProjects, getComments } = require("./abstract");

getAllProjects().then(projects => {
  console.log(projects);

  projects.forEach(project => {
    const comments = getComments(project.id);

    console.log(comments);
  });
});
