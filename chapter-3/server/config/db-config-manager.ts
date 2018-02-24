import * as mysql from 'mysql';
import * as fs from 'fs';

export class DbConfigManager {

  private static dbConfig: mysql.IConnectionConfig;

  static initialize(): void {
    const data = fs.readFileSync('./json/db_config.json', 'utf-8');
    DbConfigManager.dbConfig = JSON.parse(data);
  }

  static getConfig(): mysql.IConnectionConfig {
    if (!DbConfigManager.dbConfig) {
      throw new Error('Did not initialized!');
    }
    return DbConfigManager.dbConfig;
  }

}
