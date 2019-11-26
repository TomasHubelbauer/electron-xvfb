const { app, BrowserWindow } = require('electron');
const fs = require('fs');

app.on('ready', () => {
  const window = new BrowserWindow({ width: 800, height: 600 });
  window.webContents.loadURL('https://google.com/ncr');
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  window.webContents.addListener(
    'dom-ready',
    () => setTimeout(
      () => window.capturePage(
        image => {
          fs.writeFileSync(`screenshot-${timestamp}.png`, image.toPNG());
          app.exit();
        }
      ),
      1000
    )
  );
});
