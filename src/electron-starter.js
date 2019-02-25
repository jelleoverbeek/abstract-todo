require("dotenv").config();
const electron = require("electron");
// const { getAllProjects, getComments, getBranches, getOrganizations, getUsers } = require("./abstract");
const path = require("path");
const url = require("url");

// var db = require("diskdb");
// db = db.connect("./src/db", ["projects", "comments", "branches", "users"]);

// getOrganizations()
//   .then(organizations => {
//     organizations.forEach(organization => {
//       getUsers(organization.id)
//         .then(users => {
//           console.log(users);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     });
//   })
//   .catch(error => {
//     console.log(error);
//   });

// getAllProjects()
//   .then(projects => {
//     const options = {
//       multi: false, // update multiple - default false
//       upsert: true // if object is not found, add it (update-insert) - default false
//     };

//     projects.forEach(project => {
//       db.projects.save(project);

// getComments(project.id)
//   .then(comments => {
//     db.comments.save(comments);
//   })
//   .catch(error => {
//     console.log(error);
//   });

//     getBranches(project.id)
//       .then(branches => {
//         db.branches.save(branches);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   });
// })
// .catch(error => {
//   console.log(error);
// });

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true
    });

  mainWindow.loadURL(startUrl);
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
