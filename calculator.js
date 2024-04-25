const {app, BrowserWindow} = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 500,
    icon: path.join(__dirname, 'icon.png'),
    resizable: false
  });
  win.setMenuBarVisibility(false);
  win.setTitle('Калькулятор');
  win.loadFile('calculator.html');
}

app.whenReady().then(() =>{
  createWindow()
  
  autoUpdater.checkForUpdates();
});
app.on('window-all-closed', () => app.quit());

//Код с функционалом автообновленеия
const {autoUpdater, AppUpdater} = require('electron-updater');
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

//Упаковка с использование Builder
//npm i electron-builder --save-dev
//npm i electron-updater
//добавляем build в package.json
//
//Настройка репозитория в гитхаб (Гайд индуса как по мне плох)

//Git init
//git add .