import AbstractMigration from '../AbstractMigration';

class V1 extends AbstractMigration {
  isVersion() {
    if (!this.settings.version) {
      return true;
    }

    return false;
  }

  up() {
    this.settings.version = 1;

    return this.settings;
  }
}

export default V1;
