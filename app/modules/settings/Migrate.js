import settings from 'electron-settings';
import { forEach } from 'lodash';

class Migrate {
  constructor() {
    const migrationFiles = this.constructor.getMigrations();

    this.settingsUpdated = settings.getAll();

    return new Promise((resolve) => {
      forEach(migrationFiles, ::this.migrate);
      console.log('Settings are up to date');
      settings.setAll(this.settingsUpdated);

      resolve();
    });
  }

  migrate(migrationFile) {
    const ClassName = migrationFile; // eslint-disable-line global-require,import/no-dynamic-require
    const migration = new ClassName(this.settingsUpdated);
    console.log(migration.isVersion());
    if (!migration.isVersion()) {
      console.log(`settings are not version ${migrationFile.name}`);
      return;
    }
    console.log(`settings are version ${migrationFile.name}, upgrade...`);

    this.settingsUpdated = migration.up();
  }

  static getMigrations() {
    return [
      require('./migrations/v0'), // eslint-disable-line global-require
      require('./migrations/v1'), // eslint-disable-line global-require
      require('./migrations/v2'), // eslint-disable-line global-require
    ];
  }
}

export default Migrate;
