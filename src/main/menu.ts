import { app, Menu, BrowserWindow } from 'electron';

export default class MenuBuilder {
  mainWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template = this.buildDarwinTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDarwinTemplate() {
    const subMenuAbout = {
      label: 'CoinWatch',
      submenu: [
        { label: 'About CoinWatch', selector: 'orderFrontStandardAboutPanel:' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    };

    const subMenuViewDev = {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          },
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          },
        },
      ],
    };

    const finalMenu = [subMenuAbout];

    // if (process.env.NODE_ENV === 'development') {
    finalMenu.push(subMenuViewDev);
    // }

    return finalMenu;
  }

  // buildDefaultTemplate() {
  //   const templateDefault = [{
  //     label: '&File',
  //     submenu: [{
  //       label: '&Open',
  //       accelerator: 'Ctrl+O',
  //     }, {
  //       label: '&Close',
  //       accelerator: 'Ctrl+W',
  //       click: () => {
  //         this.mainWindow.close();
  //       },
  //     }],
  //   }, {
  //     label: '&View',
  //     submenu: (process.env.NODE_ENV === 'development') ? [{
  //       label: '&Reload',
  //       accelerator: 'Ctrl+R',
  //       click: () => {
  //         this.mainWindow.webContents.reload();
  //       },
  //     }, {
  //       label: 'Toggle &Full Screen',
  //       accelerator: 'F11',
  //       click: () => {
  //         this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
  //       },
  //     }, {
  //       label: 'Toggle &Developer Tools',
  //       accelerator: 'Alt+Ctrl+I',
  //       click: () => {
  //         this.mainWindow.toggleDevTools();
  //       },
  //     }] : [{
  //       label: 'Toggle &Full Screen',
  //       accelerator: 'F11',
  //       click: () => {
  //         this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
  //       },
  //     }],
  //   }, {
  //     label: 'Help',
  //     submenu: [{
  //       label: 'Learn More',
  //       click() {
  //         shell.openExternal('http://electron.atom.io');
  //       },
  //     }, {
  //       label: 'Documentation',
  //       click() {
  //         shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
  //       },
  //     }, {
  //       label: 'Community Discussions',
  //       click() {
  //         shell.openExternal('https://discuss.atom.io/c/electron');
  //       },
  //     }, {
  //       label: 'Search Issues',
  //       click() {
  //         shell.openExternal('https://github.com/atom/electron/issues');
  //       },
  //     }],
  //   }];
  //
  //   return templateDefault;
  // }
}
