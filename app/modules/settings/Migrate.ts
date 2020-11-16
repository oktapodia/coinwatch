import settings from 'electron-settings';
import { forEach } from 'lodash';
import JsonValue from '../../types/JsonValue';

class Migrate {
  settingsUpdated: JsonValue;

  constructor() {
    const migrationFiles = Migrate.getMigrations();

    // @ts-ignore
    return new Promise(async (resolve) => {
      this.settingsUpdated = await settings.get();
      forEach(migrationFiles, this.migrate.bind(this));
      console.log('Settings are up to date');
      await settings.set(this.settingsUpdated);

      return resolve();
    });
  }

  migrate(migrationFile: () => void) {
    // @ts-ignore
    const MigrationClassName =
      migrationFile instanceof Function || migrationFile.default; // eslint-disable-line global-require,import/no-dynamic-require

    const migration = new MigrationClassName(this.settingsUpdated);
    if (!migration.isVersion()) {
      return;
    }
    console.log(`settings are version ${MigrationClassName.name}, upgrade...`);

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
