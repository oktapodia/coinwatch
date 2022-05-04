class AbstractMigration {
  settings: any = {};

  constructor(settings: any) {
    this.settings = settings;
  }
}

export default AbstractMigration;
