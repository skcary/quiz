module.exports = (app) => {
  const Router = require('koa-router');
  let router = new Router();
  
  require('./bet')(router);
  require('./quiz')(router);

  app.use(router.routes());
  app.use(router.allowedMethods());
};