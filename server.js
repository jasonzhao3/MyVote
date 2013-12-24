
/*!
 * Reference: nodejs-express-mongoose-demo
 * Copyright(c) 2013 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 * 
 * Modification: Yang Zhao  <viggozju@gmail.com>
 */

/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , http = require('http')

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'test'
  , config = require('./config/config')[env]
  , mongoose = require('mongoose')

// Bootstrap db connection
mongoose.connect(config.db)

// Bootstrap models
// import all the models  -- but no variable to receive the model name??
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
})

//directly call the initialization function
require('./config/db-init')()


var app = express()
// express settings -- very complicated, not figured out yet -- unchanged
require('./config/express')(app, config)

// Bootstrap routes
// require('./config/routes')(app)
require('./config/date-routes')(app)

// Start the app by listening on <port>
var port = process.env.PORT || 5000
var server = app.listen(port);
console.log('Express listening at port ' + port);
require('./config/socket-io')(app, server);


// expose app
//module.exports is the same as exports  -- module means the current module
exports = module.exports = app
