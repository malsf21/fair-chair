import { app, BrowserWindow, Menu } from 'electron';
//import { enableLiveReload } from 'electron-compile';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null;

const isDevMode = process.execPath.match(/[\\/]electron/);

//if (isDevMode) enableLiveReload();

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: `file://${__dirname}/assets/img/fair-chair.ico`
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools, or set in full screen in prod.
  if (isDevMode) {
    mainWindow.webContents.openDevTools();
  }
  else{
    mainWindow.setFullScreen(true);
  }
  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// This is the menu generation code
let template: any;
template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Import Savefile',
        click () {
          mainWindow.webContents.send('to-settings');
          mainWindow.webContents.send('import-savefile');
        }
      },
      {
        label: 'Export Savefile',
        click () {
          mainWindow.webContents.send('to-settings');
          mainWindow.webContents.send('export-savefile');
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    label: 'Go',
    submenu: [
      {
        label: 'Home',
        click () {
          mainWindow.webContents.send('to-home');
        }
      },
      {
        label: 'Lists',
        click () {
          mainWindow.webContents.send('to-lists');
        }
      },
      {
        label: 'Guide',
        click () {
          mainWindow.webContents.send('to-guide');
        }
      },
      {
        label: 'Settings',
        click () {
          mainWindow.webContents.send('to-settings');
        }
      },
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electronjs.org') }
      },
      {
        label: 'GitHub Repository',
        click () { require('electron').shell.openExternal('https://github.com/malsf21/fair-chair/') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  // "App" Menu

  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Edit menu
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}
