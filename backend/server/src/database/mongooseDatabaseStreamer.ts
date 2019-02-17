const stream = require('stream');
import { wait } from '../utils';
import { movieService } from '../services/movieService';
import _logger from '../logger';
import { random } from '../utils';

export class MongooseDatabaseStreamer extends stream.Readable {
    constructor () {
        super({objectMode: true});
        this.fetchNextChunk(1);
    }

    // method must be overriden for proper extension of the stream.Readable class
    _read() {}

    fetchNextChunk(timeout: number): void {
        wait(timeout).then(async () => {
            let movie = await movieService.findRandom();
            this.push(movie);
            
            let timeout = random(1, 4);
            this.fetchNextChunk(timeout*1000);
        })
    }
}

export default MongooseDatabaseStreamer;