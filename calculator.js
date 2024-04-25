const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 300,
    height: 500,
    icon: 'icon.png',
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // Загрузка preload скрипта
    }
  });

  win.setMenuBarVisibility(false);
  win.setTitle('Калькулятор');
  win.loadFile('calculator.html');

  win.webContents.on('did-finish-load', () => {
    win.show(); // Показываем окно только после полной загрузки
    win.webContents.send('updateMessage', 'Checking for updates'); // Отправляем сообщение о проверке обновлений
  });

  // Обработка событий обновления
  autoUpdater.autoDownload = false;

  autoUpdater.on('update-available', (info) => {
    win.webContents.send('updateMessage', `Update available. Current version ${app.getVersion()}`);
    autoUpdater.downloadUpdate();
  });

  autoUpdater.on('update-not-available', (info) => {
    win.webContents.send('updateMessage', `No update available. Current version ${app.getVersion()}`);
  });

  autoUpdater.on('update-downloaded', (info) => {
    win.webContents.send('updateMessage', `Update downloaded. Current version ${app.getVersion()}`);
  });

  autoUpdater.on('error', (info) => {
    win.webContents.send('updateMessage', info.toString());
  });

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', ()=>{
  createWindow();
  autoUpdater.checkForUpdates();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
