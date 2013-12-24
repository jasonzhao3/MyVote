'use strict';

//TODO: add more validation -- but how in nodejs???

//define module -> then chain the controller function 
//Inside the controller function, specify the name of the controller
//$scope and $http are builtin services -- the following code declare the service dependency of the controller 
angular.module('voteApp')
  .controller('DatesCtrl', function ($scope, $http, Socket, Dates) {

    //$scope: again angular js' dependency injection
    //Anything attached to scope will be available in views
    //This kind of variable acts like global temporary variable
    $scope.voteFlag = true;
    $scope.currUser = "empty";

    //$scope.teams = Team.list();
    //When does this function get called??
    $http.get('/dates').success(function(data) {
       $scope.dates = data.dates;
       //here trapps me for quite a while!!!
       $scope.users = data.users;
    });

    //client-side js set a scope variable, meantime issue a put request with currUser as data
    $scope.setUser = function(currUser) {
      console.log('why do not output?');
      var name = currUser.name;
      //evaluate variable inside string => eval!!!
      // eval("$('button[value!=" + name + "]').attr('disabled', 'true');");
      $scope.currUser = currUser;

      // $("button[value='Overview']").removeAttr('disabled');
      $("input[type='submit']").removeAttr('disabled');
      
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

    $scope.overview = function() {
      $('button').removeAttr('disabled');
      $("input[type='submit']").attr('disabled', 'true');
    }


    $scope.getStatus = function(user) {
      return user.status;
    }

    $scope.vote = function(reunionDate) {
      //TODO: change read-database-everytime to only save-database-everytime
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

      //update database is not here!!! it's in the backend node.js!!
      // reunionDate.names.push("yezhu");
      //reunionDate.save(reunionDate.imgs.push("http://fmn.rrimg.com/fmn062/20120621/2105/original_ynCb_56b2000023d81191.jpg"));
      // reunionDate.save();

      //$http.put is angular JS not mongoose!
      //This is the browser(client-side) request -- put request
    	$http.put('/dates/' + reunionDate._id, reunionDate).success(function(data) {
        $scope.voteFlag = true;
      });
    };


    // Socket.on('date:updated', function (reunionDate) {
    //   // eval("$('button[value!=" + $scope.currUser.name + "]').attr('disabled', 'true');");
    //   // $("button[value='Overview']").removeAttr('disabled');
    //   $http.get('/dates').success(function(data) {
    //     console.log(data);
    //     console.log("this happens second???")
    //     for (var i = 0; i < data.dates.length; i++) {
    //       if (data.dates[i].imgs.indexOf($scope.currUser.imgUrl) > -1) {
    //         data.dates[i].voteFlag = "Unvote";
    //       } else{
    //         data.dates[i].voteFlag = "Vote";
    //       }
    //     }
    //     $scope.dates = data.dates;
    //     $scope.users = data.users;
    //   });
    //   console.log("this happens first???");
    //   $.pnotify({title: 'Vote', text: $scope.currUser.name + ' vote for ' + reunionDate.rDate });
    //   //cannot put before $http.get, otherwise the chart won't update
     
    // });

    Socket.on('date:updated', function (reunionDate) {
      // $http.put('/dates/review', reunionDate).success(function(data) {
      //   for (var i = 0; i < $scope.dates.length; i++) {
      //     if ($scope.dates[i].rDate == reunionDate.rDate) {
      //       $scope.dates[i].voteFlag = reunionDate.voteFlag;
      //     }
      //   }
      // });

       for (var i = 0; i < $scope.dates.length; i++) {
          if ($scope.dates[i].rDate == reunionDate.rDate) {
            $scope.dates[i].voteFlag = reunionDate.voteFlag;
          }
        }
      $.pnotify({title: 'Vote', text: $scope.currUser.name + ' ' + reunionDate.voteFlag + ' for ' + reunionDate.rDate });
      //cannot put before $http.get, otherwise the chart won't update
     
    });


  });


