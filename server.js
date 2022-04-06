const next = require('next');
const routes = require('./routes');
const _app = next({dev: process.env.NODE_ENV !== 'production'});
const handler = routes.getRequestHandler(_app, ({req, res, route, query}) =>{
    _app.render(req, res, route.page, query)
});

const { createServer } = require('http')

_app.prepare().then(() => {
    createServer(handler).listen(3000) 
});

