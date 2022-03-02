import electron, { Menu } from 'electron';
import debug from 'electron-debug';
import unhandled from 'electron-unhandled';
import Store from 'electron-store';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { createWindow, addWindow, OrdersWindow } from './helpers';
import { MIN_STRENGTH, MAX_STRENGTH } from '../renderer/const';

const { app, ipcMain } = electron;

unhandled();
debug({
  isEnabled: true,
});

app.setAppUserModelId('com.gomscope.app');

let mainWindow;
let sideWindows = [];

async function createMainWindow(windowName, path, options) {
  mainWindow = await createWindow(windowName, path, options);
  // if (process.env.NODE_ENV === 'production') {
  //   mainWindow.webContents.on('devtools-opened', () => {
  //     mainWindow.webContents.closeDevTools();
  //   });
  // }
}

async function createOrdersWindow(windowName, options) {
  sideWindows.push(await OrdersWindow(windowName, options));
  // if (process.env.NODE_ENV === 'production') {
  //   mainWindow.webContents.on('devtools-opened', () => {
  //     mainWindow.webContents.closeDevTools();
  //   });
  // }
}

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (!mainWindow) {
    createMainWindow('main', './index.html', {
      width: 1000,
      height: 600,
      enableRemoteModule: true,
      onClosed: () => {
        mainWindow = undefined;
      },
    });
  }
});

function hideHelpMenu() {
  const menu = Menu.getApplicationMenu(); // get default menu
  menu.items
    .filter((item) =>
      ['filemenu', 'editmenu', 'viewmenu', 'windowmenu', 'help'].includes(
        item.role
      )
    )
    .forEach((item) => (item.visible = true)); // modify it
  Menu.setApplicationMenu(menu); // set the modified menu
}

app.on('ready', () => {
  hideHelpMenu();

  setTimeout(() => {
    autoUpdater.checkForUpdatesAndNotify().catch((_error) => {});
  }, 3000);
});

ipcMain.on('create-orders-window', (event, { windowName, path, options }) => {
  console.log('dfdfd');
  createOrdersWindow('Orders', options);
});

const migrationsPerConfig = {
  'graph-settings': {
    '>=0.4.3': (store) => {
      const main = store.get('main');
      if (!main) {
        return;
      }
      main.strength = Math.max(
        MIN_STRENGTH,
        Math.min(MAX_STRENGTH, main.strength)
      );
      delete main.circleNodes;
      delete main.showAdjacentTitles;
      delete main.textNodes;
      store.set('main', main);
    },
  },
  'scoped-graph-settings': {
    '>=0.4.3': (store) => {
      const main = store.get('main');
      if (!main) {
        return;
      }
      main.strength = Math.max(
        MIN_STRENGTH,
        Math.min(MAX_STRENGTH, main.strength)
      );
      delete main.circleNodes;
      delete main.showAdjacentTitles;
      delete main.textNodes;
      store.set('main', main);
    },
  },
};

ipcMain.on('get-config', (event, { name, key }) => {
  const store = new Store({ name, migrations: migrationsPerConfig[name] });
  event.returnValue = store.get(key);
});

ipcMain.on('set-config', (event, { name, key, value }) => {
  const store = new Store({ name });
  store.set(key, value);
  event.returnValue = '';
});

(async () => {
  await app.whenReady();

  await createMainWindow('main', './index.html', {
    width: 1000,
    height: 600,
    enableRemoteModule: true,
    onClosed: () => {
      mainWindow = undefined;
    },
  });
})();
