// type definition https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/elasticsearch/index.d.ts

import { wait } from '../utils';
import _logger from '../logger';
import { ConfigOptions, Client } from 'elasticsearch';

export class ElasticSearchDatabaseSeeder {
    private static connection: any;
    private static configuration: ConfigOptions;

    static configure(configuration: ConfigOptions): Promise<string> {
        return new Promise((resolve: any, reject: any) => {
            _logger.debug('Elastic search config:', configuration);
            ElasticSearchDatabaseSeeder.configuration = configuration;
            ElasticSearchDatabaseSeeder.connection = new Client(ElasticSearchDatabaseSeeder.configuration);
            resolve('Elastic seach configured');
        });
    } 

    static ping (): Promise<any> {
        return ElasticSearchDatabaseSeeder.connection.ping({
            requestTimeout: 2000
        });
    }

    static async createIndex (index: string): Promise<any> {
        return ElasticSearchDatabaseSeeder.connection.indices.create({
            index
        });
    }

    static bulk (bulk: any, action: any): Promise<any> {
        return ElasticSearchDatabaseSeeder.connection.bulk({
            maxRetries: 5,
            body: bulk
        });
    }

    static index (index: string, type: string, body: any, id?: string): Promise<any> {
        return ElasticSearchDatabaseSeeder.connection.index({
            index,
            id,
            type,
            body
        });
    }
}

export default ElasticSearchDatabaseSeeder;