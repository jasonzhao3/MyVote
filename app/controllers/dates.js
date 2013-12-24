var mongoose = require('mongoose')
	, Dates = mongoose.model('Dates')
	, Users = mongoose.model('Users');

exports.list = function(req, res) {
	// //original work version
	// Dates.find({}).sort({rDate: 'asc'}).exec(function(err, dates) {
	// 	//how does this json work?  exec?
	// 	res.json(dates);
	// });

	Dates.find({}).sort({rDate: 'asc'}).exec(function(err, dates){
		if (err) {/*error*/}
		Users.find({}).sort({name: 'asc'}).exec(function(err, users){
			if (err) {/*error*/}
			var  result = {dates: dates, users: users};
			//socketIO.sockets.emit('date:review', result);
			res.json({dates: dates, users: users});
		});
	});

	/* 
	Async way to do this -- but not figure out yet
	async.parallel([
		function(cb){
			Dates.find({}, cb).sort({rDate:'asc'});
		},
		function(cb){
			Users.find({}, cb).sort({name: 'asc'});
			console.log(cb);
		}
	], function(results){
		console.log("haoiwegowegjgeoweigew");
		console.log(results);
		res.json(results);
	});
*/
}


//This function is called because of the routes configuration!
exports.update = function(req, res){
	var reunionDate = new Dates(req.body);
	//can only have one set
	Dates.findOneAndUpdate({ _id: reunionDate.id }, {$set:{imgs:reunionDate.imgs, names: reunionDate.names}, votes: reunionDate.votes, voteFlag: reunionDate.voteFlag},  function (err, numberAffected, raw) {
		var socketIO = global.socketIO; 
		socketIO.sockets.emit('date:updated', reunionDate);
		res.json(true);

	});
}

