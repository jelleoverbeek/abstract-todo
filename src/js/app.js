console.log("app.js loaded");

const { getAllProjects, getComments } = require("./abstract");
const { createProjectElement } = require("./projects");

const main = document.querySelector("main");

function init() {
  getAllProjects().then(projects => {
    console.log(projects);

    projects.forEach(project => {
      const projectElement = createProjectElement(project);
      main.insertAdjacentElement("beforeend", projectElement);
    });
  });
}

init();
