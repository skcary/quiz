const logger = require('koa-logger');
const responseTime = require('koa-response-time');
const serve = require('koa-static');
const staticCache = require('koa-static-cache');
const session = require('koa-session');
const bodyParser = require('koa-bodyParser');
const convert = require('koa-convert');
const favicon = require('koa-favicon');

const lib = require('./models/_db.js');
const Koa = require('koa');
const app = new Koa();

app.use(logger());
app.use(responseTime());
app.use(serve(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser());
app.use(convert(session({ key:'myKeyss' }, app)));

require('./controllers/_router')(app);

app.listen(3001);