import { EventEmitter } from "events";

class DatabaseEventEmitter extends EventEmitter {}

export default new DatabaseEventEmitter();
