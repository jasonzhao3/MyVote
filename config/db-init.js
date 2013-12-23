//create the database and add items

var mongoose = require('mongoose')
	, Dates = mongoose.model('Dates')
	, Users = mongoose.model('Users');

module.exports = function () {
	//clear out database
	Dates.remove(function (err) {});
	Users.remove(function (err) {});

	var day1 = new Dates(
	{
		code: 'option1',
		rDate: 'Dec-24 Noon',
		names: [],
		//default absolute path starts in public
		imgs: [], 
		vote: 0
	});


	var day2 = new Dates(
	{
		code: 'option2',
		rDate: 'Dec-24 Night',
		names: [],
		imgs: [],
		vote: 0
	});


	var day3 = new Dates(
	{
		code: 'option3',
		rDate: 'Dec-25 Noon',
		names: [],
		imgs: [],
		vote: 0
	});


	var day4 = new Dates(
	{
		code: 'option4',
		rDate: 'Dec-25 Night',
		names: [],
		imgs: [],
		vote: 0
	});

	var day5 = new Dates(
	{
		code: 'option5',
		rDate: 'Dec-26 Noon',
		names: [],
		imgs: [],
		vote: 0
	});

	var day6 = new Dates(
	{
		code: 'option6',
		rDate: 'Dec-26 Night',
		names: [],
		imgs: [],
		vote: 0
	});


	var day7 = new Dates(
	{
		code: 'option7',
		rDate: 'Dec-27 Noon',
		names: [],
		imgs: [],
		vote: 0
	});

	var day8 = new Dates(
	{
		code: 'option8',
		rDate: 'Dec-27 Night',
		names: [],
		imgs: [],
		vote: 0
	});

	var user1 = new Users(
	{
		name: "Yishu",
		imgUrl: "/img/Yishu.png"
	});

	var user2 = new Users(
	{
		name: "Luyu",
		imgUrl: "/img/Luyu.png"
	});

	var user3 = new Users(
	{
		name: "Douzi",
		imgUrl: "/img/Douzi.png"
	});

	var user4 = new Users(
	{
		name: "Ben",
		imgUrl: "/img/Ben.png"
	});

	var user5 = new Users({
		name: "Xiaoren",
		imgUrl: "/img/Xiaoren.png"
	});

	var user6 = new Users({
		name: "Juncat",
		imgUrl: "/img/Juncat.png"
	});

	var user7 = new Users({
		name: "Xizi",
		imgUrl: "/img/Xizi.png"
	});

	var user8 = new Users({
		name: "Zhenzhen",
		imgUrl: "/img/Zhenzhen.png"
	});

	var user9 = new Users({
		name: "DrHo",
		imgUrl: "/img/DrHo.png"
	});

	var user10 = new Users({
		name: "Makun",
		imgUrl: "/img/Makun.png"
	});

	var user11 = new Users({
		name: "Wenshu",
		imgUrl: "/img/Wenshu.png"
	});

	var user12 = new Users({
		name: "Yang",
		imgUrl: "/img/Yang.png"
	})

	day1.save();
	day2.save();
	day3.save();
	day4.save();
	day5.save();
	day6.save();
	day7.save();
	day8.save();
	user1.save();
	user2.save();
	user3.save();
	user4.save();
	user5.save();
	user6.save();
	user7.save();
	user8.save();
	user9.save();
	user10.save();
	user11.save();
	user12.save();

}

