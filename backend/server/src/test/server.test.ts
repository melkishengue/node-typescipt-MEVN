import Server from '../server/server';
import express from 'express';

const testExpressMethodCalled = (method: string, url: string,  middleware: Function, message: string) => {
    test(message, () => {
        server[method](url, middleware);
        expect(server.getApp()[method]).toBeCalled();
    });
}

const testExpressMethodCalledWith = (method: string, url: string,  middleware: Function, message: string) => {
    test(message, () => {
        server[method](url, middleware);
        expect(server.getApp()[method]).toBeCalledWith(url, middleware);
    });
}
let server: Server;
let app: express.Application = express();
const fakeMiddlewareFn = (req: any, res: any, next: any) => {next()};
const PORT = 3000;
beforeEach(() => {
    server = new Server(PORT);
    // stub functions to be able to check if the method will be called
    app.use = jest.fn();
    app.get = jest.fn();
    app.post = jest.fn();
    app.put = jest.fn();
    app.delete = jest.fn();
    app.listen = jest.fn();

    server.setApp(app);
});

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
testExpressMethodCalled(
    'get',
    '/',
    fakeMiddlewareFn,
    'server.get: post method should be called with the url and the route handler passed',
);
testExpressMethodCalledWith(
    'get',
    '/',
    fakeMiddlewareFn,
    'server.get: post method should be called with the url and the route handler passed',
);

// test server.post
testExpressMethodCalled(
    'post',
    '/',
    fakeMiddlewareFn,
    'server.post: post method should be called with the url and the route handler passed',
);
testExpressMethodCalledWith(
    'post',
    '/',
    fakeMiddlewareFn,
    'server.post: post method should be called with the url and the route handler passed',
);

// test server.put
testExpressMethodCalled(
    'put',
    '/',
    fakeMiddlewareFn,
    'server.put: put method should be called with the url and the route handler passed',
);
testExpressMethodCalledWith(
    'put',
    '/',
    fakeMiddlewareFn,
    'server.put: put method should be called with the url and the route handler passed',
);

// test server.delete
testExpressMethodCalled(
    'delete',
    '/',
    fakeMiddlewareFn,
    'server.delete: delete method should be called with the url and the route handler passed',
);

testExpressMethodCalledWith(
    'delete',
    '/',
    fakeMiddlewareFn,
    'server.delete: delete method should be called with the url and the route handler passed',
);

// test server.start
test('server.start: app.listen should be called', () => {
    server.start();
    expect(server.getApp().listen).toBeCalled();
});

test('server.start: app.listen should be called with port as 1st parameter', () => {
    // expect.assertions(1);

    // return server.start().then(() => {
    //     console.log('server.getApp().listen', server.getApp().listen);
    //     expect(server.getApp().listen.mock.calls[0][0]).toBe(PORT);
    // });

    server.start(); 
    expect(server.getApp().listen).toBeCalledWith(3000);
});