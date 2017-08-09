const mongoose = require('mongoose');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//quizoption
const QuizoptionSchema = new Schema({
  name: { type: String }, // 选项名
  quizid: { type: ObjectId }, // 所属quiz id
  total: { type: String, default: 0 }, // 投注总数
  ratio: { type:Number, default: 1 }, // 赔率
  gamid: { type: Number }, // 最多投注者 id
  gamnum: { type: Number } // 最多投注者 数量
});

QuizoptionSchema.post('findOne', (result) => {
  if (result) {
    result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
  }
  return result
})
QuizoptionSchema.post('find', function(results){
  results.forEach((item) => {
    item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
  })
  return results
})

QuizoptionSchema.statics.createQuizoption = function(name, quizid) {
  let quizoption = new this();
  quizoption.name = name;
  quizoption.quizid = quizid;
  return quizoption.save();
}

QuizoptionSchema.statics.getQuizoptionByQuizId = function(id) {
  return this.find({ 'quizid': id }).exec();
}

QuizoptionSchema.statics.updateQuizoptionById = function(id, total, ratio, gamid, gamnum) {
  return this.update({ _id: id }, { $set: { total: total, ratio: ratio, gamid: gamid, gamnum: gamnum }}).exec();
}

const QuizoptionModel = mongoose.model('Quiz', QuizoptionSchema);
module.exports = QuizoptionModel;