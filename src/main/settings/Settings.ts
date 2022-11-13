import settings from 'electron-settings';
import { forEach } from 'lodash';
import JsonValue from '../../types/JsonValue';

class Settings {
  settings?: JsonValue;

  async init() {
    this.settings = await settings.get();
    forEach(Settings.getMigrations(), this.migrate.bind(this));
    console.log('Settings are up to date');
    await settings.set(this.settings);
  }

  migrate(migrationFile: () => void) {
    const MigrationClassName =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      migrationFile instanceof Function || migrationFile.default; // eslint-disable-line global-require,import/no-dynamic-require

    const migration = new MigrationClassName(this.settings);
    if (!migration.isVersion()) {
      return;
    }
    console.log(`settings are version ${MigrationClassName.name}, upgrade...`);

    this.settings = migration.up();
  }

  async get() {
    return this.settings;
  }

  async set(data: any) {
    await settings.set(data);

    return this.get();
  }

  static getMigrations() {
    return [
      require('./migrations/V0'), // eslint-disable-line global-require
      require('./migrations/V1'), // eslint-disable-line global-require
      require('./migrations/V2'), // eslint-disable-line global-require
    ];
  }
}

export default Settings;
