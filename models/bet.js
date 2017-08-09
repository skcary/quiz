const mongoose = require('mongoose');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//bet
const BetSchema = new Schema({
  quizid: { type: ObjectId }, // 选项
  quizoptionid: { type: ObjectId }, // 选项
  gamid: { type: Number }, // 投注者 id
  gamnum: { type: Number } // 投注者 数量
});

BetSchema.post('findOne', (result) => {
  if (result) {
    result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
  }
  return result
})
BetSchema.post('find', function(results){
  results.forEach((item) => {
    item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
  })
  return results
})

BetSchema.statics.createBet = function(gamid, gamnum, quizid, quizoptionid) {
  let bet = new this();
  bet.gamid = gamid;
  bet.gamnum = gamnum;
  bet.quizid = quizid;
  bet.quizoptionid = quizoptionid;
  return bet.save();
}

BetSchema.statics.getBetListByGamid = function(id) {
  return this.find({ 'gamid': gamid }).exec();
}

BetSchema.statics.getBetList = function() {
  return this.find({ }).exec();
}

const BetModel = mongoose.model('Bet', BetSchema);
module.exports = BetModel;