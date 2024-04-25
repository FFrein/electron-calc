const { ipcRenderer } = require('electron');

// Добавляем IPC событие в контекст рендерерного процесса
window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('updateMessage', (event, message) => {
    console.log('Message received in renderer process:', message);
    let elem = document.getElementById('message');
    elem.innerHTML = message;
  });
});
