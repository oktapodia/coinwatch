import AbstractMigration from '../AbstractMigration';

class v2 extends AbstractMigration {
  isVersion() {
    return this.settings.version === 1;
  }

  up() {
    this.settings.alerts = [];
    this.settings.version = 2;

    return this.settings;
  }
}

export default v2;
