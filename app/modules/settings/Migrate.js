import { readdirSync } from 'fs';
import path from 'path';
import settings from 'electron-settings';
import { forEach } from 'lodash';

class Migrate {
  basePath = path.resolve(__dirname, 'migrations');
  constructor() {
    const migrationFiles = this.constructor.getMigrations(this.basePath);

    this.settingsUpdated = settings.getAll();

    return new Promise((resolve) => {
      forEach(migrationFiles, ::this.migrate);
      settings.setAll(this.settingsUpdated);

      resolve();
    });
  }

  migrate(migrationFile) {
    const ClassName = require(path.resolve(this.basePath, migrationFile)); // eslint-disable-line global-require,import/no-dynamic-require
    const migration = new ClassName(this.settingsUpdated);
    if (!migration.isVersion()) {
      console.log(`settings are not version ${migrationFile}`);
      return;
    }
    console.log(`settings are version ${migrationFile}, upgrade...`);

    this.settingsUpdated = migration.up();
  }

  static getMigrations(basePath) {
    return readdirSync(basePath);
  }
}

export default Migrate;
