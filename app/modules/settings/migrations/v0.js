import { isEmpty } from 'lodash';
import AbstractMigration from '../AbstractMigration';

class v0 extends AbstractMigration {
  isVersion() {
    return isEmpty(this.settings);
  }

  up() {
    this.settings.coins = [];
    this.settings.decimal = 7;
    this.settings.autoLaunch = 'no';

    return this.settings;
  }
}

export default v0;
