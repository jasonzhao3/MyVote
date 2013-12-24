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
       $scope.disableFlag = true;
     //Hacky part: add one more field in the database. There should be a better way to do this!
      for (var i = 0; i < $scope.dates.length; i++) {
        $scope.dates[i].voteFlag = "vote";
      }

      for (var i = 0; i < $scope.users.length; i++) {
        $scope.users[i].status = false;
      }

       $("select[name='user-select'] option").each(function(){
        if ($(this).text() == "Choose User") {
          $(this).prop("selected",true);
        } else {
          $(this).removeAttr("selected");
        }
      });
    });

    $scope.setUser = function() {
       var currVal = $("select[name='user-select'] option:selected").val();
       if (currVal == "") {
        //quite hacky here
         $("input[type='submit']").attr('disabled', 'true');
         return;
       }
      
      $scope.currUser = JSON.parse($("select[name='user-select'] option:selected").val());
   
      //can also use $scope.currUser = JSON.parse($scope.currUser);
      for (var i = 0; i < $scope.dates.length; i++) {
          if ($scope.dates[i].imgs.indexOf($scope.currUser.imgUrl) > -1) {
            $scope.dates[i].voteFlag = "Unvote";
          } else{
            $scope.dates[i].voteFlag = "Vote";
          }
      }

      for (var i = 0; i < $scope.users.length; i++) {
        if ($scope.users[i].name == $scope.currUser.name) {
          $scope.users[i].status = true;
        } else {
          $scope.users[i].status = false;
        }
      }
      $("input[type='submit']").removeAttr('disabled');
    }


    $scope.overview = function() {
      $scope.currUser = "empty";
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

        var isVote = " Vote ";
        if (reunionDate.voteFlag == "Vote") isVote = " Unvote ";

      $.pnotify({title: 'Vote', text: $scope.currUser.name  + isVote + 'for ' + reunionDate.rDate });
    });

  $("input[type='submit']").attr('disabled', 'true');

  });

/* 
 * Some other tips:
 * 1. evaluate variable inside string => eval!!!  e.g.  eval("$('button[value!=" + name + "]').attr('disabled', 'true');");
 * 2. remove diabled attribute from the button: e.g. $("button[value='Overview']").removeAttr('disabled');
 */
 
