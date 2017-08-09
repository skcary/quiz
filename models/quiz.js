const mongoose = require('mongoose');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//quiz
const QuizSchema = new Schema({
  name: { type: String },
  starttime: { type: String },
  endtime: { type: String },
  status: { type: String },
  winner: { type: ObjectId },
  roomid: { type: ObjectId }
});

QuizSchema.post('findOne', (result) => {
  if (result) {
    result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
  }
  return result
})
QuizSchema.post('find', function(results){
  results.forEach((item) => {
    item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
  })
  return results
})

QuizSchema.statics.createQuiz = function(name, st, et, status, rid) {
  let quiz = new this();
  quiz.name = name;
  quiz.starttime = st;
  quiz.endtime = et;
  quiz.status = status;
  quiz.roomid = rid;
  return quiz.save();
}

QuizSchema.statics.getQuizById = function(id) {
  return this.findOne({ '_id': id }).exec();
}

QuizSchema.statics.getQuizByRoomid = function(id) {
  return this.find({ 'roomid': id }).exec();
}

QuizSchema.statics.updateQuizStatusById = function(id, status) {
  return this.update({ _id: id }, { $set: { status: status }}).exec();
}

QuizSchema.statics.updateQuizWinById = function(id, win) {
  return this.update({ _id: id }, { $set: { winner: win }}).exec();
}

const QuizModel = mongoose.model('Quiz', QuizSchema);
module.exports = QuizModel;