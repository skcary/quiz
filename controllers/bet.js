const betModel = require('../models/bet');

module.exports = (router) => {

  router.get('/bet', async (ctx, next) => {
    let uid = ctx.request.query.uid || 0;
    let optionid = ctx.request.query.oid;
    let quizid = ctx.request.query.qid;
    let roomid = ctx.request.query.rid;
    let coin = ctx.request.query.coin;

    await betModel.createBet(uid, coin, quizid, optionid)
      .then(() => {
        ctx.body = {'error':0}
      })
      .catch(() => {
        ctx.body = {'error':1}
        next();
      });
  });
  
  router.get('/betlist', async (ctx, next) => {
    await betModel.getBetList()
      .then((list) => {
        ctx.body = list
      })
      .catch(next)
  });
  
}