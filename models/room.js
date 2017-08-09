const mongoose = require('mongoose');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//room
const RoomSchema = new Schema({
  name: { type:String }
});

RoomSchema.post('findOne', (result) => {
  if (result) {
    result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
  }
  return result
})
RoomSchema.post('find', function(results){
  results.forEach((item) => {
    item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
  })
  return results
})

RoomSchema.statics.createRoom = function(name) {
  let room = new this();
  room.name = name;
  return room.save().exec();
}

RoomSchema.statics.getRoomById = function(id) {
  return this.findOne({ '_id': id }).exec();
}

RoomSchema.statics.getRoomList = function() {
  return this.find({ }).limit(10000).exec();
}


const RoomModel = mongoose.model('Room', RoomSchema);
module.exports = RoomModel;