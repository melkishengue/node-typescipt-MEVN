import Server from '../server/server';
import express from 'express';

let server: Server;
let app: express.Application = express();
const fakeMiddlewareFn = (req: any, res: any, next: any) => {next()};
beforeEach(() => {
    server = new Server(3000);
    // stub functions to be able to check if the method will be called
    app.use = jest.fn();
    app.get = jest.fn();
    app.post = jest.fn();
    app.put = jest.fn();
    app.delete = jest.fn();
    server.setApp(app);
});

const testMethodCalled = (method: string, url: string,  middleware: Function, message: string) => {
    test(message, () => {
        server[method](url, middleware);
        expect(server.getApp()[method]).toBeCalled();
    });
}

const testMethodCalledWith = (method: string, url: string,  middleware: Function, message: string) => {
    test(message, () => {
        server[method](url, middleware);
        expect(server.getApp()[method]).toBeCalledWith(url, middleware);
    });
}

// test server.middleware
test('server.middleware: use method should be called', () => {
    server.middleware('/', fakeMiddlewareFn);
    expect(server.getApp().use).toBeCalled();
});

test('server.middleware: use method should be called with the url and the middleware passed', () => {
    server.middleware('/', fakeMiddlewareFn);
    expect(server.getApp().use).toBeCalledWith('/', fakeMiddlewareFn);
});

// test server.get
testMethodCalled(
    'get',
    '/',
    fakeMiddlewareFn,
    'server.get: post method should be called with the url and the route handler passed',
);
testMethodCalledWith(
    'get',
    '/',
    fakeMiddlewareFn,
    'server.get: post method should be called with the url and the route handler passed',
);

// test server.post
testMethodCalled(
    'post',
    '/',
    fakeMiddlewareFn,
    'server.post: post method should be called with the url and the route handler passed',
);
testMethodCalledWith(
    'post',
    '/',
    fakeMiddlewareFn,
    'server.post: post method should be called with the url and the route handler passed',
);

// test server.put
testMethodCalled(
    'put',
    '/',
    fakeMiddlewareFn,
    'server.put: put method should be called with the url and the route handler passed',
);
testMethodCalledWith(
    'put',
    '/',
    fakeMiddlewareFn,
    'server.put: put method should be called with the url and the route handler passed',
);

// test server.delete
testMethodCalled(
    'delete',
    '/',
    fakeMiddlewareFn,
    'server.delete: delete method should be called with the url and the route handler passed',
);

testMethodCalledWith(
    'delete',
    '/',
    fakeMiddlewareFn,
    'server.delete: delete method should be called with the url and the route handler passed',
);