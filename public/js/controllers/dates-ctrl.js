'use strict';

//TODO: add more validation -- but how in nodejs???

//define module -> then chain the controller function 
//Inside the controller function, specify the name of the controller
//$scope and $http are builtin services -- the following code declare the service dependency of the controller 
angular.module('voteApp')
  .controller('DatesCtrl', function ($scope, $http, Socket, Dates) {
    $scope.currUser = "empty";

    $http.get('/dates').success(function(data) {
      //need update every scope variable used in the view
       $scope.dates = data.dates;
       $scope.users = data.users;
    });

    $scope.setUser = function(currUser) {
      var name = currUser.name;      
      $scope.currUser = currUser;
      
      $http.get('/dates').success(function(data) {
        for (var i = 0; i < data.dates.length; i++) {
          if (data.dates[i].imgs.indexOf($scope.currUser.imgUrl) > -1) {
            data.dates[i].voteFlag = "Unvote";
          } else{
            data.dates[i].voteFlag = "Vote";
          }
        }

        for (var i = 0; i < data.users.length; i++) {
          if (data.users[i].name != $scope.currUser.name && data.users[i].name != "undefined") {
            data.users[i].status = "false";
          } else {
            data.users[i].status = "true";
          }
        }

        $scope.dates = data.dates;
        $scope.users = data.users;
      });
    }

    // $scope.setUser = function() {
    //   $("select[name='user-select'] option:selected").val();
    // }

    $scope.overview = function() {
      $scope.currUser = "empty";
      $('button').removeAttr('disabled');
      $("input[type='submit']").attr('disabled', 'true');
    }

    $scope.vote = function(reunionDate) {
      if (reunionDate.voteFlag == "Vote") {
      	reunionDate.votes = reunionDate.votes + 1;
        console.log($scope.currUser.name);
        reunionDate.imgs.push($scope.currUser.imgUrl);
        reunionDate.names.push($scope.currUser.name);
        reunionDate.voteFlag = "Unvote";
        console.log(reunionDate);
      } else{
        reunionDate.votes = reunionDate.votes - 1;
        var index = reunionDate.imgs.indexOf($scope.currUser.imgUrl);
          reunionDate.imgs.splice(index, 1);
        index = reunionDate.imgs.indexOf($scope.currUser.name);
        reunionDate.names.splice(index, 1);
        reunionDate.voteFlag = "Vote";
      }

    	$http.put('/dates/' + reunionDate._id, reunionDate).success(function(data) {
        // do nothing
      });
    };


    Socket.on('date:updated', function (reunionDate) {
       for (var i = 0; i < $scope.dates.length; i++) {
          if ($scope.dates[i].rDate == reunionDate.rDate) {
            $scope.dates[i].voteFlag = reunionDate.voteFlag;
          }
        }
      $.pnotify({title: 'Vote', text: $scope.currUser.name + ' ' + reunionDate.voteFlag + ' for ' + reunionDate.rDate });
    });


  });

/* 
 * Some other tips:
 * 1. evaluate variable inside string => eval!!!  e.g.  eval("$('button[value!=" + name + "]').attr('disabled', 'true');");
 * 2. remove diabled attribute from the button: e.g. $("button[value='Overview']").removeAttr('disabled');
 */

