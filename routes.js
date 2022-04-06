const routes = require('next-routes')();

routes
.add('/exhibitions/new', '/exhibitions/new')
.add('/exhibitions/:address', '/exhibitions/show')
.add('/exhibitions/:address/requests', '/exhibitions/requests/index');



module.exports = routes;