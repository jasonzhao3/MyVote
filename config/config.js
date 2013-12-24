
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..') //execute the .. 
  

module.exports = {
  development: {
    db: 'mongodb://test:test@paulo.mongohq.com:10049/MyVote',
    root: rootPath,
    app: {
      name: 'Vote DEV'
    }
  },
  test: {
    db: 'mongodb://localhost/vote',
    root: rootPath,
    app: {
      name: 'Vote TEST'
    }
  },  
  production: {
    db: 'mongodb://test:test@paulo.mongohq.com:10049/MyVote',
    root: rootPath,
    app: {
      name: 'Vote PROD'
    }    
  }
}
