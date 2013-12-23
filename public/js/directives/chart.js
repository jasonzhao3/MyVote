'use strict';   //strict js mode

angular.module('voteApp')
  .directive('chart', function () {
    return {
      template: '<div id="chart"></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        scope.$watch('dates', function(newValue, oldValue, scope) {

          if (newValue === undefined) return;
          // var chartTeams = newValue.map(function(team) {
          //   return [team.name, team.votes];
          // });
        // var data = google.visualization.arrayToDataTable(chartTeams, true);
          var chartDates = newValue.map(function(reunionDate) {
            return [reunionDate.rDate, reunionDate.votes];
          });
          var data = google.visualization.arrayToDataTable(chartDates, true);
      
          var googleChart = new google.visualization.PieChart(document.getElementById('chart'));
          googleChart.draw(data);

        });

      }

    };

  });
