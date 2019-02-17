import { IDatabaseProvider, IDatabaseConfiguration } from './databaseProvider.interface';
import _logger from '../logger';
import { ConfigOptions, Client } from 'elasticsearch';

export default class ElasticSearchProvider implements IDatabaseProvider {
  private static connection: Client;
  private static databaseConfiguration: IDatabaseConfiguration;

  static configure(databaseConfiguration: IDatabaseConfiguration): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
        ElasticSearchProvider.databaseConfiguration = databaseConfiguration;
        resolve('Elastic search configured');
    });
  }

  static getConnection() {
    if (!ElasticSearchProvider.databaseConfiguration) throw new Error('Elastic search not configured yet. Please call configure method first.')

    if (ElasticSearchProvider.connection) {
      return ElasticSearchProvider.connection;
    } else {
      let conf = ElasticSearchProvider.databaseConfiguration;
      _logger.debug(`Connecting to elastic search on host ${conf.host}`);

      ElasticSearchProvider.connection = new Client(ElasticSearchProvider.databaseConfiguration);

      return ElasticSearchProvider.connection;
    }
  }
}
