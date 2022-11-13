import { Menu } from 'electron';
import { isDarwin } from './helpers/env';
// eslint-disable-next-line import/no-cycle
import Tray from './Tray';

class TrayMenu {
  tray: Tray;

  constructor(tray: Tray) {
    this.tray = tray;
  }

  getMenu = () => {
    return Menu.buildFromTemplate([
      {
        label: 'Toggle window',
        click: () => {
          if (this.tray.mainWindow.isVisible()) {
            this.tray.mainWindow.hide();
          } else {
            this.tray.mainWindow.show();
          }
        },
      },
      /*      {
        label: 'About CoinWatch',
        click() {
          if (!isWindows) {
            const aboutWindow = new BrowserWindow({
              width: 200,
              height: 200,
              show: false,
              autoHideMenuBar: true,
              resizable: true,
              webPreferences: {
                nodeIntegration: true,
              },
            });
            aboutWindow.on('closed', () => {
              alert('fix me about');
              // aboutWindow = null;
            });

            // Load a remote URL
            const basePath = path.join(
              __dirname,
              process.env.NODE_ENV === 'development' ? '/..' : ''
            );
            aboutWindow.loadURL(`file://${basePath}/windows/about/about.html`);

            aboutWindow.once('ready-to-show', () => {
              aboutWindow.webContents.send('get-version', packageJson.version);
              aboutWindow.show();
              if (
                process.env.NODE_ENV === 'development' ||
                process.env.DEBUG_PROD === 'true'
              ) {
                // aboutWindow.openDevTools();
              }
            });
          }
        },
      }, */
      {
        type: 'separator',
      },
      {
        label: 'Quit',
        accelerator: isDarwin ? 'Command+Q' : 'Alt+F4',
        role: 'quit',
      },
    ]);
  };
}

export default TrayMenu;
