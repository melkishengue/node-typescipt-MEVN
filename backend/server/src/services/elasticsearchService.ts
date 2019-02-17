// type definition https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/elasticsearch/index.d.ts

import ElasticSearchProvider from '../database/elasticsearchDatabaseProvider';

export class ElasticsearchService {
    async search (title: string): Promise<any> {
        return await ElasticSearchProvider.getConnection().search({
            index: process.env.DB_NAME,
            type: 'movies',
            body: {
                query: {
                    match: {
                    body: title
                    }
                }
            }
        });
    }
}

export const elasticService = new ElasticsearchService();