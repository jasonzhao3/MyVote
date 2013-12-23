'use strict';


angular.module('voteApp')
  .factory('Dates', function($resource) {

    return $resource(
      'http://localhost:port/dates/:id',
      {
        port: ':5000',
        id: '@id'
      }, 
      {
        'list': {method: 'GET', isArray: true},
        'update': {method: 'PUT'}
      }
    );

  });

