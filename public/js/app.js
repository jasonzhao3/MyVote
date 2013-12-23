'use strict';

/* This file is the module in Angular JS
 * But I'm confusing, how is this file called?
 */

//set up an angular module, controllers and views will be attached to this module
//.config: chain config function to the module
angular.module('voteApp', ['ngResource'])
  .config(function ($routeProvider) {
  	//routeProvider: set up the app's routes
  	//$routeProvider: angular's dependency injection
    $routeProvider
      .when('/', {
        // templateUrl: 'views/team/list.html',
        // controller: 'TeamCtrl'
        templateUrl: 'views/dates/list.html',
        controller: 'DatesCtrl'
      })
      .otherwise({
      	redirectTo:'/'
      });
  });
