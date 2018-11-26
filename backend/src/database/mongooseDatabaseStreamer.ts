const stream = require('stream');
import { wait } from '../utils';
import { postService } from '../services/postService';

export class MongooseDatabaseStreamer extends stream.Readable {
    constructor () {
        super({objectMode: true});

        this.fetchNextChunk(1);
    }

    // method must be overriden for proper extension of the stream.Readable class
    _read() {}

    fetchNextChunk(timeout: number): void {
        logger.debug('just a log message');
        wait(timeout).then(async () => {
            let user = await postService.findRandom();
            this.push(user);
            
            let timeout = Math.floor((Math.random() * 5) + 1);
            this.fetchNextChunk(timeout*1000);
        })
    }
}

export default MongooseDatabaseStreamer;