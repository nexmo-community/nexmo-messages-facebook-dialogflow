const Koa = require('koa');
const router = require('koa-route');
const bodyParser = require('koa-bodyparser');
const routes = require('./routes');
const port = process.env.PORT || 3000;

// Set up a new Koa app and tell it to use
// the bodyParser middleware for inbound requests
const app = new Koa();
app.use(bodyParser());

// Routes
app.use(router.post('/webhooks/status', routes.status));
app.use(router.post('/webhooks/inbound', routes.inbound));

// Have the app listen on a default port or 3000
app.listen(port, () => console.log(`App is waiting on port ${port}`));
