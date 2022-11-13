import AbstractMigration from '../AbstractMigration';

class V2 extends AbstractMigration {
  isVersion() {
    return this.settings.version === 1;
  }

  up() {
    this.settings.alerts = [];
    this.settings.version = 2;

    return this.settings;
  }
}

export default V2;
