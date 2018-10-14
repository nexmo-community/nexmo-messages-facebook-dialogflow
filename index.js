const Koa = require('koa');
const router = require('koa-route');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(bodyParser());

app.listen(3000, () => console.log('App is waiting on port 3000'));
