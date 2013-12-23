

module.exports = function (app) {

  var dates = require('../app/controllers/dates');
  app.get('/dates', dates.list); //pass a callback function to get method
  app.get('/dates/review', dates.review);
  //colon: parameterized id
  //app.put is different from $http.put --> one defines the route, the other defines the url and data
  app.put('/dates/:id', dates.update);

}
