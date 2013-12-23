var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var DateSchema = new Schema({
  code: String,
  rDate: String,
  names: {type:[String], default: []}, 
  imgs: {type:[String], default: []}, //string represents the urlImage Id
  votes: {type: Number, default: 0},
  voteFlag: {type: String, default: "Vote"}
});


var UserSchema = new Schema({
	name: String,
	imgUrl: String,
	status: {type: String, default: "true"}
	//TODO: add relation between two collections
});


mongoose.model('Dates', DateSchema);
mongoose.model('Users', UserSchema);
