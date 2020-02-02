const { app, Menu, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

function devOptions() {
  if (isDev) {
    return { webSecurity: false };
  }
  return {};
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    titleBarStyle: "hiddenInset",
    webPreferences: devOptions()
  });

  mainWindow.webContents.on("new-window", function(e, url) {
    e.preventDefault();
    require("electron").shell.openExternal(url);
  });

  if (isDev) {
    console.log("Running in development");
    mainWindow.webContents.openDevTools();
  } else {
    console.log("Running in production");
  }

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));

  // Create the Application's main menu
  var template = [
    {
      label: "Abstract To-Dos",
      submenu: [
        {
          label: "About Abstract To-Dos",
          selector: "orderFrontStandardAboutPanel:"
        },
        { type: "separator" },
        {
          label: "Quit",
          accelerator: "Command+Q",
          click: function() {
            app.quit();
          }
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:"
        },
        {
          label: "Dev tools",
          accelerator: "CmdOrCtrl+J",
          click() {
            mainWindow.webContents.openDevTools();
          }
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
