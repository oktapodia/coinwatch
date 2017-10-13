import { Menu, BrowserWindow } from 'electron';
import { isDarwin, isWindows } from '../helpers/env';
import packageJson from '../../package.json';

class TrayMenu {
  tray = null;

  constructor(tray) {
    this.tray = tray;
  }

  getMenu() {
    return Menu.buildFromTemplate([
      {
        label: 'Toggle window',
        click: () => {
          this.tray.toggleWindow();
        },
      },
      {
        label: 'About',
        click() {
          if (!isWindows) {
            let aboutWindow = new BrowserWindow({ width: 200, height: 200, show: false, autoHideMenuBar: true, resizable: true });
            aboutWindow.on("closed", () => {
              aboutWindow = null;
            });

            // Load a remote URL
            aboutWindow.loadURL(`file://${__dirname}/../about/about.html`);

            aboutWindow.once('ready-to-show', () => {
              aboutWindow.webContents.send('get-version', packageJson.version);
              aboutWindow.show();
              aboutWindow.openDevTools();
            });
          }
        }
      },
      {
        type: 'separator',
      },
      {
        label: 'Quit',
        accelerator: isDarwin ? 'Command+Q' : 'Alt+F4',
        role: 'quit',
      },
    ]);
  }
}

export default TrayMenu;
