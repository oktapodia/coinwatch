import { isEmpty } from 'lodash';
import AbstractMigration from '../AbstractMigration';

class V0 extends AbstractMigration {
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

export default V0;
